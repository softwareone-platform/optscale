## Installing/connecting Metrics API service

###  Installing Metrics API


1. Using ansible command (on the new clusters)

set _install_metrics_server=true_ in the ansible command:
```
ansible-playbook -e "ansible_ssh_user=<user> install_metrics_server=true" -k -K -i "<ip address>," ansible/k8s-master.yaml
```

2. Installing manually/on existing clusters

- apply chart

```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

```

then need to add _--kubelet-insecure-tls_ to the args

```
kubectl edit deployment metrics-server -n kube-system
```
```
args:
  - --kubelet-insecure-tls
```

**or** use one-liner
```
kubectl patch deployment metrics-server -n kube-system --type='json' -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
```
Then wait for a while for the Metrics Server to start.

Please note that opening port 10250 may be required for the Metrics Server to function properly.

```
sudo iptables -I INPUT -p tcp --dport 10250 -j ACCEPT
```


### Deleting Metrics API

To delete Metrics API run:

```
kubectl delete deployment metrics-server -n kube-system
```
