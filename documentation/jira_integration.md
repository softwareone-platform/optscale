# How to integrate Jira

1. **Log in to the Jira instance** you want to integrate with OptScale.

2. In Jira, go to **Apps** → **Manage your apps**.

3. Click **Settings**, and ensure that **"Enable development mode"** is turned **on**.

4. **Install the private app**  
   **Important:** Atlassian requires your host to have a **valid SSL certificate** to access the app descriptor.

5. Go to the app installation page: **Manage your app** → **Upload app**. Then, add the following URL as the **descriptor URL**:  
   `https://<CLUSTER_IP or DNS>/jira_bus/v2/app_descriptor`. 
   After that, select **Jira**.

6. After installation, go to **Apps** → **OptScale settings**.

7. Click the **"Log in to OptScale"** button.

8. Once logged in, select the **organization** you want to use with the Jira app.

9. Now, when you create a Jira ticket, you should see an **"IT environments (OptScale)"** field. This allows you to assign available **Shared Environments** to the ticket.

**Don't forget**: create a **Shareable Environment** in your OptScale organization beforehand, so it can be used in Jira tickets.