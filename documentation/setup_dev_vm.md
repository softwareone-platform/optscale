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
3. [`vagrant-qemu`](https://github.com/ppggff/vagrant-qemu) as the bridge between Vagrant and QEMU  
4. **VirtualBox** — optional alternative virtualization provider  
5. **`vagrant-disksize` plugin** — required when using VirtualBox to control disk size (not required for QEMU, QEMU disk sizing is controlled by the QEMU provider config (qemu.disk_resize)

> [!WARNING]
> ## Prefer VirtualBox on Linux Kernel 6.14+
>  
> Starting with **Linux kernel 6.14**, changes in KVM/QEMU interaction may cause  
> **QEMU virtual machines to fail, lose acceleration, or break after updates**.  
>  
> Because of this, it is **strongly recommended** to use **VirtualBox** as the
> virtualization provider on Linux hosts running kernel **6.14 or newer**.
>
> Use VirtualBox explicitly:
>
> ```sh
> ./vm.sh --provider virtualbox start
> ```
>
> Using QEMU on recent Linux kernels may lead to:
> - VM startup failures  
> - Missing KVM acceleration  
> - Unstable or crashing VM processes  
> - Guest OS boot loops  
>
> **VirtualBox remains unaffected and provides stable performance.**

> [!NOTE]
> ## Nested Virtualization (running VM inside another VM)
>  
> If you are using **Vagrant/QEMU/VirtualBox inside a virtual machine** (e.g., running on VMware, Proxmox, Hyper-V, or cloud VPS):
>  
> - Your host hypervisor **must support nested virtualization**,  
> - AND it must be **explicitly enabled** for your VM.
>
> Without nested virtualization:
>
> - QEMU will run **without KVM acceleration** → extremely slow  
> - VirtualBox may **fail to start VMs** or run in pure software mode  
> - Provisioning times may increase from 20–30 minutes → **several hours**
>
> ### How to enable nested virtualization (quick reference)
>
> **Proxmox:**
> ```sh
> qm set <VMID> -cpu host
> echo "options kvm-intel nested=Y" >> /etc/modprobe.d/kvm-intel.conf
> modprobe -r kvm_intel && modprobe kvm_intel
> ```
>
> **VMware ESXi / Workstation / Fusion:**
> ```sh
> vhv.enable = "TRUE"
> ```
>
> **Hyper-V:**
> ```powershell
> Set-VMProcessor -VMName "MyVM" -ExposeVirtualizationExtensions $true
> ```
>
> **VirtualBox (running as host hypervisor):**
> ```sh
> VBoxManage modifyvm <VMName> --nested-hw-virt on
> ```
>
> ### Recommendation
> For best performance and compatibility:
>
> - Prefer **bare-metal** environments when possible  
> - If running inside a VM, ensure **nested virtualization is enabled** before using `vm.sh` with QEMU or VirtualBox  

`Vagrant` already provides a great CLI to manage and run the VMs but it has a few annoying quirks and it still requires
complicated commands to run common operations specific to Optscale, so we built a wrapper script to make it even easier to
set up and use VMs -- `optscale-deploy/vm.sh`.

---

## Install Prerequisites

1. **Install `vagrant`** using your system package manager.

### On MacOS:

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/hashicorp-vagrant
```

### On Ubuntu:

```sh
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" \
| sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vagrant
```

2. **Install QEMU**

### On MacOS:

```sh
brew install qemu
```

### On Ubuntu:
(if decided to use qemu, please note warning above)

```sh
sudo apt-get install qemu-system
```

3. **Install the required Vagrant plugins**

```
vagrant plugin install vagrant-qemu
vagrant plugin install vagrant-disksize
```

> **IMPORTANT:**  
> `vagrant-disksize` is **required** when using VirtualBox, and also used in general to configure VM disk size.

4. **Optional: Install VirtualBox**

VirtualBox can be used instead of QEMU.  
To force using VirtualBox:

```sh
./vm.sh --provider virtualbox start
```

---

## Set up the Virtual Machine

Use the `vm.sh` script in `optscale-deploy` to manage the VM. There are currently two VMs ready for use: `arm` and `x86`.
Use whichever matches your machine's OS but the other one should also work via emulation (note that it will be
_significantly slower_ though).

You can either explicitly specify it as the first argument like so:

```sh
./vm.sh x86 start
```

or omit it entirely in which case it will default to your host machines' CPU architecture:

```sh
./vm.sh start
```

(running the command above on an M4 Mac will create the ARM-based virtual machine)

> Creating a virtual machine also copies your local version of this repo into `~/optscale` meaning it's very easy to
> test local changes not yet pushed to GitHub.

> Feel free to mess around with the `Vagrantfile` itself whether it's to tweak some of the settings or even create new
> virtual machines, it should be fairly straight-forward to do so :)

---

## VM resource configuration (`--cpus`, `--ram`, `--disk`)

The `vm.sh` helper now supports dynamic resource overrides:

| Flag | Meaning | Default |
|------|---------|---------|
| `--cpus N` | Number of virtual CPUs | `4` |
| `--ram N` | VM RAM in GB | `10` |
| `--disk N` | VM disk size in GB | `75` |

Example:

```sh
./vm.sh x86 --cpus 8 --ram 16 --disk 120 start
```

These settings propagate into the Vagrantfile through environment variables:

- `VM_CPUS`
- `VM_RAM_GB`
- `VM_DISK_GB`

They apply both to **QEMU** and **VirtualBox**.

---

#### Preparing virtual environment

Run the following commands:

```
virtualenv -p python3 .venv
source .venv/bin/activate
pip install -r requirements.txt
```
#### Creating user overlay

Edit file with overlay - [optscale-deploy/overlay/user_template.yml](optscale-deploy/overlay/user_template.yml); see comments in overlay file for guidance.

## Optional ELK stack (`--with-elk`)

The `vm.sh` wrapper also supports enabling the **ELK stack** (Elasticsearch, Logstash, Kibana) in the local deployment.

Global flag:

- `--with-elk` — enable ELK support for the current command.

When `--with-elk` is used:

1. The `elk` container image is built as part of the provisioning process.
2. The Ansible playbook receives `with_elk=true`.
3. `runkube.py` is executed with the `--with-elk` flag for:
   - initial provisioning,
   - `deploy-service`,
   - `update-only`.

Examples:

Provision VM with ELK enabled:

```sh
./vm.sh  --with-elk playbook ansible/provision-vm.yaml
```

Deploy a single service with ELK-aware configuration:

```sh
./vm.sh --with-elk deploy-service rest_api
```
If ELK stack is required, need to set  `--with-elk` directly.

Update existing OptScale release while keeping ELK enabled:

```sh
./vm.sh --with-elk update-only
```

If `--with-elk` is omitted, the behavior is unchanged from the previous default (no ELK components are built or deployed).

---

## Provider Selection

By default, QEMU is used (especially useful for Apple Silicon and cross-architecture development).  
VirtualBox can also be used and works very well on x86 hosts.

Explicit provider selection:

```sh
./vm.sh --provider qemu start
./vm.sh --provider virtualbox start
```

> **NOTE:**  
> When using VirtualBox, `vagrant-disksize` must be installed or Vagrant will fail to start the VM.

---

## Deploy Optscale on the VM

There is also an ansible playbook specifically built to allow a single command provisioning of Optscale onto a fresh Virtual
Machine: `optscale-deploy/ansible/provision-vm.yaml`. It will do everything -- from installing dependencies, setting up the
cluster, building all the containers (including `elk` when `--with-elk` is used) and creating a new Kubernetes deployment
using `runkube.py`.

There is nothing VM-specific this playbook does, it largely simply follows the instructions on the `README.md` page
but it's more automated, so that it can all be done in a single command.

Execute this (or any other) playbook with:

```sh
./vm.sh arm playbook ansible/provision-vm.yaml
```

Or, with ELK enabled:

```sh
./vm.sh arm --with-elk playbook ansible/provision-vm.yaml
```

There is also a `role` command which allows us to run a specific ansible role against the VM.

---

## Accessing the platform

If everything goes well, you should be able to access the platform soon.

Keep in mind that the initial provisioning of the VM takes quite some time (~20–30 mins on an M4 Macbook)
mostly due to all the containers that need to be built from scratch. Also note that the Kubernetes cluster
will need some time (~15 mins) to spin all the pods after the playbook's execution is complete.

Once ready, open your browser and navigate to:

- `https://localhost:9444` for **ARM VM**
- `https://localhost:9443` for **x86 VM**

(additional forwards)
- `http://localhost:41080` for **PhpMyadmin**
- `http://localhost:41081` for **Kibana (if enabled)**
- `http://localhost:41082` for **grafana**

Port values come from the `Vagrantfile`.

---

## Troubleshooting

The `./vm.sh` script provides useful commands to debug issues:

* `info` — shows general information about the VM itself: status, name, process ID etc.
* `ssh` — allows you to ssh into the VM and investigate issues or make persistent changes directly.
* `optscale-info` — shows information specific to the Optscale deployment: frontend access URL, k8s cluster
  health, pods which are currently failing etc.

---

## Deploying and testing local changes using the VM

Once your VM is running, you can easily deploy your local changes using the **experimental** `deploy-service` command.

Example:

```sh
./vm.sh deploy-service rest_api
```

This will:

1. Sync your local repo changes into the VM  
2. Rebuild the selected service  
3. Apply changes using `runkube.py`  

The entire process usually takes ~1 minute.

If ELK is enabled via `--with-elk`, the same command will keep ELK configuration in sync with your updated deployment.

---

## Other commands

* `stop` — stop the virtual machine (preserves state)
    * use `--force` to forcefully terminate VM process
* `restart` — restarts the VM
* `destroy` — stops and deletes the whole VM including data
* `reset` — a convenience command combining `destroy` + `start`
* `update-only` — rebuilds OptScale containers and redeploys without full reprovisioning

The resource flags (`--cpus`, `--ram`, `--disk`) work with all lifecycle commands. The ELK flag (`--with-elk`) can be
combined with any command that performs provisioning, deployment or update logic.
