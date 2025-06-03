# Set up a virtual machine for development / testing of deployment

## Install Prerequisites

1. [Install `vagrant`](https://developer.hashicorp.com/vagrant/install). On MacOS:
```sh
brew install vagrant
```
2. [Install `VirtualBox`](https://www.virtualbox.org/wiki/Downloads). On MacOS:
```sh
brew install virtualbox
```
3. _If you're using MacOS on Apple Silicon_ [you may need to unset the following Virtualbox global setting](https://developer.hashicorp.com/vagrant/tutorials/get-started/setup-project#prerequisites):
```sh
VBoxManage setextradata global "VBoxInternal/Devices/pcbios/0/Config/DebugLevel"
```

## Set up the Virtual Machine

Start the VM:

```sh
vagrant up
```

## Deploy Optscale to the VM

### Install the deployment's dependencies

```sh
cd optscale-deploy
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Run the deployment

Run the ansible deployment:

```sh
ansible-playbook --inventory-file ansible/inventory-vm.yaml ansible/k8s-master.yaml
```
