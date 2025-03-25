## Patching working pod on OptScale environment

### For Ubuntu 20 (docker)

1.Backup up the images
```
docker tag <image_name>:local <image_name>:backup
```
for example,
```
docker tag rest_api:local rest_api:backup
```

2.Enter into the pod
```
kubectl exec -it <pod name> -- bash
```
pods names can be fetched using command
```
kubectl get pod
```

3.Patch the pod content, then find the pod process
```
docker ps | grep <pod_name>
```
4.Commit the image

>:warning: The 'local' tag will be overwritten during the cluster update. If you want to save the image permanently, consider using a custom tag.
```
docker commit <process_name> <image_name>:local
```

5.Delete the pod to restart service from the new image
```
kubectl delete pod <pod_name>
```

From the sources images (with tag "local" by default) can be built running
```
./build.sh <service_name>
```



### For Ubuntu 24 (k8s 1.32+, nerdctl)

1.Backup up the images
```
nerdctl tag <image_name>:local <image_name>:backup
```
for example,
```
nerdctl tag rest_api:local rest_api:backup
```

2.Enter into the pod
```
kubectl exec -it <pod name> -- bash
```
pods names can be fetched using command
```
kubectl get pod
```

3.Patch the pod content, then find the pod process
```
nerdctl ps | grep <pod_name>
```
4.Commit the image

>:warning: The 'local' tag will be overwritten during the cluster update. If you want to save the image permanently, consider using a custom tag.

```
nerdctl commit <process_name> <image_name>:local
```
5.Delete the pod to restart service from the new image
```
kubectl delete pod <pod_name>
```

From the sources images (with tag "local" by default) can be built running
```
./build.sh <service_name> --use-nerdctl
```