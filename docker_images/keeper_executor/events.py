import enum


class Events(enum.Enum):
    NXXXX = [
        "Mock description",  # description
        [],  # parameters
        "INFO"  # event level
    ]
    N0023 = [
        'Power schedule {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0024 = [
        'Power schedule {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0025 = [
        'Power schedule {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0026 = [
        'Power schedule {object_name} ({object_id}) processing completed: '
        '{success_count} resources powered {vm_action}, {error_count} '
        'resources failed, {not_active_count} resources are not active',
        ['object_name', 'object_id', 'success_count', 'error_count',
         'not_active_count', 'vm_action'],
        "INFO"
    ]
    N0027 = [
        'Organization {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0028 = [
        'Organization {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0029 = [
        'Organization {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0030 = [
        'Resource discovery failed for cloud account {object_name} '
        '({object_id}) for {resource_type} resources, error: {message}',
        ['object_name', 'object_id', 'resource_type', 'message'],
        "ERROR"
    ]
    N0065 = [
        '{contact_type} alert for pool {pool_name}{with_subpools} for '
        '{warn_type} {threshold_string} deleted',
        ['contact_type', 'pool_name', 'with_subpools', 'warn_type',
         'threshold_string'],
        "INFO"
    ]
    N0066 = [
        'Cloud account {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0067 = [
        'Cloud account {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0068 = [
        'Cloud account {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0069 = [
        'Billing data import for cloud account {object_name} '
        '({cloud_account_id}) finished successfully',
        ['object_name', 'cloud_account_id'],
        "INFO"
    ]
    N0070 = [
        'Billing data import for cloud account {object_name} '
        '({cloud_account_id}) failed: {error_reason}',
        ['object_name', 'cloud_account_id', 'error_reason'],
        "ERROR"
    ]
    N0071 = [
        'Assignment request from {object_name} ({object_id}) to '
        '{approver_name} ({approver_id}) for resource {resource_name} '
        '({resource_cloud_res_id}) was accepted',
        ['object_name', 'object_id', 'approver_name', 'approver_id',
         'resource_name', 'resource_cloud_res_id'],
        "INFO"
    ]
    N0072 = [
        'Assignment request from {object_name} ({object_id}) to '
        '{approver_name} ({approver_id}) for resource '
        '{resource_name} ({resource_cloud_res_id}) was declined',
        ['object_name', 'object_id', 'approver_name', 'approver_id',
         'resource_name', 'resource_cloud_res_id'],
        "INFO"
    ]
    N0076 = [
        'Invalid assignment tag detected. {resource_type} {res_name} '
        '({cloud_resource_id}) moved to organization pool',
        ['resource_type', 'res_name', 'cloud_resource_id'],
        "INFO"
    ]
    N0079 = [
        'Assignment Rules processing for {target} completed. {total} '
        'resources have been processed',
        ['target', 'total'],
        "INFO"
    ]
    N0080 = [
        "{total} new resources discovered for cloud account "
        "{object_name} ({object_id})",
        ['total', 'object_name', 'object_id'],
        "INFO"
    ]
    N0081 = [
        'Rule applied: {rule_count} resources have been automatically '
        'assigned to pool {pool_name} ({pool_id}) according to rule '
        '{object_name} ({object_id})',
        ['rule_count', 'pool_name', 'pool_id', 'object_name', 'object_id'],
        "INFO"
    ]
    N0082 = [
        'Rule is disabled: {object_name} ({object_id}) points to the invalid '
        'pair of pool {pool_name} ({pool_id}) and owner {owner_name} '
        '({owner_id}). Rule has been disabled, please fix and reenable it',
        ['object_name', 'object_id', 'pool_id', 'pool_name', 'owner_name',
         'owner_id'],
        "INFO"
    ]
    N0083 = [
        'Assignment Rules have been forced to run by {user_display_name} '
        '({user_email}). Target is {target}',
        ['user_display_name', 'user_email', 'target'],
        "INFO"
    ]
    N0084 = [
        'Recommendation {recommendation} dismissed for resource '
        '{object_name} ({object_id}) by {user_display_name} ({user_email})',
        ['recommendation', 'object_name', 'object_id', 'user_display_name',
         'user_email'],
        "INFO"
    ]
    N0085 = [
        'Recommendation {recommendation} reactivated for resource '
        '{object_name} ({object_id}) by {user_display_name} ({user_email})',
        ['recommendation', 'object_name', 'object_id', 'user_display_name',
         'user_email'],
        "INFO"
    ]
    N0086 = [
        'Rule {rule_name} ({rule_id}) created for pool {pool_name} '
        '({pool_id}) by {user_display_name} ({user_email})',
        ['rule_name', 'rule_id', 'pool_name', 'pool_id', 'user_display_name',
         'user_email'],
        "INFO"
    ]
    N0087 = [
        'Rule {rule_name} ({rule_id}) deleted by {user_display_name} '
        '({user_email})',
        ['rule_name', 'rule_id', 'user_display_name', 'user_email'],
        "INFO"
    ]
    N0088 = [
        'Rule {rule_name} ({rule_id}) updated by {user_display_name} '
        '({user_email})',
        ['rule_name', 'rule_id', 'user_display_name', 'user_email'],
        "INFO"
    ]
    N0089 = [
        'Pool {object_name} has been deleted by {user_display_name} '
        '({user_email}). {res_count} resources have been moved to pool '
        '{new_pool_name}. {rules_cnt} rules have been redirected',
        ['object_name', 'user_display_name', 'user_email', 'res_count',
         'new_pool_name', 'rules_cnt'],
        "INFO"
    ]
    N0090 = [
        'Pool {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0091 = [
        'Pool {object_name} ({object_id}) updated with parameters: {params} '
        'by {user_display_name} ({user_email})',
        ['object_name', 'object_id', 'params', 'user_display_name',
         'user_email'],
        "INFO"
    ]
    N0092 = [
        '{policy_type} policy for pool {pool_name} ({pool_id}) '
        'enabled by {user_name} ({user_email})',
        ['policy_type', 'pool_name', 'pool_id', 'user_name', 'user_email'],
        "INFO"
    ]
    N0093 = [
        '{policy_type} policy for pool {pool_name} ({pool_id}) '
        'disabled by {user_name} ({user_email})',
        ['policy_type', 'pool_name', 'pool_id', 'user_name', 'user_email'],
        "INFO"
    ]
    N0094 = [
        '{policy_type} policy for pool {pool_name} ({pool_id}) '
        'created by {user_name} ({user_email})',
        ['policy_type', 'pool_name', 'pool_id', 'user_name', 'user_email'],
        "INFO"
    ]
    N0095 = [
        '{policy_type} policy for pool {pool_name} ({pool_id}) '
        'deleted by {user_name} ({user_email})',
        ['policy_type', 'pool_name', 'pool_id', 'user_name', 'user_email'],
        "INFO"
    ]
    N0096 = [
        '{policy_type} policy for pool {object_name} ({object_id}) updated '
        'with parameters: {params} by {user_display_name} ({user_email})',
        ['policy_type', 'pool_name', 'pool_id', 'params',
         'user_display_name', 'user_email'],
        "INFO"
    ]
    N0097 = [
        'Employee {email} invited by {user_display_name} ({user_email}) with '
        'roles: {scope_purposes}',
        ['email', 'user_display_name', 'user_email', 'scope_purposes'],
        "INFO"
    ]
    N0098 = [
        '{total_count} resources assigned to pool {object_name} ({object_id}) '
        'to {employee_name} ({employee_id}) by {user_display_name} '
        '({user_email})',
        ['total_count', 'object_name', 'object_id', 'employee_name',
         'employee_id', 'user_display_name', 'user_email'],
        "INFO"
    ]
    N0099 = [
        '{constraint_type} constraint for resource {object_name} '
        '({object_id}) created by {user_display_name} ({user_email})',
        ['constraint_type', 'object_name', 'object_id', 'user_display_name',
         'user_email'],
        "INFO"
    ]
    N0100 = [
        '{constraint_type} constraint for resource {object_name} '
        '({object_id}) deleted by {user_display_name} ({user_email})',
        ['constraint_type', 'object_name', 'object_id', 'user_display_name',
         'user_email'],
        "INFO"
    ]
    N0101 = [
        '{constraint_type} constraint for resource {object_name} '
        '({object_id}) updated with parameters: {params} by '
        '{user_display_name} ({user_email})',
        ['constraint_type', 'object_name', 'object_id', 'params',
         'user_display_name', 'user_email'],
        "INFO"
    ]
    N0102 = [
        'Cloud account {object_name} ({object_id}) capabilities may be '
        'degraded: {reason}',
        ['object_name', 'object_id', 'reason'],
        "INFO"
    ]
    N0103 = [
        '{contact_type} alert for pool {pool_name}{with_subpools} for '
        '{warn_type} {threshold_string} created',
        ['contact_type', 'pool_name', 'with_subpools', 'warn_type',
         'threshold_string'],
        "INFO"
    ]
    N0104 = [
        'Cluster types have been forced to run by {user_display_name} '
        '({user_email})',
        ['user_display_name', 'user_email'],
        "INFO"
    ]
    N0105 = [
        'Cluster type applied: {clustered_resources_count} resources have '
        'been automatically grouped to {clusters_count} clusters according '
        'to cluster type {object_name} ({object_id})',
        ['clustered_resources_count', 'clusters_count', 'object_name',
         'object_id'],
        "INFO"
    ]
    N0106 = [
        'Cluster types reassignment completed. {total} resources have been '
        'processed',
        ['total'],
        "INFO"
    ]
    N0107 = [
        'Cluster type {cluster_type_name} ({cluster_type_id}) deleted, '
        '{modified_count} resources has been automatically ungrouped',
        ['cluster_type_name', 'cluster_type_id', 'modified_count'],
        "INFO"
    ]
    N0108 = [
        "{total} new resources discovered for cloud account "
        "{object_name} ({object_id}). {clustered} of them were "
        "assembled into {clusters} clusters",
        ['total', 'object_name', 'object_id', 'clustered', 'clusters'],
        "INFO"
    ]
    N0109 = [
        'Cost model changed. Expense recalculation for cloud account '
        '{object_name} ({cloud_account_id}) started',
        ['object_name', 'cloud_account_id'],
        "INFO"
    ]
    N0110 = [
        'Expense recalculation for cloud account {object_name} '
        '({cloud_account_id}) completed successfully',
        ['object_name', 'cloud_account_id'],
        "INFO"
    ]
    N0111 = [
        'Expense recalculation for cloud account {object_name} '
        '({cloud_account_id}) failed: {error_reason}',
        ['object_name', 'cloud_account_id', 'error_reason'],
        "INFO"
    ]
    N0113 = [
        'Booking of the resource {object_name} ({object_id}) was changed by '
        '{user_display_name}',
        ['object_name', 'object_id', 'user_display_name'],
        "INFO"
    ]
    N0114 = [
        'Booking of the resource {object_name} ({object_id}) was deleted by '
        '{user_display_name}',
        ['object_name', 'object_id', 'user_display_name'],
        "INFO"
    ]
    N0115 = [
        'Resource {object_name} ({object_id}) has been released',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0116 = [
        "Unable to clean up calendar {calendar_id} events during "
        "disconnection",
        ['calendar_id'],
        "WARNING"
    ]
    N0117 = [
        'Calendar {calendar_id} connected',
        ['calendar_id'],
        "INFO"
    ]
    N0118 = [
        'Calendar {calendar_id} disconnected',
        ['calendar_id'],
        "INFO"
    ]
    N0119 = [
        'Calendar {calendar_id} synchronization warning: {reason}',
        ['calendar_id', 'reason'],
        "WARNING"
    ]
    N0120 = [
        'Organization {object_name} ({object_id}) has been submitted for '
        'technical audit by employee {employee_name} ({employee_id})',
        ['object_name', 'object_id', 'employee_name', 'employee_id'],
        "INFO"
    ]
    N0122 = [
        'Shared environment {object_name} ({object_id}) has been {state}',
        ['object_name', 'object_id', 'state'],
        "INFO"
    ]
    N0123 = [
        'Task {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0124 = [
        'Task {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0125 = [
        'Task {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0126 = [
        'Metric {metric_name} ({metric_id}) {state} for task {object_name} '
        '({object_id})',
        ['object_name', 'object_id', 'metric_name', 'metric_id', 'state'],
        "INFO"
    ]
    N0127 = [
        'Metric {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0128 = [
        'Metric {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0129 = [
        'Metric {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0130 = [
        'Run {object_name} ({object_id}) started',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0131 = [
        'Run {object_name} ({object_id}) failed',
        ['object_name', 'object_id'],
        "ERROR"
    ]
    N0132 = [
        'Run {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0133 = [
        'Run {object_name} ({object_id}) state changed to {state}',
        ['object_name', 'object_id', 'state'],
        "INFO"
    ]
    N0134 = [
        'New executor on instance {object_id} for run {run_name} ({run_id}) '
        'detected',
        ['object_id', 'run_name', 'run_id'],
        "INFO"
    ]
    N0135 = [
        'Leaderboard template with id {object_id} for task {task_name} '
        '({task_id}) created',
        ['object_id', 'task_name', 'task_id'],
        "INFO"
    ]
    N0136 = [
        'Leaderboard template with id {object_id} for task {task_name} '
        '({task_id}) deleted',
        ['object_id', 'task_name', 'task_id'],
        "INFO"
    ]
    N0137 = [
        'Leaderboard template with id {object_id} for task {task_name} '
        '({task_id}) updated',
        ['object_id', 'task_name', 'task_id'],
        "INFO"
    ]
    N0138 = [
        'Leaderboard {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0139 = [
        'Leaderboard {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0140 = [
        'Leaderboard {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0141 = [
        'Dataset {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0142 = [
        'Dataset {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0143 = [
        'Dataset {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0144 = [
        'Model {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0145 = [
        'Model {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0146 = [
        'Model {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0147 = [
        'Model version {object_name} ({object_id}) detected for model '
        '{model_name} ({model_id})',
        ['object_name', 'object_id', 'model_name', 'model_id'],
        "INFO"
    ]
    N0148 = [
        'Model version {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0149 = [
        'Model version {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0150 = [
        'Artifact {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0151 = [
        'Artifact {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0152 = [
        'Artifact {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0153 = [
        'Runset template {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0154 = [
        'Runset template {object_name} ({object_id}) deleted',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0155 = [
        'Runset template {object_name} ({object_id}) updated',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0156 = [
        'Runset {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0157 = [
        'Runset {object_name} ({object_id}) changed state to {state}',
        ['object_name', 'object_id', 'state'],
        "DEBUG"
    ]
    N0158 = [
        'Executor {object_name} ({object_id}) created',
        ['object_name', 'object_id'],
        "INFO"
    ]
    N0159 = [
        'Executor {object_name} ({object_id}) changed state to {state}',
        ['object_name', 'object_id', 'state'],
        "DEBUG"
    ]
    N0160 = [
        'Executor {object_name} ({object_id}) destroyed',
        ['object_name', 'object_id'],
        "INFO"
    ]
