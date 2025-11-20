# Set up a virtual machine for development / testing of deployment

With the help of a few tools we now have the capability to run the whole optscale locally by running a few simple commands,
allowing new developers to contribute immediately as well as explore the codebase freely with quick feedback cycle for their
local changes and requiring minimal knowledge about the deployment process. Virtual Machines also make it possible to have
as close to production-level environment running locally helping with testing and making changes to the deployment process
itself and also allowing developers to use different OS and even CPU architecture than Ubuntu 24.04 running on x86 hardware
(which is a hard requirement at the moment for an Optscale deployment), e.g. Apple Silicon Macs.

The tools which allow us to do that are:

1. [Vagrant](https://developer.hashicorp.com/vagrant/) to configure and manage the virtual machines
2. [QEMU](https://www.qemu.org/) as the virtualization engine used to run them
3. [`vagrant-qemu`](https://github.com/ppggff/vagrant-qemu) as the bridge between them

`Vagrant` already provides a great CLI to manage and run the VMs but it has a few annoying quirks and it still requires
complicated commands to run common operations specific to Optscale, so we built a wrapper script to make it even easier to
set up and use VMs -- `optscale-deploy/vm.sh`.

## Install Prerequisites

1. [Install `vagrant`](https://developer.hashicorp.com/vagrant/install) using your system package manager.
<details><summary>On MacOS:</summary>
  
```sh
brew tap hashicorp/tap
brew install hashicorp/tap/hashicorp-vagrant
```
</details>

<details><summary>On Ubuntu:</summary>

```sh
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vagrant
```
</details>

2. [Install `QEMU`](https://www.qemu.org/download/) using your system package manager.

<details><summary>On MacOS:</summary>

```sh
brew install qemu
```
</details>

<details><summary>On Ubuntu:</summary>

```sh
apt-get install qemu-system
```
</details>

3. Install and enable the [`QEMU` plugin for `Vagrant`](https://github.com/ppggff/vagrant-qemu):
```sh
vagrant plugin install vagrant-qemu
```

## Set up the Virtual Machine


Use the `vm.sh` script in `optscale-deploy` to manage the VM. There are currently two VMs ready for use: `arm` and `x86`.
Use whichever matches your machine's OS but the other one should also work via emulation (note that it will be
_significantly slower_ though)

You can either explicitly specify it as the first argument like so:

```sh
./vm.sh x86 start
```

or ommit it entierly in whcih case it will default to your host machines' CPU architecture:

```sh
./vm.sh start
```

(running the command above on an M4 Mac will create the ARM-based virtual machine)

> [!NOTE]
> Creating a virtual machine also copies your local version of this repo into `~/optscale` meaning it's very easy to
> test local changes not yet pushed to GitHub

> [!TIP]
> Feel free to mess arround with the `Vagrantfile` itself whether it's to tweak some of the settings or even create new
> virtual machines, it should be fairly straight-forward to do so :)

## Deploy Optscale on the VM

There is also an ansible playbook specifically built to allow a single command provisioning of Optscale onto a fresh Virtual
Machine: `optscale-deploy/ansible/provision-vm.yaml`. It will do everything -- from installing dependancies, setting up the
cluster, building all the containers and creating a new Kubernetes deployment using `runkube.py`.

> [!NOTE]
> There is nothing VM-specific this playbook does, it largely simply follows the instructions on the `README.md` page
> but it's more automated, so that it can all be done in a single command

Execuring this (or any other) playbook is also very easy with the `./vm.sh` script:

```sh
./vm.sh arm playbook ansible/provision-vm.yaml
```

> [!TIP]
> There is also a `role` command which allows us to run a specific ansible role against the VM.


## Accessing the platform

If everything goes well, you should be able to access the platform soon

> [!IMPORTANT]
> Keep in mind that the initial provisioning of the VM takes quite some time (~20-30 mins on an M4 Macbook)
> mostly due to all the containers that need to be built from scratch. Also note that the Kubernetes cluster
> will need some time (~15 mins) to spin all the pods after the playbook's execution is complete

Once ready, open your browser and navigate to `https://localhost:9444/` (if using the `arm` VM) or `https://localhost:9443` if
using the `x86` VM (port values taken from `Vagrantfile`)

## Troubleshooting

The `./vm.sh` script provides a few useful commands to more easily debug issues if anything goes wrong:

* `info` -- shows general information about the VM itself: status, name, process ID etc.
* `ssh` -- allows you to `ssh` into the VM and investigate issues or make persistent changes directly
* `optscale-info` (_experimental_) -- shows information specific to the Optscale deployment: frontend access URL, k8s cluster
  health, pods which are currently failing etc.

## Deploying and testing local changes using the VM

Assuming you got a virtual machine up and running, you can now easily deploy your local changes either by resetting the whole VM
(but this will be slow as the whole provisioning process needs to run again) or by utilizing the **experimental**
`deploy-service` command. Let's say we've made some changes to the `rest_api` service locally and we want to see how they
will work in the context of the whole application -- we can do that with simply running:

```sh
./vm.sh deploy-service rest_api
```

This will sync the local changes with the copy of the repo on the VM, rebuild only the `rest_api` container there and run
`runkube.py` again to apply them on the cluster -- the whole process takes about a minute.


## Other commands

The other not previously mentioned `./vm.sh` commands are:

* `stop` -- stop the virtual machine (if started again it will persist its previous state)
    * `--force` is an optional flag you can pass to shut down the VM immediately but risking
      leaving it in a potentially broken state
* `restart` -- restarts the VM
* `destroy` -- stops and deletes the whole VM including its data. The next time `start` is being run the
  it will be a fresh Ubuntu instance
* `reset` -- a convenience command combining `destroy` and `start`
