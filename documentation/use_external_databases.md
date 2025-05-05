# Use external databases
There is a possibility to work with an external database that is located on 
another host outside of kubernetes

## External mongodb
1\. Add these fields in overlay/user_template.yml ([optscale/optscale-deploy/overlay/user_template.yml](../optscale-deploy/overlay/user_template.yml)):
You can provide credentials
```
# Mongodb host and credentials
mongo:
  credentials:
    username: <name>
    password: <pass>
  service:
    host: <host>
    externalPort: <port>
```
or connection string
```
# Mongodb connection string
mongo:
  url: <mongodb_connection_string>
```

2\. add --external-mongo param to runkube command to avoid raising the service:

```
./runkube.py --with-elk --external-mongo -o overlay/user_template.yml -- 
<deployment_name> <version>
```

## External clickhouse
1\. Add these fields in overlay/user_template.yml ([optscale/optscale-deploy/overlay/user_template.yml](../optscale-deploy/overlay/user_template.yml)):
You can provide credentials
```
# Clickhouse host and credentials
clickhouse:
  db:
    name: default
    user: default
    password: <pass>
  service:
    host: <host>
```

2\. add --external-clickhouse param to runkube command to avoid raising the 
service:

```
./runkube.py --with-elk --external-clickhouse -o overlay/user_template.yml -- 
<deployment_name> <version>
```

