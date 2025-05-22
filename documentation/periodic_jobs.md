# Periodic jobs and schedulers

OptScale has several periodic jobs implemented as Kubernetes CronJobs or Deployments.  
To modify a job's default schedule, update the corresponding value in `user_template.yaml` and update the cluster.


## bi-scheduler

**Type**: CronJob

**Description**: creates tasks for bi-exporter to export organization data to external storages

**Default schedule**: `*/5 * * * *`


## bumischeduler

**Type**: Deployment

**Description**: creates tasks for bumiworker to trigger recommendations check

**Default schedule**: `*/15 * * * *` (based on timeout value in seconds in etcd `/bumi_scheduler_timeout`)


## booking-observer-scheduler

**Type**: CronJob

**Description**: creates tasks for booking-observer-worker to trigger checking of shared environments status

**Default schedule**: `*/1 * * * *`


## calendar-observer-scheduler

**Type**: CronJob

**Description**: creates tasks for calendar-observer-worker to trigger calendar events observing

**Default schedule**: `0 * * * *`


## cleanelkdb

**Type**: CronJob

**Description**: checks ELK logs size and performs cleanup

**Default schedule**: `*/15 * * * *`


## cleaninfluxdb

**Type**: CronJob

**Description**: checks InfluxDB size and performs cleanup

**Default schedule**: `@weekly`


## cleanmongodb

**Type**: CronJob

**Description**: removes MongoDB data of deleted organizations and cloud accounts

**Default schedule**: `*/3 * * * *`


## deactivatorg

**Type**: CronJob

**Description**: disables organizations with no user activity

**Default schedule**: `0 2 * * *`


## demoorgcleanup

**Type**: CronJob

**Description**: deletes Live Demo organizations older than 7 days

**Default schedule**: `0 0 * * *` 


## gemini-scheduler

**Type**: CronJob

**Description**: creates tasks for gemini-worker to trigger S3 duplicates search

**Default schedule**: `*/5 * * * *`


## failed-imports-dataset-generator

**Type**: CronJob

**Description**: generates CSV file with failed report import cloud accounts data and uploads it to S3

**Default schedule**: `0 0 * * *`


## insider-scheduler

**Type**: CronJob

**Description**: creates tasks for insider-worker to trigger getting prices from cloud (Azure only)

**Default schedule**: `0 0 * * *`


## katarascheduler

**Type**: Deployment

**Description**: creates task for kataraworker to trigger sending email reports to users

**Default schedule**: `*/60 * * * *` (based on timeout value in seconds in etcd `/katara_scheduler_timeout`)


## layout-cleaner

**Type**: CronJob

**Description**: removes data in MariaDB `my-db.layout` for deleted entities

**Default schedule**: `0 3 * * *`


## live-demo-generator-scheduler

**Type**: CronJob

**Description**: creates task for live-demo-generator-worker to prepare organizations for Live Demo

**Default schedule**: `0 * * * *`


## metroculusscheduler

**Type**: CronJob

**Description**: creates task for metroculusworker to trigger getting resources metrics from clouds

**Default schedule**: `*/30 * * * *`


## organization-violations-scheduler

**Type**: CronJob

**Description**: creates tasks for organization-violations-worker to trigger checking of organization constraints

**Default schedule**: `*/5 * * * *`


## power-schedule-scheduler

**Type**: CronJob

**Description**: creates tasks for power-schedule-worker to trigger checking of power schedules

**Default schedule**: `*/5 * * * *`


## report-import-scheduler-*

**Type**: CronJob

**Description**: creates tasks for diworker to trigger billing data import for cloud account

**Default schedules**:
- report-import-scheduler-0           `*/15 * * * *`
- report-import-scheduler-1           `0 * * * *`
- report-import-scheduler-24          `0 0 * * *`
- report-import-scheduler-6           `0 */6 * * *`


## resource-discovery-scheduler

**Type**: CronJob

**Description**: creates tasks for resource-discovery-worker to trigger resources discovery for cloud accounts

**Default schedule**: `*/5 * * * *`


## resource-observer-scheduler

**Type**: CronJob

**Description**: creates tasks for resource-observer-worker to trigger resources updating

**Default schedule**: `*/5 * * * *`


## resource-violations-scheduler

**Type**: CronJob

**Description**: creates tasks for resource-violations-worker to check resource constraints

**Default schedule**: `*/5 * * * *`


## risp-scheduler

**Type**: CronJob

**Description**: creates tasks for risp-worker to trigger RI/SP calculations

**Default schedule**: `45 */1 * * *`


## thanos-compactor

**Type**: CronJob

**Description**: starts thanos compaction procedure on blocks saved in minio

**Default schedule**: `0 */12 * * *`


## trapper-scheduler

**Type**: CronJob

**Description**: creates tasks for trapper-scheduler to trigger calculating traffic expenses

**Default schedule**: `45 */1 * * *`


## users-dataset-generator

**Type**: CronJob

**Description**: generates a CSV file with usage statistics and uploads it to S3

**Default schedule**: `0 0 * * *`
