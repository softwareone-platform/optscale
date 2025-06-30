<!-- TODO: Add more documentation and explanation, especially about the x86 and arm modes -->

# Set up a virtual machine for development / testing of deployment

## Install Prerequisites

1. [Install `vagrant`](https://developer.hashicorp.com/vagrant/install). On MacOS:
```sh
brew install vagrant
```
2. Install `QEMU`. On MacOS:
```sh
brew install qemu
```
3. Install the `QEMU` plugin for `Vagrant`:
```sh
vagrant plugin install vagrant-qemu
```

## Set up the Virtual Machine

Use the `vm` script in `optscale-deploy` to manage the VM. There are currently two VMs ready for use:
`arm` and `x86`. Use whichever matches your machine's OS but the other one should also work via
emulation (note that it will be _significantly slower_ though).

To start the VM (and create if it doesn't already exist):

```sh
./vm arm start
```

## Deploy Optscale to the VM


```sh
./vm arm playbook ansible/vm.yaml
```
