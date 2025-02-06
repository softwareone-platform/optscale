import os
import requests

# Read input parameters from environment variables
JIRA_URL = os.getenv("INPUT_JIRA_BASE_URL")
JIRA_USERNAME = os.getenv("INPUT_JIRA_USER_EMAIL")
JIRA_API_TOKEN = os.getenv("INPUT_JIRA_API_TOKEN")
JQL_QUERY = os.getenv("INPUT_JQL")
GITHUB_OUTPUT = os.getenv("GITHUB_OUTPUT")

# Ensure required environment variables are set
if not all([JIRA_URL, JIRA_USERNAME, JIRA_API_TOKEN, JQL_QUERY]):
    print("::error::Missing required input parameters: jira_base_url, jira_user_email, jira_api_token, jql.")
    exit(1)

# Jira API endpoint
jira_search_url = f"{JIRA_URL}/rest/api/3/search"

# Basic Authentication
auth = (JIRA_USERNAME, JIRA_API_TOKEN)

# Request headers
headers = {
    "Accept": "application/json"
}

# Build the payload
payload = {
    "jql": JQL_QUERY,
    "maxResults": 1  # Only need to check for the existence of at least one issue
}

try:
    # Make the request to Jira
    response = requests.post(jira_search_url, headers=headers, auth=auth, json=payload)
    response.raise_for_status()  # Raise exception for HTTP errors

    # Parse response
    issues = response.json().get("issues", [])

    # Write result to $GITHUB_OUTPUT
    with open(GITHUB_OUTPUT, "a") as github_output:
        if issues:
            github_output.write("issues_exist=true\n")
            print("::notice::Jira issues found matching the JQL query.")
        else:
            github_output.write("issues_exist=false\n")
            print("::notice::No Jira issues found matching the JQL query.")

except requests.RequestException as e:
    print(f"::error::{str(e)}")
    exit(1)
