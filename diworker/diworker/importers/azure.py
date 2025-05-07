#!/usr/bin/env python
import json
import logging
from datetime import datetime, timezone, timedelta

import tools.optscale_time as opttime
from diworker.diworker.utils import retry_backoff
from tools.cloud_adapter.clouds.azure import (
    AzureConsumptionException, ExpenseImportScheme,
    AzureErrorResponseException, AzureAuthenticationError,
    AzureResourceNotFoundError)

from diworker.diworker.importers.base import BaseReportImporter

LOG = logging.getLogger(__name__)
CHUNK_SIZE = 200

REGION_NAMES = {
    "AP Southeast": "Southeast Asia",
    "AE North": "UAE North",
    "US East 2": "East US 2",
    "EU North": "North Europe",
    "IN Central": "Central India",
    "NorthCentralUs": "North Central US",
    "SouthCentralUS": "South Central US",
    "WestUS": "West US",
    "uswest": "West US",
    "uswest2": "West US 2",
    "uswest3": "West US 3",
    "EastUS": "East US",
    "useast": "East US",
    "EastUS2": "East US 2",
    "CentralUS": "Central US",
    "USCentral": "Central US",
    "USNorth": "North Central US",
    "USSouth": "South Central US",
}


class AzureImporterBase(BaseReportImporter):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        resource_type_map = {
            'disks': 'Volume',
            'storageAccounts': 'Bucket',
            'publicIPAddresses': 'IP Address',
            'virtualMachines': 'Instance',
            'snapshots': 'Snapshot',
            'loadBalancers': 'Load Balancer',
        }
        self.resource_type_map_lowered = {
            k.lower(): v for k, v in resource_type_map.items()
        }

    @staticmethod
    def _get_additional_expenses_groupings():
        return {'meter_id': '$meter_id'}

    def get_unique_field_list(self):
        return [
            'start_date',
            'meter_id',
            'resource_id',
            'cloud_account_id',
            'additional_properties',
            'obtained_by_date',
            'billing_period_start_date'
        ]

    def get_raw_upsert_filters(self, expense):
        filters = super().get_raw_upsert_filters(expense)
        # upsert in two cases:
        # record from another report import OR
        # record from the same report and equal _rec_n
        filters.update({
            '$or': [
                {'report_identity': {'$ne': self.report_identity}},
                {'_rec_n': expense['_rec_n']}
            ]
        })
        return filters

    def get_update_fields(self):
        custom_fields = {
            'end_date', 'usage_quantity', 'cost', 'report_identity', '_rec_n'}
        legacy_fields = {
            'cost', 'effective_price'}
        modern_fields = {
            'cost_in_billing_currency', 'cost_in_pricing_currency',
            'cost_in_usd', 'payg_cost_in_billing_currency',
            'payg_cost_in_usd'}
        raw_fields = {
            'usage_end_time'}
        return list(custom_fields | legacy_fields | modern_fields | raw_fields)

    def _clean_tree(self, tree):
        for k, v in tree.copy().items():
            if isinstance(v, dict):
                self._clean_tree(v)
            elif v is None:
                del tree[k]

    @staticmethod
    def datetime_from_str(date_str):
        return datetime.strptime(
            date_str, '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)

    @staticmethod
    def str_from_datetime(date_obj):
        return date_obj.replace(tzinfo=timezone.utc).strftime(
            '%Y-%m-%dT%H:%M:%S.%fZ')

    def _fill_custom_fields(self, u):
        """
        The updated Consumption API supports two different response kinds:
        `legacy` and `modern`. Many fields are different for them. Let's try to
        unify the result a bit by moving some of them around and introducing
        our own fields.

        We also support raw usage API to calculate prices manually for
        subscriptions not supported by Consumption API. This is essentially the
        third response kind, a bit different again...

        Also note that the results returned by the old Consumption API are
        different from both kinds produced by the new API! We don't use the old
        API anymore, but the results may still reside in DB.

        So, if you want to use something from raw expenses in, for example,
        recommendations, I advise avoiding it at all costs. If the required
        information is available only in raw expenses, check that the required
        field exists for all response types. If it does not, try adding the
        missing field here. Otherwise, each of your recommendations will
        have to deal with this mess individually.

        Consult these pages for additional information on response format:
        https://datatrendstech.atlassian.net/wiki/spaces/OPT/pages/2629173251
        https://docs.microsoft.com/en-us/rest/api/consumption/usage-details/list

        :param u: usage dict
        :return: does not return anything, it updates usage dict in-place
        """
        usage_kind = u.get('kind')
        if usage_kind == 'legacy':
            u['cost'] = float(u['cost'])
            if 'resource_id' not in u:
                u['resource_id'] = u['id']
            u['resource_id'] = u['resource_id'].lower()
            if 'additional_info' in u:
                u['additional_properties'] = u.pop('additional_info')
            # 'meter_details' already exists
            u['start_date'] = self.datetime_from_str(u['date'])
            u['end_date'] = u['start_date'] + timedelta(days=1)
        elif usage_kind == 'modern':
            u['cost'] = float(u['cost_in_billing_currency'])
            u['resource_id'] = u['instance_name'].lower()
            if 'additional_info' in u:
                u['additional_properties'] = u.pop('additional_info')
            u['meter_details'] = {
                'meter_name': u.pop('meter_name'),
                'meter_category': u.pop('meter_category'),
                'meter_sub_category': u.pop('meter_sub_category'),
                'unit': u.pop('unit_of_measure'),
                'meter_location': u.pop('meter_region'),
            }
            u['start_date'] = self.datetime_from_str(u['date'])
            u['end_date'] = u['start_date'] + timedelta(days=1)
        elif usage_kind == 'raw':
            u['cost'] = float(u['cost'])
            instance_data = json.loads(u['instance_data'])[
                'Microsoft.Resources']
            u['resource_id'] = instance_data['resourceUri'].lower()
            if 'location' in instance_data:
                u['resource_location'] = instance_data['location']
            if 'additionalInfo' in instance_data:
                additional_info = instance_data['additionalInfo']
                u['additional_properties'] = (
                    json.dumps(additional_info, sort_keys=True)
                    if additional_info else '')
            u['meter_details'] = {
                'meter_name': u.pop('meter_name', None),
                'meter_category': u.pop('meter_category', None),
                'meter_sub_category': u.pop('meter_sub_category', None),
                'unit': u.pop('unit', None),
                'meter_location': u.pop('meter_region', None),
            }
            u['start_date'] = self.datetime_from_str(u['usage_start_time'])
            u['end_date'] = self.datetime_from_str(u['usage_end_time'])
        elif usage_kind == 'export':
            u['cost'] = float(u.get('cost_in_billing_currency')
                              or u.get('pre_tax_cost'))
            resource_id = u.get('resource_id') or u.get('instance_id')
            u['resource_id'] = resource_id.lower()
            if 'additional_info' in u:
                u['additional_properties'] = u.pop('additional_info')
            u['meter_details'] = {
                'meter_name': u.pop('meter_name', None),
                'meter_category': u.pop('meter_category', None),
                'meter_sub_category': u.pop('meter_sub_category', None),
                'unit': u.pop('unit_of_measure', None),
                'meter_location': u.pop('meter_region', None),
            }
            u['tags'] = json.loads(u.get('tags') or '{}')
            exp_date = u.get('usage_date_time')
            if exp_date:
                usage_datetime = datetime.strptime(
                    u['usage_date_time'], '%Y-%m-%d')
            else:
                usage_datetime = datetime.strptime(u['date'], '%m/%d/%Y')
            u['start_date'] = usage_datetime.replace(
                hour=0, minute=0, second=0, microsecond=0, tzinfo=timezone.utc)
            u['end_date'] = u['start_date'] + timedelta(days=1)
        else:
            raise Exception('Unknown usage kind for usage dict: {}'.format(u))

        if u['meter_details'].get('meter_category', '') == 'Virtual Machines':
            u['box_usage'] = True

        # Rename to unify with responses from older Consumption API
        if 'quantity' in u:
            u['usage_quantity'] = u.pop('quantity')

        u['cloud_account_id'] = self.cloud_acc_id
        u['report_identity'] = self.report_identity

    def _get_resource_type_and_name(self, instance_id):
        if instance_id:
            r_type = instance_id.split('/')[-2]
            r_name = instance_id.split('/')[-1]
            if not r_name:
                r_name = '/'.join([instance_id.split("/")[-3], r_type])
            return self.resource_type_map_lowered.get(
                r_type.lower(), r_type), r_name
        else:
            raise Exception('Unable to parse type and name - empty '
                            'instance_id')

    @staticmethod
    def _get_resource_service(instance_id):
        if instance_id:
            id_parts = instance_id.split('/')
            for i, part in enumerate(id_parts):
                if part.lower() == 'providers':
                    return id_parts[i + 1]
        raise Exception('Unable to parse service - empty instance_id or no '
                        'service entry')

    def get_resource_info_from_expenses(self, expenses):
        r_type, r_name = self._get_resource_type_and_name(
            expenses[-1].get('resource_id'))

        usage_kind = expenses[-1].get('kind')
        if usage_kind == 'raw':
            instance_data = json.loads(expenses[-1]['instance_data'])[
                'Microsoft.Resources']
            region_id = instance_data.get('location')
            region = self.cloud_adapter.location_map.get(region_id)
            tags = self.extract_tags(instance_data.get('tags', {}))
            service = self._get_resource_service(instance_data['resourceUri'])
        else:
            region_fields = ['location', 'resource_location',
                             'resource_location_normalized',
                             'instance_location']
            region_set = {e.get(region_field)
                          for region_field in region_fields for e in expenses
                          if e.get(region_field)}
            # instance_location may contain network az (DE Zone 1) if record
            # relates to networking charges. we can't map such info to proper
            # region, so looking for smth present in our map
            regions_map = REGION_NAMES.copy()
            coordinates_map = self.cloud_adapter.get_regions_coordinates()
            for k, v in coordinates_map.items():
                region_name = v['name']
                regions_map[k] = region_name
                if 'alias' in v:
                    regions_map[v['alias']] = region_name
            regions_map.update(REGION_NAMES)
            for r in region_set:
                if r in regions_map:
                    region = regions_map.get(r)
                    break
            else:
                region = None
                if region_set:
                    region = region_set.pop()
                    if region not in regions_map.values():
                        LOG.warning('Unable to find regions %s in map',
                                    region_set)
            tags = self.extract_tags(expenses[-1].get('tags', {}))
            service = expenses[-1].get('consumed_service')

        first_seen = opttime.utcnow()
        last_seen = opttime.utcfromtimestamp(0).replace()
        for e in expenses:
            start_date = e['start_date']
            if start_date and start_date < first_seen:
                first_seen = start_date
            end_date = e['end_date']
            if end_date and end_date > last_seen:
                last_seen = end_date
        if last_seen < first_seen:
            last_seen = first_seen
        info = {
            'name': r_name,
            'type': r_type,
            'region': region,
            'service_name': service.lower() if service else None,
            'tags': tags,
            'first_seen': int(first_seen.timestamp()),
            'last_seen': int(last_seen.timestamp())
        }
        LOG.debug('Detected resource info: %s', info)
        return info

    def create_traffic_processing_tasks(self):
        self._create_traffic_processing_tasks()


class AzureApiImporter(AzureImporterBase):

    def detect_period_start(self):
        # When choosing period_start for Azure, prioritize last expense date
        # over date of the last import run. That is because for Azure the latest
        # expenses are not available immediately, and we need to load these
        # expenses again on the next run.
        last_import_at = self.get_last_import_date(self.cloud_acc_id)
        if last_import_at:
            self.period_start = last_import_at.replace(
                hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)
        else:
            super().detect_period_start()

    @retry_backoff(AzureConsumptionException,
                   raise_errors=[
                       AzureAuthenticationError, AzureResourceNotFoundError
                   ], raise_codes=[403])
    def load_raw_data(self):
        import_scheme = self.cloud_adapter.expense_import_scheme
        if import_scheme == ExpenseImportScheme.usage.value:
            self._load_usage_data()
        elif import_scheme == ExpenseImportScheme.raw_usage.value:
            # TODO: it's better to cache prices somewhere in DB
            LOG.info('Downloading PayAsYouGo prices')
            try:
                prices = self.cloud_adapter.get_public_prices()
            except AzureErrorResponseException as exc:
                code = getattr(exc.error, 'additional_properties', {}).get(
                    'error', {}).get('code')
                if code == 'SubscriptionNotFound':
                    msg = exc.error.additional_properties['error'].get(
                        'message')
                    raise AzureResourceNotFoundError(msg)
                else:
                    raise exc
            LOG.info('Fetched %s price entries', len(prices))
            self._load_raw_usage_data(prices)
        elif import_scheme == ExpenseImportScheme.partner_raw_usage.value:
            # TODO: it's better to cache prices somewhere in DB
            LOG.info('Downloading partner prices')
            prices = self.cloud_adapter.get_partner_prices()
            LOG.info('Fetched %s price entries', len(prices))
            self._load_raw_usage_data(prices)
        else:
            raise Exception('Unsupported expense import scheme: {}'.format(
                import_scheme))
        self.clear_rudiments()

    @retry_backoff(AzureConsumptionException,
                   raise_errors=[
                       AzureAuthenticationError,  AzureResourceNotFoundError
                   ], raise_codes=[403])
    def _load_usage_data(self):
        chunk = []
        usages = self.cloud_adapter.get_usage(self.period_start) or []
        record_number = 0
        for usage_obj in usages:
            if len(chunk) == CHUNK_SIZE:
                self.update_raw_records(chunk)
                chunk = []
            usage_dict = usage_obj.as_dict()
            record_number += 1
            usage_dict['_rec_n'] = record_number
            self._fill_custom_fields(usage_dict)
            self._clean_tree(usage_dict)
            if usage_dict['start_date'] >= self.period_start.replace(
                    tzinfo=timezone.utc):
                chunk.append(usage_dict)
        if chunk:
            self.update_raw_records(chunk)

    @retry_backoff(AzureConsumptionException,
                   raise_errors=[
                       AzureAuthenticationError, AzureResourceNotFoundError
                   ], raise_codes=[403])
    def _get_day_raw_usage(self, current_day):
        return self.cloud_adapter.get_raw_usage(
            current_day, current_day + timedelta(days=1), 'Daily')

    def _load_raw_usage_data(self, prices):
        chunk = []
        skus_without_prices = set()
        current_day = self.period_start.replace(
            hour=0, minute=0, second=0, microsecond=0, tzinfo=timezone.utc)
        last_day = opttime.utcnow().replace(
            hour=0, minute=0, second=0, microsecond=0, tzinfo=timezone.utc)
        while current_day < last_day:
            LOG.info('Processing raw expenses for %s', current_day)

            # This API really likes to split usage entries in parts and returns
            # missing parts for some day in results for other day. It also
            # doesn't depict usage range correctly: all parts tell that they
            # contain a full day. So, let's query expenses for each day
            # separately, and then record the request date by which they were
            # obtained (`obtained_by_date` unique field). This allows us to
            # collect all usage parts without them being overwritten by each
            # other. Later, on clean expense generation, all entries for one
            # day will be summed together.
            record_number = 0
            try:
                daily_usages = self._get_day_raw_usage(current_day)
                for usage_obj in daily_usages:
                    usage_dict = usage_obj.as_dict()
                    inst_data = json.loads(usage_dict.get('instance_data', '{}'))
                    alt_sku_id = inst_data.get('Microsoft.Resources', {}).get(
                        'additionalInfo', {}).get('ConsumptionMeter')
                    price_item = prices.get(usage_dict['meter_id']) or prices.get(
                        alt_sku_id)
                    if price_item is None:
                        skus_without_prices.add(usage_dict['meter_id'])
                    usage_dict['kind'] = 'raw'
                    usage_dict['obtained_by_date'] = self.str_from_datetime(
                        current_day)
                    # TODO: support rates properly
                    usage_dict['cost'] = usage_obj.quantity * price_item[
                        'rates'][0][1] if price_item else 0
                    record_number += 1
                    usage_dict['_rec_n'] = record_number
                    self._fill_custom_fields(usage_dict)
                    self._clean_tree(usage_dict)
                    if usage_dict['start_date'] >= self.period_start.replace(
                            tzinfo=timezone.utc):
                        chunk.append(usage_dict)
                    if len(chunk) == CHUNK_SIZE:
                        self.update_raw_records(chunk)
                        chunk = []
            except AzureErrorResponseException as ex:
                code = getattr(ex.error, 'additional_properties', {}).get(
                    'error', {}).get('code')
                if code == 'SubscriptionNotFound':
                    msg = ex.error.additional_properties['error'].get(
                        'message')
                    raise AzureResourceNotFoundError(msg)
                error_message = str(ex)
                if 'Unknown error' in error_message:
                    LOG.error('No ready reports yet in cloud for %s. Will '
                              'skip the remaining report import days and try '
                              'next time later.', current_day)
                    break
                raise
            current_day += timedelta(days=1)
        if chunk:
            self.update_raw_records(chunk)
        if skus_without_prices:
            LOG.warning('Could not find prices for SKU IDs: %s',
                        skus_without_prices)
