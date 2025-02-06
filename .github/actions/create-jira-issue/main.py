import os
import requests

# Read input parameters from environment variables
JIRA_URL = os.getenv("INPUT_JIRA_BASE_URL")
JIRA_USERNAME = os.getenv("INPUT_JIRA_USER_EMAIL")
JIRA_API_TOKEN = os.getenv("INPUT_JIRA_API_TOKEN")
PROJECT = os.getenv("INPUT_PROJECT")
SUMMARY = os.getenv("INPUT_SUMMARY")
DESCRIPTION = os.getenv("INPUT_DESCRIPTION")
ISSUE_TYPE = os.getenv("INPUT_ISSUE_TYPE")
FIX_VERSION = os.getenv("INPUT_FIX_VERSION")
COMPONENT = os.getenv("INPUT_COMPONENT")
EPIC = os.getenv("INPUT_EPIC")
ASSIGNEE = os.getenv("INPUT_ASSIGNEE")
GITHUB_OUTPUT = os.getenv("GITHUB_OUTPUT")

# Ensure required environment variables are set
if not all([JIRA_URL, JIRA_USERNAME, JIRA_API_TOKEN, PROJECT, SUMMARY, ISSUE_TYPE, FIX_VERSION, COMPONENT]):
    print(
        "::error::Missing required input parameters: "
        "jira_base_url, jira_user_email, jira_api_token, project, summary, issue_type, "
        "fix_version, component."
    )
    exit(1)

# Jira API endpoint
jira_search_url = f"{JIRA_URL}/rest/api/3/issue"

# Basic Authentication
auth = (JIRA_USERNAME, JIRA_API_TOKEN)

# Request headers
headers = {
    "Accept": "application/json"
}

# Build the payload
payload = {
    "fields": {
        "project": {"key": PROJECT},
        "summary": SUMMARY,
        "issuetype": {"name": ISSUE_TYPE},
        "fixVersions": [{"name": FIX_VERSION}],
        "components": [{"name": COMPONENT}]
    }
}

if DESCRIPTION:
    payload["fields"]["description"] = {"value": DESCRIPTION}

if ASSIGNEE:
    payload["fields"]["assignee"] = {"name": ASSIGNEE}

if EPIC:
    payload["fields"]["parent"] = {"key": EPIC}


try:
    # Make the request to Jira
    response = requests.post(jira_search_url, headers=headers, auth=auth, json=payload)
    response.raise_for_status()  # Raise exception for HTTP errors

    # Parse response
    issue_key = response.json()["key"]

    # Write result to $GITHUB_OUTPUT
    with open(GITHUB_OUTPUT, "a") as github_output:
        github_output.write(f"issue_key={issue_key}\n")
        print(f"::notice::Jira issue created {issue_key}.")

except requests.RequestException as e:
    print(f"::error::{str(e)}")
    exit(1)
