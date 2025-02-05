from collections import OrderedDict
from collections import defaultdict
from concurrent.futures.thread import ThreadPoolExecutor
import logging


from bumiworker.bumiworker.modules.base import ModuleBase
from tools.cloud_adapter.cloud import Cloud as CloudAdapter

LOG = logging.getLogger(__name__)

DEFAULT_INSECURE_PORTS = [
    {
        'port': port,
        'protocol': 'tcp'
    } for port in [22, 3389]
]

INSECURE_CIDRS = ['0.0.0.0/0', '::/0', '*', '0::0/0']
MIN_PORT_VALUE = 0
MAX_PORT_VALUE = 65535


class InsecureSecurityGroups(ModuleBase):
    def __init__(self, organization_id, config_client, created_at):
        super().__init__(organization_id, config_client, created_at)
        self.option_ordered_map = OrderedDict({
            'excluded_pools': {
                'default': {},
                'clean_func': self.clean_excluded_pools,
            },
            'insecure_ports': {
                'default': DEFAULT_INSECURE_PORTS,
                'clean_func': self._clean_insecure_ports,
            },
            'skip_cloud_accounts': {'default': []}
        })

    def _clean_insecure_ports(self, insecure_ports, default_value):
        for record in insecure_ports:
            protocol = record.get('protocol')
            port = record.get('port')
            if protocol not in ['tcp', 'udp']:
                LOG.warning(
                    'incorrect protocol type %s, setting default', protocol)
                return default_value
            if not isinstance(port, int):
                LOG.warning('incorrect port value %s, setting default', port)
                return default_value

        return insecure_ports

    @property
    def is_resource_based(self):
        return False

    @property
    def unique_record_keys(self):
        return 'cloud_account_id', 'cloud_resource_id', 'security_group_id',

    def get_cloud_func_map(self):
        return {
            'aws_cnr': self._get_aws_insecure,
            'azure_cnr': self._get_azure_insecure,
            'nebius': self._get_nebius_insecure,
            'gcp_cnr': self._get_gcp_insecure
        }

    def _get(self):
        (excluded_pools, insecure_ports,
         skip_cloud_accounts) = self.get_options_values()
        cloud_acc_map = self.get_cloud_accounts(
            skip_cloud_accounts=skip_cloud_accounts)
        _, response = self.rest_client.cloud_resources_discover(
            self.organization_id, 'instance')
        resources = response['data']
        result = []
        for config in list(cloud_acc_map.values()):
            config.update(config.get('config', {}))
            cloud_func_map = self.get_cloud_func_map()
            security_group_call = cloud_func_map.get(config['type'])
            if not security_group_call:
                continue
            cloud_resources = list(filter(
                lambda x: x['cloud_account_id'] == config['id'], resources))
            if not cloud_resources:
                continue
            try:
                security_groups = security_group_call(
                    config, cloud_resources, excluded_pools, insecure_ports)
            except Exception as ex:
                setattr(ex, 'cloud_account_id', config.get('id'))
                raise ex
            result.extend(security_groups)
        return result

    @staticmethod
    def _format_protocol(protocol):
        if not protocol or protocol.lower() in ['any', 'all']:
            return '*'
        return protocol

    def _get_aws_region_insecure_sg(
            self, cloud_adapter, region, sg_ids, insecure_ports):
        res = []
        security_groups = cloud_adapter.describe_security_groups(
            region, sg_ids)
        for security_group in security_groups:
            found_insecure_ports = set()
            permissions = security_group.get('IpPermissions', [])
            for rule in permissions:
                rule_protocol = rule.get('IpProtocol')
                if rule_protocol == '-1':
                    found_insecure_ports.add(('*', None))
                    continue
                if rule_protocol not in ['tcp', 'udp']:
                    continue
                from_port = rule.get('FromPort', MIN_PORT_VALUE)
                to_port = rule.get('ToPort', MAX_PORT_VALUE)
                if from_port == MIN_PORT_VALUE and to_port == MAX_PORT_VALUE:
                    # detect SG with all ports open even if no 'insecure_ports'
                    # configured for the recommendation
                    found_insecure_ports.add(('*', None))
                    continue
                for insecure_port in insecure_ports:
                    insecure_port_protocol = insecure_port.get('protocol')
                    if rule_protocol != insecure_port_protocol:
                        continue
                    insecure_port_value = insecure_port.get('port')
                    if not from_port <= insecure_port_value <= to_port:
                        continue
                    for range_type, cidr_key in [
                        ('IpRanges', 'CidrIp'),
                        ('Ipv6Ranges', 'CidrIpv6')
                    ]:
                        ranges = rule.get(range_type, [])
                        if any(filter(lambda x:
                                      x[cidr_key] in INSECURE_CIDRS,
                                      ranges)):
                            found_insecure_ports.add((insecure_port_value,
                                                      insecure_port_protocol))
            if found_insecure_ports:
                res.append(security_group)
                insecure_ports_js = [
                    {'port': port, 'protocol': self._format_protocol(protocol)}
                    for port, protocol in found_insecure_ports
                ]
                security_group['insecure_ports'] = insecure_ports_js
        return {region: res}

    def _get_aws_insecure(self, config, resources, excluded_pools,
                          insecure_ports):
        region_sg_map = {}
        for instance in resources:
            region = instance['region']
            if not region_sg_map.get(region):
                region_sg_map[region] = {}
            s_groups = instance['meta']['security_groups']
            if s_groups is None:
                continue
            security_groups_map = region_sg_map[region]
            for group_id in s_groups:
                instances = security_groups_map.get(group_id, [])
                instances.append(instance)
                security_groups_map[group_id] = instances

        region_insecure_sgs_map = {}
        cloud_adapter = CloudAdapter.get_adapter(config)
        with ThreadPoolExecutor(max_workers=50) as executor:
            futures = []
            for region, security_groups_map in region_sg_map.items():
                futures.append(executor.submit(
                    self._get_aws_region_insecure_sg,
                    cloud_adapter=cloud_adapter,
                    region=region,
                    sg_ids=list(security_groups_map.keys()),
                    insecure_ports=insecure_ports,
                ))

            for f in futures:
                region_insecure_sgs_map.update(f.result())

            result = []
            for region, insecure_sgs in region_insecure_sgs_map.items():
                for insecure_sg in insecure_sgs:
                    security_groups_map = region_sg_map.get(region, {})
                    for instance in security_groups_map.get(
                            insecure_sg['GroupId'], []):
                        result.append({
                            'cloud_resource_id': instance.get(
                                'cloud_resource_id'),
                            'resource_name': instance.get('name'),
                            'cloud_account_id': instance.get(
                                'cloud_account_id'),
                            'resource_id': instance.get(
                                'resource_id'),
                            'cloud_type': config['type'],
                            'cloud_account_name': config['name'],
                            'security_group_name': insecure_sg.get(
                                'GroupName'),
                            'security_group_id': insecure_sg.get('GroupId'),
                            'region': instance.get('region'),
                            'is_excluded': instance.get(
                                'pool_id') in excluded_pools,
                            'insecure_ports': insecure_sg.get('insecure_ports')
                        })
        return result

    def _get_azure_insecure(self, config, resources, excluded_pools,
                            insecure_ports):
        azure = CloudAdapter.get_adapter(config)
        network_interfaces = azure.network.network_interfaces.list_all()
        cloud_resources_map = {
            resource['cloud_resource_id']:
                resource for resource in resources
        }
        sg_resource_map = {}
        for interface in network_interfaces:
            if not interface.virtual_machine:
                continue
            if not interface.network_security_group:
                continue
            vm_id = interface.virtual_machine.id
            sg_resource_map.update({
                interface.network_security_group.id:
                    cloud_resources_map.get(vm_id.lower(), {})
            })
        security_groups = azure.network.network_security_groups.list_all()
        result = []
        for sg in security_groups:
            cloud_resource = sg_resource_map.get(sg.id)
            if not cloud_resource:
                continue
            security_rules = sg.security_rules or []
            security_rules.extend(sg.default_security_rules or [])
            found_insecure_ports = set()
            for rule in security_rules:
                if rule.direction == 'Outbound':
                    continue
                if rule.access == 'Deny':
                    continue
                source_address_prefixes = rule.source_address_prefixes
                if not source_address_prefixes:
                    source_address_prefixes = [rule.source_address_prefix]
                if not any(
                        filter(lambda x: x == '*', source_address_prefixes)):
                    continue
                if rule.protocol not in ['*', 'TCP', 'UDP']:
                    continue
                destination_address_prefixes = rule.destination_address_prefixes
                if not destination_address_prefixes:
                    destination_address_prefixes = [
                        rule.destination_address_prefix]
                if not any(filter(lambda x: x in INSECURE_CIDRS,
                                  destination_address_prefixes)):
                    continue
                destination_port_ranges = rule.destination_port_ranges
                if not destination_port_ranges:
                    destination_port_ranges = [rule.destination_port_range]
                for port_range in destination_port_ranges:
                    if port_range == '*':
                        found_insecure_ports.add(('*', None))
                        continue
                    port_ranges = str(port_range).split('-')
                    if len(port_ranges) == 2:
                        from_port = int(port_ranges[0])
                        to_port = int(port_ranges[1])
                    else:
                        from_port = int(port_ranges[0])
                        to_port = from_port
                    for insecure_port in insecure_ports:
                        insecure_port_protocol = insecure_port.get('protocol')
                        if rule.protocol.lower() not in [
                                insecure_port_protocol, '*']:
                            continue
                        insecure_port_value = insecure_port.get('port')
                        if from_port <= insecure_port_value <= to_port:
                            found_insecure_ports.add(
                                (insecure_port_value, insecure_port_protocol))
            if found_insecure_ports:
                insecure_ports_js = [
                    {'port': port, 'protocol': self._format_protocol(protocol)}
                    for port, protocol in found_insecure_ports]
                result.append({
                    'cloud_resource_id': cloud_resource.get(
                        'cloud_resource_id'),
                    'resource_name': cloud_resource.get('name'),
                    'cloud_account_id': config.get('id'),
                    'resource_id': cloud_resource.get('resource_id'),
                    'cloud_type': config.get('type'),
                    'cloud_account_name': config.get('name'),
                    'security_group_name': sg.name,
                    'security_group_id': sg.id,
                    'region': cloud_resource.get('region'),
                    'is_excluded': cloud_resource.get(
                        'pool_id') in excluded_pools,
                    'insecure_ports': insecure_ports_js,
                })
        return result

    def _get_nebius_insecure(self, config, resources, excluded_pools,
                             insecure_ports):
        supported_protocols = ['TCP', 'UDP', 'ANY']
        # according to https://nebius.com/il/docs/vpc/concepts/security-groups#rules-default
        default_instance_sg = {
            'id': 'default',
            'name': 'default',
            'rules': [
                {
                    'direction': 'INGRESS',
                    'protocolName': 'TCP',
                    'cidrBlocks': {'v4CidrBlocks': ['0.0.0.0/0']},
                    'ports': {'toPort': '22'}
                },
                {
                    'direction': 'INGRESS',
                    'protocolName': 'TCP',
                    'cidrBlocks': {'v4CidrBlocks': ['0.0.0.0/0']},
                    'ports': {'toPort': '3889'}
                }]}

        result = []
        nebius = CloudAdapter.get_adapter(config)
        folders = set(x.get('meta', {}).get('folder_id')
                      for x in resources if x.get('meta', {}).get('folder_id'))
        security_groups_map = {}
        for folder in folders:
            folder_sgs = nebius.security_groups_list(folder)
            for folder_sg in folder_sgs:
                security_groups_map[folder_sg['id']] = folder_sg
        security_groups_map[default_instance_sg['id']] = default_instance_sg

        for instance in resources:
            found_insecure_ports = set()
            inst_sgs = instance.get('meta', {}).get('security_groups')
            if not inst_sgs:
                # instances without sg have default sg
                inst_sgs = [default_instance_sg['id']]
            for sg_id in inst_sgs:
                sg = security_groups_map.get(sg_id)
                if not sg or 'rules' not in sg:
                    continue
                for rule in sg['rules']:
                    if rule['direction'] == 'EGRESS':
                        continue
                    protocol = rule['protocolName']
                    if protocol not in supported_protocols:
                        continue
                    if 'cidrBlocks' not in rule:
                        continue
                    cidr_blocks = rule['cidrBlocks'].get('v4CidrBlocks', [])
                    cidr_blocks += rule['cidrBlocks'].get('v6CidrBlocks', [])
                    if not any(filter(lambda x: x in INSECURE_CIDRS, cidr_blocks)):
                        continue
                    from_port = int(rule['ports'].get('fromPort', 0))
                    to_port = int(rule['ports'].get('toPort', 0))
                    for port_info in insecure_ports:
                        insecure_port = port_info['port']
                        insecure_protocol = port_info['protocol'].upper()
                        if ((from_port <= insecure_port <= to_port or
                                insecure_port == from_port or
                                insecure_port == to_port) and
                                protocol in [insecure_protocol, 'ANY']):
                            found_insecure_ports.add((insecure_port, protocol))

                if found_insecure_ports:
                    insecure_ports_js = [{
                        'port': port,
                        'protocol': self._format_protocol(protocol)
                    } for port, protocol in found_insecure_ports]
                    region = instance.get('region') or instance.get(
                        'meta', {}).get('zone_id')
                    result.append({
                        'cloud_resource_id': instance.get(
                            'cloud_resource_id'),
                        'resource_name': instance.get('name'),
                        'cloud_account_id': config.get('id'),
                        'resource_id': instance.get('resource_id'),
                        'cloud_type': config.get('type'),
                        'cloud_account_name': config.get('name'),
                        'security_group_name': sg['name'],
                        'security_group_id': sg.get('id'),
                        'region': region,
                        'is_excluded': instance.get(
                            'pool_id') in excluded_pools,
                        'insecure_ports': insecure_ports_js,
                    })
        return result

    def _get_gcp_insecure(self, config, resources, excluded_pools,
                          insecure_ports):
        result = []
        gcp = CloudAdapter.get_adapter(config)
        network_self_link_id = {
            x.self_link: str(x.id) for x in gcp.discover_networks()
        }
        network_firewalls_map = defaultdict(list)
        firewall_id_insecure_ports = defaultdict(list)
        all_ports_rule = f'{MIN_PORT_VALUE}-{MAX_PORT_VALUE}'
        insecure_protocols = set(x['protocol'] for x in insecure_ports)
        # all ingress traffic is denied by default so find insecure firewalls
        # with 'allow' rules
        for firewall in gcp.discover_firewalls():
            if firewall.disabled:
                # not working firewall
                continue
            elif firewall.direction != 'INGRESS':
                continue
            elif not firewall.allowed:
                # secure firewall rules due to only 'deny' rules
                continue
            not_secure_source_ranges = list(filter(
                lambda x: x in INSECURE_CIDRS, firewall.source_ranges))
            if firewall.source_service_accounts or firewall.source_tags or (
                    firewall.source_ranges and not not_secure_source_ranges):
                # secure firewall rules due to limited number of source ips
                continue
            insecure_firewall_ports = []
            for rule in firewall.allowed:
                protocol = rule.I_p_protocol
                ports = set()
                rule_ports = rule.ports
                if not rule_ports:
                    rule_ports = [all_ports_rule]
                    if protocol in insecure_protocols or protocol == 'all':
                        insecure_firewall_ports.append({
                            'port': '*',
                            'protocol': self._format_protocol(protocol)
                        })
                        continue
                for port_range in rule_ports:
                    ports_list = port_range.split('-')
                    if len(ports_list) == 2:
                        # port range is in format: "1-22"
                        ports.update(x for x in range(int(ports_list[0]),
                                                      int(ports_list[1]) + 1))
                    elif port_range:
                        ports.add(int(port_range))
                    else:
                        ports.update(x for x in range(MIN_PORT_VALUE,
                                                      MAX_PORT_VALUE))
                for insecure_port in insecure_ports:
                    ins_port = insecure_port['port']
                    ins_protocol = insecure_port['protocol']
                    if ins_port in ports and (
                            ins_protocol == protocol or protocol == 'all'):
                        insecure_port['protocol'] = self._format_protocol(
                            ins_protocol)
                        insecure_firewall_ports.append(insecure_port)
            if insecure_firewall_ports:
                firewall_network_id = network_self_link_id[firewall.network]
                network_firewalls_map[firewall_network_id].append(firewall)
                firewall_id_insecure_ports[firewall.id] = insecure_firewall_ports

        # find resources in insecure firewalls
        for resource in resources:
            network_id = resource.get('meta', {}).get('vpc_id')
            resource_firewalls = network_firewalls_map[network_id]
            sg_tags = resource.get('meta', {}).get('security_groups')
            for firewall in resource_firewalls:
                if firewall.target_tags and not list(filter(
                        lambda x: x in firewall.target_tags, sg_tags)):
                    # firewall not applied to instance
                    continue
                resource_insecure_ports = firewall_id_insecure_ports[
                    firewall.id]
                result.append({
                    'cloud_resource_id': resource.get('cloud_resource_id'),
                    'resource_name': resource.get('name'),
                    'cloud_account_id': config.get('id'),
                    'resource_id': resource.get('resource_id'),
                    'cloud_type': config.get('type'),
                    'cloud_account_name': config.get('name'),
                    'security_group_name': firewall.name,
                    'security_group_id': str(firewall.id),
                    'region': resource.get('region'),
                    'is_excluded': resource.get('pool_id') in excluded_pools,
                    'insecure_ports': resource_insecure_ports,
                })
        return result


def main(organization_id, config_client, created_at, **kwargs):
    return InsecureSecurityGroups(
        organization_id, config_client, created_at).get()


def get_module_email_name():
    return 'Instances with insecure Security Groups settings'
