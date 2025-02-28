#!/usr/bin/env python

import argparse
import logging
import os
import yaml

from kubernetes import client as k8s_client, config as k8s_config
from python_on_whales import DockerClient
from python_on_whales.exceptions import NoSuchImage


LOG = logging.getLogger(__name__)
LABELS = ['build_url', 'commit']
CONFIGMAP_NAME = 'optscale-version'
NAMESPACE = 'default'


class ClusterInfo:
    def __init__(self, config, no_urls, insecure=False):
        self.config = config
        k8s_config.load_kube_config(self.config)
        self.core_api = k8s_client.CoreV1Api()
        self.no_urls = no_urls
        self.insecure = insecure
        self._ctrl_cl = None

    @property
    def ctrd_cl(self):
        cmd = ["nerdctl"]
        if not self._ctrl_cl:
            if self.insecure:
                cmd.append("--insecure-registry")
            LOG.info("Connecting to ctd daemon")
            self._ctrl_cl = DockerClient(client_call=cmd)
        return self._ctrl_cl

    def get_cluster_info(self):
        version_map_data = self.core_api.read_namespaced_config_map(
            name=CONFIGMAP_NAME, namespace=NAMESPACE
        ).data
        version_map = yaml.safe_load(
            version_map_data['component_versions.yaml'])

        if self.no_urls:
            return version_map

        for image in list(version_map['images']):
            try:
                self.ctrd_cl.image.inspect(f"{image}:local")
            except NoSuchImage:
                LOG.warning('image %s not found', image)
                del version_map['images'][image]
                continue

            version_map['images'][image] = {
                'version': version_map['images'][image]
            }
        return version_map


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser(description='Get OptScale cluster info')
    parser.add_argument(
        '--config',
        default=os.path.join(os.environ.get('HOME'), '.kube/config'),
        help='Path to k8s config file',
    )
    parser.add_argument(
        '--no-urls',
        action='store_true',
        help='Only show content of the OptScale version configmap, don\'t print build URLs for images',
    )
    parser.add_argument(
        '--insecure',
        action='store_true',
        help='Allow insecure container registry connections',
    )
    arguments = parser.parse_args()

    info = ClusterInfo(arguments.config, arguments.no_urls,
                       arguments.insecure)
    result = info.get_cluster_info()
    print(yaml.dump(result, default_flow_style=False, sort_keys=False))
