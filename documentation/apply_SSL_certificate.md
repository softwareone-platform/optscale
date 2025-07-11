# How to apply SSL certificate to OptScale NGINX

Copy Key and CRT files to host as the following files: ```/tmp/key.pem``` and ```/tmp/cert.pem```

and delete old Kubernetes secret:
```
kubectl delete secret defaultcert
```
then create a new Kubernetes secret from uploaded files:
```
kubectl create secret tls defaultcert --key /tmp/key.pem --cert /tmp/cert.pem
```
and restart all NGINX Kubernetes pods: 
```
kubectl delete pod $(kubectl get pod | awk '/ngingress-nginx-ingress-controller/ {print $1}')
```

# How to use **cert-manager** for managing the SSL certificate lifecycle

You can use [cert-manager](https://cert-manager.io) to manage the SSL certificate enrollment and renewal.

The installation of **cert-manager** and the setup of an Issuer is out of the scope of this guide.
Please read the [cert-manager documentation](https://cert-manager.io/docs/getting-started/).

To setup Optscale to use cert-manager:

Edit file with overlay - [optscale-deploy/overlay/user_template.yml](optscale-deploy/overlay/user_template.yml); see comments in overlay file for guidance.

Apply the changes using `runkube.py`:

```
./runkube.py --with-elk  -o overlay/user_template.yml -- <deployment name> <version>
```
