# How to get a verification code

1\. Configure SMTP according to the [instructions](https://github.com/hystax/optscale/blob/integration/documentation/setting_up_smtp.md).

2\. Pass the registration flow:

    -   Access the sign-up page.  
    -   Fill out the registration form with your business email, full name, password, and password confirmation.  
        - Once the form is submitted, the system creates a new account in a **not confirmed** state. This ensures the account remains inactive until the email address is verified.  
        - A unique verification code is generated and sent to the user's email address.

    -   The system automatically opens the verification page after registration. The verification code was sent to the email address displayed on this page.

    -   Enter the verification code on the page.
        - If you didn’t receive the email or lost it, use the **Send Verification Code Again** link to request a new code.
        - Once the correct code is entered, the system validates it and updates the account status to **confirmed**.  
        - If no organization exists, a new one is created automatically.  
        - The user is then redirected to the application and can begin using their account.

    -   If the code is invalid or expired, the system displays an error and allows to retry or request a new code.

> [!NOTE]
> Disable email verification by adding `disable_email_verification: True` to the [user_template.yml](https://github.com/hystax/optscale/blob/integration/optscale-deploy/overlay/user_template.yml) file and then updating the cluster with the modified overlay:
> 
> ```
> ./runkube.py --with-elk -o overlay/user_template.yml -- <deployment name> <version>
> ```

3\. Troubleshooting: 

-   Check the **"herald"** service logs in Kibana when registering a user. The verification code should be sent during this process. Use [this instructions](https://github.com/hystax/optscale/blob/integration/documentation/kibana_logs.md) to access Kibana logs.

-   If you encounter SMTP errors, refer to the guide: [Setting Up SMTP](https://github.com/hystax/optscale/blob/integration/documentation/setting_up_smtp.md).