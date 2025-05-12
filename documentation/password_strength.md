# Setting up the password strength policy

To set up custom password strength:

1\. Fill in these fields in overlay/user_template.yml ([optscale/optscale-deploy/overlay/user_template.yml](../optscale-deploy/overlay/user_template.yml)):

```
# settings for password strength policy with integer values
password_strength_settings:
  min_length:
  min_lowercase:
  min_uppercase:
  min_digits:
  min_special_chars:
```

New values cannot be less than default values.

Default policy values:
```
min_length: 4
min_lowercase: 0
min_uppercase: 0
min_digits: 0
min_special_chars: 0
```

2\. Restart the cluster with the updated user_template.yml:

```
./runkube.py --with-elk  -o overlay/user_template.yml -- <deployment name> <version>
```
