## Update Optscale to new release
#### _(Update to [Ubuntu 24.04 LTS Noble Numbat](https://releases.ubuntu.com/noble/), [k8s](https://kubernetes.io/), [BuildKit](https://docs.docker.com/build/buildkit/), [nerdctl](https://github.com/containerd/nerdctl))_

> :warning: Before pulling new release
> - make sure you backed up data folder/volume ``` /optscale ```
> - make sure you backed up user overlays ``` ~/optscale/optscale-deploy/overlay/ ```

In this example instruction data directory is placed in ```/optscale```, sources placed in ```~/optscale```

#### 1. navigate to optscale-deploy repo:

```
$ cd ~/optscale/optscale-deploy/
```
#### 2. activate .venv

``
~/optscale/optscale-deploy$ source .venv/bin/activate
``

#### 3. delete deployment

```
~/optscale/optscale-deploy$ ./runkube.py -d  -- <release_name> local
```

if you're forgotten release name, you can use this command:
```
$ helm list | grep optscale
```
The output should be like:
```
$ helm list | grep optscale
NAME         	REVISION	UPDATED                 	STATUS  	CHART               	APP VERSION	NAMESPACE
os-1      	1       	Thu Dec 26 12:32:35 2024	DEPLOYED	optscale-0.1.0      	           	default
```

according to the output, my release is: __os-1__ and the command will be:

```
~/optscale/optscale-deploy$ ./runkube.py -d  -- os-1 local
```
```
12:29:10.285: Deleting optscale cluster os-1 on k8s 172.24.1.14
release "os-1" deleted

```
#### 4. deactivate and remove virtual environment

```
~/optscale/optscale-deploy$ deactivate
~/optscale/optscale-deploy$ rm -r .venv/
```

#### 5. reset k8s

>:warning: All Kubernetes applications, including the k8s agent, will be deleted and must be reinstalled if necessary.

```
$ sudo kubeadm reset
```

```
$ rm $HOME/.kube/config
```

#### 6. remove k8s, docker

```
$ sudo apt remove --purge kube*
$ sudo apt remove --purge docker-*
```

#### 7. update base system

```
$ sudo apt update && sudo apt dist-upgrade -y && sudo apt clean && sudo apt autoclean && sudo apt autoremove -y
```

#### 8. reboot server
```
$ sudo reboot
```

#### 9. do release upgrade

get version:
```
$ lsb_release -a
```
update manager core and do release upgrade:

```
$ sudo apt install update-manager-core
```
20.04 -> 22.04
```
$ sudo do-release-upgrade
```
answer 'y' and follow instructions

22.04 -> 24.04
```
$ lsb_release -a
```
```
...
Description:	Ubuntu 22.04.5 LTS
Release:	22.04
```
```
$ sudo do-release-upgrade
```
answer 'y' and follow instructions

#### 10. install requirements

```
$ sudo apt update; sudo apt install python3-pip sshpass git python3-virtualenv python3
```

#### 11. pull new version
```
~/optscale$ git fetch && git pull
```

#### 12. create new venv
```
~/optscale$ cd optscale-deploy/
```

```
~/optscale/optscale-deploy$ virtualenv -p python3 .venv
```
```
~/optscale/optscale-deploy$ source .venv/bin/activate
```

```
~/optscale/optscale-deploy$ pip install -r requirements.txt
```


#### 13. run ansible playbook

```
~/optscale/optscale-deploy$  ansible-playbook -e "ansible_ssh_user=<user>" -k -K -i "<ip>," ansible/k8s-master.yaml
```
when __user__ - your actual user
__ip__ - our cluster ip address

#### 14. re-login or source ~/.profile

```
$  source ~/.profile
```

#### 15. (optional) build new components

```
cd .. && ./build.sh --use-nerdct
```

#### 16. (optional) recover your user overlays from backup
>:warning: The overlay needs access to your cluster data saved in your data folder,
> for example, database passwords, service account, etc.
> typically default overlay is stored in ```user_template.yml```

#### 17. start updated cluster with saved overlay
```
./runkube.py --no-pull --with-elk  -o overlay/user_template.yml -- <release_name> <version>
```
when __release_name__ - your cluster name
__version__ - your version, for example I want to run cluster __os-1__ with locally built version:
```
./runkube.py --no-pull --with-elk  -o overlay/user_template.yml -- os-1 local
```
