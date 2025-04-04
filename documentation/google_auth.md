# Configure login with Google and Microsoft authentication

To enable Google and Microsoft login on your cluster, follow these instructions.

## Google

1\. Go to https://console.cloud.google.com/apis/credentials.

2\. Open *CREATE CREDENTIALS* → *OAuth Client ID* → *Web application* → in the *Authorized JavaScript origins* section, insert the URL of your OptScale cluster → *Create*.

3\. Copy *Client ID* and *Client secret*.

4\. Go to your `optscale-deploy` repository:

```
$ cd ~/optscale/optscale-deploy/
```

5\. Insert *Client ID* and *Client secret* copied on the third step into the `auth` and `ngui` sections:

-   [optscale-deploy/overlay/user_template.yml#L89](https://github.com/hystax/optscale/blob/integration/optscale-deploy/overlay/user_template.yml#L89), 

-   [optscale-deploy/overlay/user_template.yml#L90](https://github.com/hystax/optscale/blob/integration/optscale-deploy/overlay/user_template.yml#L90),

-   [optscale-deploy/overlay/user_template.yml#L96](https://github.com/hystax/optscale/blob/integration/optscale-deploy/overlay/user_template.yml#L96).

6\. Launch the command to restart the OptScale with the updated overlay:

```
./runkube.py --with-elk -o overlay/user_template.yml -- <deployment name> <version>
```

## Microsoft

1\. Go to your Microsoft account.

2\. *All services* → *App Registrations* → select the application → Manage → *Authentication* → add a platform → *Single-page applications* → add two valid redirect URIs. For example, `https://your-optscale.com/login` and `https://your-optscale.com/register`.

3\. Go to *App Registration* → *Overview* → *Application* → copy *client_id*.

4\. Go to your `optscale-deploy` repository:

```
$ cd ~/optscale/optscale-deploy/
```

5\. Insert *client_id* copied on the third step into the `auth` and `ngui` sections: 

-   [optscale-deploy/overlay/user_template.yml#L97](https://github.com/hystax/optscale/blob/integration/optscale-deploy/overlay/user_template.yml#L97),

-   [optscale-deploy/overlay/user_template.yml#L91](https://github.com/hystax/optscale/blob/integration/optscale-deploy/overlay/user_template.yml#L91).

6\. Launch the command to restart the OptScale with the updated overlay:

```
./runkube.py --with-elk -o overlay/user_template.yml -- <deployment name> <version>
```


