import type { InterceptionEntry } from '../utils/interceptor';

const ResourceDetailsMock = {
    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
    "cloud_resource_id": "sunflower[E2E_RR]",
    "applied_rules": [
        {
            "id": "7299520a-2864-474e-8e40-fc998e2dd2ab",
            "name": "Rule for AWS HQ_1686203940",
            "pool_id": "7ca74dce-f519-4564-9696-1e31242bdfad"
        }
    ],
    "employee_id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
    "first_seen": 1677628800,
    "name": "sunflower[E2E_RR]",
    "pool_id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
    "region": "us-west-2",
    "resource_type": "Bucket",
    "service_name": "AmazonS3",
    "tags": {
        "aws:createdBy": "IAMUser:AIDAIWGUBPAVMAWKKOLBA:s3-user"
    },
    "last_expense": {
        "date": 1726531200,
        "cost": 0.0188347846
    },
    "total_cost": 1004.5952778746001,
    "meta": {
        "cloud_console_link": "https://console.aws.amazon.com/s3/buckets/sunflower-eu-fra?region=eu-central-1&tab=objects",
        "is_public_policy": false,
        "is_public_acls": true
    },
    "recommendations": {
        "modules": [
            {
                "cloud_resource_id": "sunflower[E2E_RR]",
                "resource_name": "sunflower[E2E_RR]",
                "resource_id": "58af729b-64a3-4d1f-ad95-e9c1f1399283",
                "cloud_account_id": "fd09fa10-1b30-4a39-9a6b-fc1d7e85d9f3",
                "cloud_type": "aws_cnr",
                "cloud_account_name": "AWS HQ",
                "region": "us-west-2",
                "owner": {
                    "id": "02398865-30b4-43e1-b421-68158e4b6638",
                    "name": "Lincoln Davies"
                },
                "pool": {
                    "id": "7ca74dce-f519-4564-9696-1e31242bdfad",
                    "name": "AWS HQ",
                    "purpose": "budget"
                },
                "is_excluded": false,
                "is_public_policy": false,
                "is_public_acls": true,
                "detected_at": 1715862439,
                "name": "s3_public_buckets"
            }
        ],
        "run_timestamp": 1740483798
    },
    "active": true,
    "constraint_violated": true,
    "created_at": 1700027977,
    "last_seen": 1741087750,
    "deleted_at": 0,
    "id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
    "sub_resources": [],
    "is_environment": false,
    "env_properties": {},
    "dismissed_recommendations": {},
    "dismissed": [],
    "details": {
        "cloud_type": "aws_cnr",
        "cloud_name": "AWS HQ",
        "total_cost": 1004.5952778746001,
        "cost": 380.19630145699995,
        "forecast": 413.02,
        "service_name": "AmazonS3",
        "region": "us-west-2",
        "pool_name": "AWS HQ",
        "pool_purpose": "budget",
        "owner_name": "Demo User",
        "last_seen": 1741087750,
        "first_seen": 1677628800,
        "active": true,
        "policies": {},
        "constraints": {
            "ttl": {
                "deleted_at": 0,
                "id": "a7791313-d9ab-4c96-bdaa-ad876154b4b3",
                "created_at": 1700028906,
                "type": "ttl",
                "limit": 1686216600,
                "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
                "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7"
            },
            "daily_expense_limit": {
                "deleted_at": 0,
                "id": "d0f0e95d-5de1-4874-b381-3c6a26847a64",
                "created_at": 1700028921,
                "type": "daily_expense_limit",
                "limit": 20,
                "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
                "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7"
            }
        },
        "shareable_bookings": [],
        "env_properties_collector_link": null,
        "total_traffic_expenses": 458.37626712959985,
        "total_traffic_usage": 5265.746951888602
    }
}

 const LimitHitsMock = {
    "limit_hits": [
        {
            "deleted_at": 0,
            "id": "01190cc2-6580-4215-a922-b2251b1001b2",
            "created_at": 1722254707,
            "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
            "pool_id": null,
            "type": "daily_expense_limit",
            "constraint_limit": 20,
            "ttl_value": null,
            "expense_value": 24.0506,
            "time": 1722254707,
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "state": "red"
        },
        {
            "deleted_at": 0,
            "id": "09bbd764-37b7-490a-81cc-0c0b47e8031c",
            "created_at": 1720656027,
            "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
            "pool_id": null,
            "type": "daily_expense_limit",
            "constraint_limit": 20,
            "ttl_value": null,
            "expense_value": 28.1056,
            "time": 1720656026,
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "state": "green"
        },
        {
            "deleted_at": 0,
            "id": "007b1913-3e56-421f-8346-ab44249d86d7",
            "created_at": 1709755521,
            "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
            "pool_id": null,
            "type": "daily_expense_limit",
            "constraint_limit": 20,
            "ttl_value": null,
            "expense_value": 0.00648838,
            "time": 1709755521,
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "state": "green"
        },
        {
            "deleted_at": 0,
            "id": "0c700bc8-aef1-41c8-ad0a-08bc802a482b",
            "created_at": 1709291109,
            "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
            "pool_id": null,
            "type": "daily_expense_limit",
            "constraint_limit": 20,
            "ttl_value": null,
            "expense_value": 26.8546,
            "time": 1709291108,
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "state": "red"
        },
        {
            "deleted_at": 0,
            "id": "0f4b2066-8698-4f6e-9a87-5ad9161b90a6",
            "created_at": 1710425115,
            "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
            "pool_id": null,
            "type": "daily_expense_limit",
            "constraint_limit": 20,
            "ttl_value": null,
            "expense_value": 0.00585016,
            "time": 1710425115,
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "state": "green"
        },
        {
            "deleted_at": 0,
            "id": "1225f5bb-6a1c-431c-a0f1-e71160d951fb",
            "created_at": 1721703903,
            "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
            "pool_id": null,
            "type": "daily_expense_limit",
            "constraint_limit": 20,
            "ttl_value": null,
            "expense_value": 30.3222,
            "time": 1721703903,
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "state": "red"
        }
    ]
}

const AllowedActionsResponse = {
    "allowed_actions": {
        "ae385f3a-d3ad-4542-b206-21e7abcc9ef3": [
            "CREATE_PARTNER",
            "ASSIGN_USER",
            "DELETE_PARTNER",
            "ACK_EVENT",
            "MANAGE_PERMISSIONS",
            "INFO_ORGANIZATION",
            "POLL_EVENT",
            "LIST_USERS",
            "EDIT_PARTNER",
            "MANAGE_CLOUD_CREDENTIALS",
            "MANAGE_RESOURCES",
            "ASSIGN_SELF",
            "INFO_PARTNER",
            "MANAGE_CHECKLISTS",
            "MANAGE_OWN_RESOURCES",
            "MANAGE_POOLS",
            "MANAGE_INVITES",
            "BOOK_ENVIRONMENTS"
        ]
    }
}

 const RawExpensesMock ={
    "start_date": 1776038400,
    "end_date": 1776383999,
    "total_cost": 4422.722058416666,
    "raw_expenses": [
        {
            "_id": "69e0b4c2136fc91534b4124b[E2E_RRE]",
            "start_date": "2026-04-14T00:00:00",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "_rec_n": 35332,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 636.733725,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 636.733725,
            "costInPricingCurrency": 636.733725,
            "costInUSD": 636.733725,
            "customerName": "BIT Automation",
            "customerTenantId": "",
            "date": "2026-04-14T00:00:00Z",
            "effectivePrice": 1.275,
            "end_date": "2026-04-15T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/dacfd51b-ef69-0196-25d1-e614028f2b80",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "5998e5d3-37e6-49a5-ad0f-e21c716f5903",
            "invoiceSectionName": "BIT Automation",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "9534e7b1-702c-4588-96bc-e3153f80722d",
            "meter_details": {
                "meter_name": "Self Hosted Orchestration Activity Run",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1K",
                "meter_location": ""
            },
            "name": "dacfd51b-ef69-0196-25d1-e614028f2b80",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 1.5,
            "paygCostInBillingCurrency": 749.0985,
            "paygCostInUSD": 749.0985,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776333620.768533,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 1.275,
            "usage_quantity": 499.399
        },
        {
            "_id": "69e0b49f136fc91534b3f3c0",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-13T00:00:00",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "_rec_n": 22456,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 611.881425,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 611.881425,
            "costInPricingCurrency": 611.881425,
            "costInUSD": 611.881425,
            "customerName": "BIT Automation",
            "customerTenantId": "",
            "date": "2026-04-13T00:00:00Z",
            "effectivePrice": 1.275,
            "end_date": "2026-04-14T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/dbe506ac-199a-9043-90ee-4c2a780d88c6",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "5998e5d3-37e6-49a5-ad0f-e21c716f5903",
            "invoiceSectionName": "BIT Automation",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "9534e7b1-702c-4588-96bc-e3153f80722d",
            "meter_details": {
                "meter_name": "Self Hosted Orchestration Activity Run",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1K",
                "meter_location": ""
            },
            "name": "dbe506ac-199a-9043-90ee-4c2a780d88c6",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 1.5,
            "paygCostInBillingCurrency": 719.8605,
            "paygCostInUSD": 719.8605,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776333620.768533,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 1.275,
            "usage_quantity": 479.907
        },
        {
            "_id": "69e0b48d136fc91534b3e863",
            "start_date": "2026-04-14T00:00:00",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "_rec_n": 15111,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 581.3439,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 581.3439,
            "costInPricingCurrency": 581.3439,
            "costInUSD": 581.3439,
            "customerName": "BIT Automation",
            "customerTenantId": "",
            "date": "2026-04-14T00:00:00Z",
            "effectivePrice": 0.85,
            "end_date": "2026-04-15T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/7fd43cab-b239-1559-c61a-99703aa7c0d2",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "5998e5d3-37e6-49a5-ad0f-e21c716f5903",
            "invoiceSectionName": "BIT Automation",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "04f2be54-5cfe-4ad7-97f3-0badfc1dc247",
            "meter_details": {
                "meter_name": "Cloud Orchestration Activity Run [E2E_RRE]",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1K",
                "meter_location": ""
            },
            "name": "7fd43cab-b239-1559-c61a-99703aa7c0d2",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 1,
            "paygCostInBillingCurrency": 683.934,
            "paygCostInUSD": 683.934,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Cloud",
            "productIdentifier": "DZH318Z0BQPM0014",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776333620.768533,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.85,
            "usage_quantity": 683.934
        },
        {
            "_id": "69e0b495136fc91534b3edd2",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-13T00:00:00",
            "_rec_n": 17373,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 559.4071,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 559.4071,
            "costInPricingCurrency": 559.4071,
            "costInUSD": 559.4071,
            "customerName": "BIT Automation",
            "customerTenantId": "",
            "date": "2026-04-13T00:00:00Z",
            "effectivePrice": 0.85,
            "end_date": "2026-04-14T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/c413a4de-0acc-a53c-3fef-4aaa864b6cc0",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "5998e5d3-37e6-49a5-ad0f-e21c716f5903",
            "invoiceSectionName": "BIT Automation",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "04f2be54-5cfe-4ad7-97f3-0badfc1dc247",
            "meter_details": {
                "meter_name": "Cloud Orchestration Activity Run [E2E_RRE]",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1K",
                "meter_location": ""
            },
            "name": "c413a4de-0acc-a53c-3fef-4aaa864b6cc0",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 1,
            "paygCostInBillingCurrency": 658.126,
            "paygCostInUSD": 658.126,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Cloud",
            "productIdentifier": "DZH318Z0BQPM0014",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776333620.768533,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.85,
            "usage_quantity": 658.126
        },
        {
            "_id": "69e0b4c2136fc91534b413a4",
            "start_date": "2026-04-15T00:00:00",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "_rec_n": 35766,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 371.7135,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 371.7135,
            "costInPricingCurrency": 371.7135,
            "costInUSD": 371.7135,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-15T00:00:00Z",
            "effectivePrice": 0.85,
            "end_date": "2026-04-16T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/ecc3033a-ec0b-e60e-565d-3136dc2e5e5f",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "04f2be54-5cfe-4ad7-97f3-0badfc1dc247",
            "meter_details": {
                "meter_name": "Cloud Orchestration Activity Run [E2E_RRE]",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1K",
                "meter_location": ""
            },
            "name": "ecc3033a-ec0b-e60e-565d-3136dc2e5e5f",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 1,
            "paygCostInBillingCurrency": 437.31,
            "paygCostInUSD": 437.31,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Cloud",
            "productIdentifier": "DZH318Z0BQPM0014",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.85,
            "usage_quantity": 291.54
        },
        {
            "_id": "69e0b4c4136fc91534b41576",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-15T00:00:00",
            "_rec_n": 36577,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 339.65235,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 339.65235,
            "costInPricingCurrency": 339.65235,
            "costInUSD": 339.65235,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-15T00:00:00Z",
            "effectivePrice": 8.5e-05,
            "end_date": "2026-04-16T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/c7f622ae-d6fc-554a-bed4-9006fa828075",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "1b849aa0-5d71-4290-8c42-c7d49bbc7e95",
            "meter_details": {
                "meter_name": "Self Hosted External Pipeline Activity",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "c7f622ae-d6fc-554a-bed4-9006fa828075",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.0001,
            "paygCostInBillingCurrency": 399.591,
            "paygCostInUSD": 399.591,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 8.5e-05,
            "usage_quantity": 399.591
        },
        {
            "_id": "69e0b4ba136fc91534b40848",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-15T00:00:00",
            "_rec_n": 32575,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 255.903975,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 255.903975,
            "costInPricingCurrency": 255.903975,
            "costInUSD": 255.903975,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-15T00:00:00Z",
            "effectivePrice": 0.0002125,
            "end_date": "2026-04-16T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/1a170d04-cb2d-ecc7-f164-c461508b6ab4",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "1eb459cb-8b5f-4520-be16-0c52ac6d05ba",
            "meter_details": {
                "meter_name": "Cloud External Pipeline Activity",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "1a170d04-cb2d-ecc7-f164-c461508b6ab4",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.00025,
            "paygCostInBillingCurrency": 301.0635,
            "paygCostInUSD": 301.0635,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Cloud",
            "productIdentifier": "DZH318Z0BQPM0014",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.0002125,
            "usage_quantity": 200.709
        },
        {
            "_id": "69e0b4c4136fc91534b4157b",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-15T00:00:00",
            "_rec_n": 36695,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 234.16905,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 234.16905,
            "costInPricingCurrency": 234.16905,
            "costInUSD": 234.16905,
            "customerName": "BIT Automation",
            "customerTenantId": "",
            "date": "2026-04-15T00:00:00Z",
            "effectivePrice": 0.0002125,
            "end_date": "2026-04-16T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/1a170d04-cb2d-ecc7-f164-c461508b6ab4",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "5998e5d3-37e6-49a5-ad0f-e21c716f5903",
            "invoiceSectionName": "BIT Automation",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "1eb459cb-8b5f-4520-be16-0c52ac6d05ba",
            "meter_details": {
                "meter_name": "Cloud External Pipeline Activity",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "1a170d04-cb2d-ecc7-f164-c461508b6ab4",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.00025,
            "paygCostInBillingCurrency": 275.493,
            "paygCostInUSD": 275.493,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Cloud",
            "productIdentifier": "DZH318Z0BQPM0014",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.0002125,
            "usage_quantity": 275.493
        },
        {
            "_id": "69e0b4c2136fc91534b4122d",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-14T00:00:00",
            "_rec_n": 35302,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 184.954333333333,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 184.954333333333,
            "costInPricingCurrency": 184.954333333333,
            "costInUSD": 184.954333333333,
            "customerName": "BIT Automation",
            "customerTenantId": "",
            "date": "2026-04-14T00:00:00Z",
            "effectivePrice": 0.085,
            "end_date": "2026-04-15T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/d343bd4c-bb43-dd26-91f3-620641556e51",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "5998e5d3-37e6-49a5-ad0f-e21c716f5903",
            "invoiceSectionName": "BIT Automation",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "997a4c50-5127-44e1-928c-c047eebea827",
            "meter_details": {
                "meter_name": "Self Hosted Data Movement",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "d343bd4c-bb43-dd26-91f3-620641556e51",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.1,
            "paygCostInBillingCurrency": 217.593333333333,
            "paygCostInUSD": 217.593333333333,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776333620.768533,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.085,
            "usage_quantity": 2175.93333333333
        },
        {
            "_id": "69e0b4e1136fc91534b4300f",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-13T00:00:00",
            "_rec_n": 48518,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 177.907833333333,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 177.907833333333,
            "costInPricingCurrency": 177.907833333333,
            "costInUSD": 177.907833333333,
            "customerName": "BIT Automation",
            "customerTenantId": "",
            "date": "2026-04-13T00:00:00Z",
            "effectivePrice": 0.085,
            "end_date": "2026-04-14T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/0552c071-95a6-cf2b-3e29-a7f5f5d4ac8f",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "5998e5d3-37e6-49a5-ad0f-e21c716f5903",
            "invoiceSectionName": "BIT Automation",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "997a4c50-5127-44e1-928c-c047eebea827",
            "meter_details": {
                "meter_name": "Self Hosted Data Movement",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "0552c071-95a6-cf2b-3e29-a7f5f5d4ac8f",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.1,
            "paygCostInBillingCurrency": 209.303333333333,
            "paygCostInUSD": 209.303333333333,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776333620.768533,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.085,
            "usage_quantity": 2093.03333333333
        },
        {
            "_id": "69e0b4b6136fc91534b40670",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-16T00:00:00",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "_rec_n": 47740,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 119.34765,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 119.34765,
            "costInPricingCurrency": 119.34765,
            "costInUSD": 119.34765,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-16T00:00:00Z",
            "effectivePrice": 8.5e-05,
            "end_date": "2026-04-17T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/0c4276b5-e02f-6a30-62d1-05b4d3dceea9",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "1b849aa0-5d71-4290-8c42-c7d49bbc7e95",
            "meter_details": {
                "meter_name": "Self Hosted External Pipeline Activity",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "0c4276b5-e02f-6a30-62d1-05b4d3dceea9",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.0001,
            "paygCostInBillingCurrency": 140.409,
            "paygCostInUSD": 140.409,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 8.5e-05,
            "usage_quantity": 93.606
        },
        {
            "_id": "69e0b4b6136fc91534b40698",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-16T00:00:00",
            "_rec_n": 49098,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 108.7133,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 108.7133,
            "costInPricingCurrency": 108.7133,
            "costInUSD": 108.7133,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-16T00:00:00Z",
            "effectivePrice": 0.0002125,
            "end_date": "2026-04-17T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/11926804-04f1-db02-a91b-4c4b1d6b1699",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "1eb459cb-8b5f-4520-be16-0c52ac6d05ba",
            "meter_details": {
                "meter_name": "Cloud External Pipeline Activity",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "11926804-04f1-db02-a91b-4c4b1d6b1699",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.00025,
            "paygCostInBillingCurrency": 127.898,
            "paygCostInUSD": 127.898,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Cloud",
            "productIdentifier": "DZH318Z0BQPM0014",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.0002125,
            "usage_quantity": 127.898
        },
        {
            "_id": "69e0b4cd136fc91534b41f38",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-15T00:00:00",
            "_rec_n": 38127,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 108.087416666667,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 108.087416666667,
            "costInPricingCurrency": 108.087416666667,
            "costInUSD": 108.087416666667,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-15T00:00:00Z",
            "effectivePrice": 0.0017,
            "end_date": "2026-04-16T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/531e4fa7-1592-f4ed-a6ac-a7a2f5db0e91",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "b68a76e2-fd61-44a2-87c4-46cde3b9deb9",
            "meter_details": {
                "meter_name": "Self Hosted Pipeline Activity",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1 Hour",
                "meter_location": ""
            },
            "name": "531e4fa7-1592-f4ed-a6ac-a7a2f5db0e91",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 0.002,
            "paygCostInBillingCurrency": 127.161666666667,
            "paygCostInUSD": 127.161666666667,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.0017,
            "usage_quantity": 1271.61666666667
        },
        {
            "_id": "69e0b4cd136fc91534b41e33",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "start_date": "2026-04-15T00:00:00",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "_rec_n": 38112,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 74.3594166666667,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 74.3594166666667,
            "costInPricingCurrency": 74.3594166666667,
            "costInUSD": 74.3594166666667,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-15T00:00:00Z",
            "effectivePrice": 1.275,
            "end_date": "2026-04-16T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/00398af4-dc84-4dc7-7ad5-5ab77f6c5a02",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "9534e7b1-702c-4588-96bc-e3153f80722d",
            "meter_details": {
                "meter_name": "Self Hosted Orchestration Activity Run",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1K",
                "meter_location": ""
            },
            "name": "00398af4-dc84-4dc7-7ad5-5ab77f6c5a02",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 1.5,
            "paygCostInBillingCurrency": 87.4816666666667,
            "paygCostInUSD": 87.4816666666667,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Self Hosted",
            "productIdentifier": "DZH318Z0BQPM0015",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 1.275,
            "usage_quantity": 874.816666666667
        },
        {
            "_id": "69e0b4b4136fc91534b400cd",
            "start_date": "2026-04-16T00:00:00",
            "cloud_account_id": "1812ae7a-890f-413a-a4e3-9a76c357cfb2",
            "resource_id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/resourcegroups/nlpapp0827rgp/providers/microsoft.datafactory/factories/nlpapp0827df",
            "_rec_n": 32760,
            "benefitId": "",
            "benefitName": "",
            "billingAccountId": "003a76f3-936a-46d8-bc55-614af18f51b7",
            "billingAccountName": "",
            "billingCurrencyCode": "USD",
            "billingPeriodEndDate": "0001-01-01T00:00:00Z",
            "billingPeriodStartDate": "0001-01-01T00:00:00Z",
            "billingProfileId": "ZRRI-VYIX-BG7-PGB",
            "billingProfileName": "SoftwareONE Pte Ltd.",
            "chargeType": "Usage",
            "consumedService": "MICROSOFT.DATAFACTORY",
            "cost": 34.7720833333333,
            "costAllocationRuleName": "",
            "costCenter": "13.30 - CloudONE",
            "costInBillingCurrency": 34.7720833333333,
            "costInPricingCurrency": 34.7720833333333,
            "costInUSD": 34.7720833333333,
            "customerName": "CloudONE",
            "customerTenantId": "",
            "date": "2026-04-16T00:00:00Z",
            "effectivePrice": 0.85,
            "end_date": "2026-04-17T00:00:00",
            "exchangeRate": "1",
            "exchangeRateDate": "2026-04-01T00:00:00Z",
            "exchangeRatePricingToBilling": 1,
            "frequency": "UsageBased",
            "id": "/subscriptions/b6689fdb-ac8c-4116-8136-c7a179cb5be6/providers/Microsoft.Consumption/usageDetails/6b9a287b-e29c-13a6-1ea9-8fe07f1577e5",
            "instanceName": "/SUBSCRIPTIONS/B6689FDB-AC8C-4116-8136-C7A179CB5BE6/RESOURCEGROUPS/NLPAPP0827RGP/PROVIDERS/MICROSOFT.DATAFACTORY/FACTORIES/NLPAPP0827DF",
            "invoiceId": "",
            "invoiceSectionId": "8fbc9418-e2bb-4785-b1db-6980d2a4a05b",
            "invoiceSectionName": "CloudONE",
            "isAzureCreditEligible": true,
            "kind": "modern",
            "meterId": "04f2be54-5cfe-4ad7-97f3-0badfc1dc247",
            "meter_details": {
                "meter_name": "Cloud Orchestration Activity Run [E2E_RRE]",
                "meter_category": "Azure Data Factory v2",
                "meter_sub_category": "Azure Data Factory v2",
                "unit": "1K",
                "meter_location": ""
            },
            "name": "6b9a287b-e29c-13a6-1ea9-8fe07f1577e5",
            "partnerEarnedCreditApplied": "0",
            "partnerEarnedCreditRate": 0,
            "partnerName": "",
            "partnerTenantId": "",
            "payGPrice": 1,
            "paygCostInBillingCurrency": 40.9083333333333,
            "paygCostInUSD": 40.9083333333333,
            "previousInvoiceId": "",
            "pricingCurrencyCode": "USD",
            "pricingModel": "OnDemand",
            "product": "Azure Data Factory v2 - Cloud",
            "productIdentifier": "DZH318Z0BQPM0014",
            "productOrderId": "5079e87b-23bb-47a0-c86e-d4e8b93f7c4b",
            "productOrderName": "Azure plan",
            "provider": "",
            "publisherId": "",
            "publisherName": "Microsoft",
            "publisherType": "Microsoft",
            "report_identity": 1776340811.202437,
            "resellerMpnId": "",
            "resellerName": "",
            "reservationId": "",
            "reservationName": "",
            "resourceGroup": "NLPAPP0827RGP",
            "resourceLocation": "westeurope",
            "resourceLocationNormalized": "EU West",
            "serviceFamily": "Analytics",
            "serviceInfo1": "",
            "serviceInfo2": "",
            "servicePeriodEndDate": "2026-05-01T00:00:00Z",
            "servicePeriodStartDate": "2026-04-01T00:00:00Z",
            "subscriptionGuid": "b6689fdb-ac8c-4116-8136-c7a179cb5be6",
            "subscriptionName": "CPA (QA and Production)",
            "tags": {
                "devops-billing-env": "prod",
                "devops-component": "datafactory",
                "devops-devgroup": "shared",
                "devops-environment": "prod",
                "devops-managed-by": "Terraform",
                "devops-owner": "Pixel",
                "devops-ownerteam": "Pixel",
                "devops-project": "Marketplace",
                "devops-region": "WestEurope",
                "devops-repository": "ops-assets",
                "devops-risk-class": "critical"
            },
            "term": "",
            "type": "Microsoft.Consumption/usageDetails",
            "unitPrice": 0.85,
            "usage_quantity": 409.083333333333
        },

    ]
}

 const BreakdownExpensesMock = {
    "counts": {
        "Elastic Compute Service": {
            "total": 361.1368551199999,
            "previous_total": 345.4404093599999
        },
        "Elastic Block Storage": {
            "total": 27.717245999999996,
            "previous_total": 20.798207999999992
        },
        "null": {
            "total": 304.66836390035155,
            "previous_total": 309.32541915502946
        },
        "microsoft.compute": {
            "total": 276.5240509252147,
            "previous_total": 314.91279670120275
        },
        "Cloud Storage": {
            "total": 19.887600000000006,
            "previous_total": 29.01149399999999
        },
        "AmazonEC2[E2E_RBE]": {
            "total": 1580.8009178687996,
            "previous_total": 1194.3135000401999
        },
        "Elastic IP Address": {
            "total": 13.512000000000002,
            "previous_total": 15.552000000000005
        },
        "AWSELB": {
            "total": 27.750726870599998,
            "previous_total": 32.400851680799995
        },
        "AmazonS3": {
            "total": 532.9780204488001,
            "previous_total": 688.4795773100002
        },
        "BigQuery": {
            "total": 466.45998000000003,
            "previous_total": 521.448576
        },
        "Compute Engine": {
            "total": 557.44779,
            "previous_total": 623.80451
        },
        "AWSCloudTrail": {
            "total": 1.712005,
            "previous_total": 2.2013859999999994
        },
        "AmazonVPC": {
            "total": 166.79601666000013,
            "previous_total": 194.09640834000024
        },
        "AmazonRedshift": {
            "total": 0.7026827039999999,
            "previous_total": 0.8017989120000002
        },
        "Microsoft.Storage": {
            "total": 80.10750121480001,
            "previous_total": 87.02817768999999
        },
        "AmazonQuickSight": {
            "total": 36.63870971039999,
            "previous_total": 65.03225702399996
        },
        "AmazonCloudWatch": {
            "total": 58.983620041400016,
            "previous_total": 81.6281132744
        },
        "awskms": {
            "total": 1.5155017934000001,
            "previous_total": 1.741935455999999
        },
        "Microsoft.Compute": {
            "total": 369.38869771037275,
            "previous_total": 404.58287194400003
        },
        "microsoft.network": {
            "total": 169.58551599999984,
            "previous_total": 186.36479999999995
        },
        "AmazonKinesis": {
            "total": 19.980000000000008,
            "previous_total": 23.328000000000014
        }
    },
    "breakdown": {
        "1739750400": {
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "null": {
                "cost": 10.42210135605598
            },
            "microsoft.compute": {
                "cost": 11.622310354188084
            },
            "Cloud Storage": {
                "cost": 0.0
            },
            "AmazonEC2": {
                "cost": 183.07788147760002
            },
            "Elastic IP Address": {
                "cost": 0.264
            },
            "AWSELB": {
                "cost": 1.2000334168
            },
            "AmazonS3": {
                "cost": 30.9361769886
            },
            "BigQuery": {
                "cost": 0.0
            },
            "Compute Engine": {
                "cost": 0.0
            },
            "AWSCloudTrail": {
                "cost": 0.069237
            },
            "AmazonVPC": {
                "cost": 7.440000000000005
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "Microsoft.Storage": {
                "cost": 3.3750848128000004
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "AmazonCloudWatch": {
                "cost": 2.5155892134
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "Microsoft.Compute": {
                "cost": 15.661124264000003
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "AmazonKinesis": {
                "cost": 0.864
            }
        },
        "1740268800": {
            "microsoft.compute": {
                "cost": 11.622634983599184
            },
            "null": {
                "cost": 11.548875403528605
            },
            "Cloud Storage": {
                "cost": 1.061128
            },
            "Elastic Compute Service": {
                "cost": 15.098122860000004
            },
            "Elastic Block Storage": {
                "cost": 2.2751160000000006
            },
            "AWSELB": {
                "cost": 1.1000287782
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 27.933411474999996
            },
            "Compute Engine": {
                "cost": 30.576176
            },
            "AmazonS3": {
                "cost": 14.1292009652
            },
            "BigQuery": {
                "cost": 30.812010000000004
            },
            "microsoft.network": {
                "cost": 7.247999999999994
            },
            "Microsoft.Compute": {
                "cost": 15.648182868000001
            },
            "AmazonKinesis": {
                "cost": 0.792
            },
            "AmazonVPC": {
                "cost": 6.200000000000001
            },
            "AWSCloudTrail": {
                "cost": 0.08036499999999999
            },
            "AmazonRedshift": {
                "cost": 0.028128672
            },
            "awskms": {
                "cost": 0.055555556
            },
            "AmazonCloudWatch": {
                "cost": 2.5539364657999997
            },
            "Microsoft.Storage": {
                "cost": 3.375081436
            },
            "AmazonQuickSight": {
                "cost": 1.4666666784
            }
        },
        "1740355200": {
            "AWSCloudTrail": {
                "cost": 0.017745999999999998
            },
            "Compute Engine": {
                "cost": 34.115064
            },
            "AmazonS3": {
                "cost": 0.36901840680000003
            },
            "BigQuery": {
                "cost": 31.722982000000002
            },
            "AmazonKinesis": {
                "cost": 0.18
            },
            "AmazonRedshift": {
                "cost": 0.00639288
            },
            "AmazonQuickSight": {
                "cost": 0.333333336
            },
            "Microsoft.Storage": {
                "cost": 3.2426961359999997
            },
            "AmazonCloudWatch": {
                "cost": 0.4747895054
            },
            "awskms": {
                "cost": 0.0083333334
            },
            "AmazonVPC": {
                "cost": 1.2200000000000006
            },
            "Microsoft.Compute": {
                "cost": 12.633151729999998
            },
            "microsoft.network": {
                "cost": 5.819999999999997
            },
            "Elastic Compute Service": {
                "cost": 15.086958600000006
            },
            "microsoft.compute": {
                "cost": 7.780966784474253
            },
            "Elastic Block Storage": {
                "cost": 2.1143040000000006
            },
            "null": {
                "cost": 10.235134657843101
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 10.505380904
            },
            "AWSELB": {
                "cost": 0.2500066388
            },
            "Cloud Storage": {
                "cost": 1.061128
            }
        },
        "1739836800": {
            "microsoft.compute": {
                "cost": 11.611801281486125
            },
            "Elastic Compute Service": {
                "cost": 15.098641420000003
            },
            "Cloud Storage": {
                "cost": 0.0
            },
            "AWSELB": {
                "cost": 1.2000311408
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 182.8814959558
            },
            "Elastic Block Storage": {
                "cost": 1.0355380000000003
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "Compute Engine": {
                "cost": 1.321772
            },
            "null": {
                "cost": 9.050885311138009
            },
            "BigQuery": {
                "cost": 0.094572
            },
            "AmazonS3": {
                "cost": 19.235668361800002
            },
            "AWSCloudTrail": {
                "cost": 0.09428
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "Microsoft.Compute": {
                "cost": 15.675680268000002
            },
            "AmazonVPC": {
                "cost": 7.440000000000005
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonCloudWatch": {
                "cost": 2.8414880816
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "Microsoft.Storage": {
                "cost": 3.3750853532000007
            }
        },
        "1739145600": {
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "Microsoft.Storage": {
                "cost": 3.3750799872
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "AmazonCloudWatch": {
                "cost": 1.6815739488
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "Microsoft.Compute": {
                "cost": 15.649511668000004
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "null": {
                "cost": 10.777283473828154
            },
            "AWSCloudTrail": {
                "cost": 0.074699
            },
            "Compute Engine": {
                "cost": 31.254246
            },
            "AmazonS3": {
                "cost": 42.04325089440002
            },
            "BigQuery": {
                "cost": 33.142879999999984
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 49.02893674040001
            },
            "AWSELB": {
                "cost": 1.2000313113999999
            },
            "Cloud Storage": {
                "cost": 1.061128
            },
            "Elastic Compute Service": {
                "cost": 14.999882160000006
            },
            "microsoft.compute": {
                "cost": 11.621964846037327
            }
        },
        "1739923200": {
            "microsoft.compute": {
                "cost": 11.617033171441793
            },
            "Cloud Storage": {
                "cost": 1.061128
            },
            "Elastic Block Storage": {
                "cost": 2.2782080000000007
            },
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "AWSELB": {
                "cost": 1.2000320662
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 182.79072489579997
            },
            "Compute Engine": {
                "cost": 31.22226000000001
            },
            "BigQuery": {
                "cost": 50.38654
            },
            "null": {
                "cost": 13.677025213687122
            },
            "AmazonS3": {
                "cost": 19.898282706799996
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "microsoft.network": {
                "cost": 7.247999999999994
            },
            "Microsoft.Compute": {
                "cost": 15.630367068000004
            },
            "AmazonVPC": {
                "cost": 7.440000000000005
            },
            "AWSCloudTrail": {
                "cost": 0.085857
            },
            "AmazonCloudWatch": {
                "cost": 3.0253006954
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "Microsoft.Storage": {
                "cost": 3.3750883072
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            }
        },
        "1739232000": {
            "AmazonEC2": {
                "cost": 46.613642599400016
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AWSELB": {
                "cost": 1.2000309669999998
            },
            "Elastic Compute Service": {
                "cost": 15.093419360000006
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "null": {
                "cost": 8.636672761201527
            },
            "microsoft.compute": {
                "cost": 11.622094999387858
            },
            "Cloud Storage": {
                "cost": 1.061128
            },
            "AWSCloudTrail": {
                "cost": 0.07562100000000001
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonCloudWatch": {
                "cost": 1.8023529312
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "Microsoft.Storage": {
                "cost": 3.3750793320000008
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "Microsoft.Compute": {
                "cost": 15.645415468000001
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AmazonS3": {
                "cost": 33.004611088600015
            },
            "BigQuery": {
                "cost": 28.951815999999994
            },
            "Compute Engine": {
                "cost": 31.254244
            }
        },
        "1738886400": {
            "AWSCloudTrail": {
                "cost": 0.063669
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AmazonRedshift": {
                "cost": 0.029696256
            },
            "Microsoft.Storage": {
                "cost": 3.2662087360000007
            },
            "AmazonQuickSight": {
                "cost": 1.548387072
            },
            "AmazonCloudWatch": {
                "cost": 3.1782681376
            },
            "awskms": {
                "cost": 0.064516128
            },
            "Microsoft.Compute": {
                "cost": 14.986997528
            },
            "microsoft.network": {
                "cost": 6.902399999999995
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "null": {
                "cost": 12.746170888095048
            },
            "AmazonS3": {
                "cost": 15.878402142
            },
            "BigQuery": {
                "cost": 5.3049740000000005
            },
            "Compute Engine": {
                "cost": 28.849078
            },
            "AmazonEC2": {
                "cost": 42.9886981936
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AWSELB": {
                "cost": 1.2000309787999999
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "microsoft.compute": {
                "cost": 11.62163248770684
            },
            "Cloud Storage": {
                "cost": 1.026896
            }
        },
        "1738713600": {
            "AmazonRedshift": {
                "cost": 0.029696256
            },
            "AmazonQuickSight": {
                "cost": 1.548387072
            },
            "Microsoft.Storage": {
                "cost": 3.2662133879999997
            },
            "AmazonCloudWatch": {
                "cost": 3.1387706384
            },
            "awskms": {
                "cost": 0.064516128
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AWSCloudTrail": {
                "cost": 0.079617
            },
            "null": {
                "cost": 11.437129660768441
            },
            "Microsoft.Compute": {
                "cost": 14.997574128
            },
            "microsoft.network": {
                "cost": 6.902399999999994
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "Compute Engine": {
                "cost": 28.848975999999997
            },
            "AmazonS3": {
                "cost": 22.285824174800002
            },
            "BigQuery": {
                "cost": 43.51831999999999
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 44.5023600026
            },
            "AWSELB": {
                "cost": 1.2000324470000001
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Cloud Storage": {
                "cost": 1.026898
            },
            "microsoft.compute": {
                "cost": 11.622185551345348
            }
        },
        "1738972800": {
            "AWSELB": {
                "cost": 1.2000315451999999
            },
            "Cloud Storage": {
                "cost": 1.026896
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 43.26649433699999
            },
            "microsoft.compute": {
                "cost": 11.621692190915347
            },
            "null": {
                "cost": 16.385230419388424
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "Microsoft.Compute": {
                "cost": 15.460047164000004
            },
            "microsoft.network": {
                "cost": 6.902399999999995
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "Microsoft.Storage": {
                "cost": 3.3750799800000006
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonCloudWatch": {
                "cost": 1.4466666528
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AWSCloudTrail": {
                "cost": 0.058019
            },
            "Compute Engine": {
                "cost": 30.466685999999996
            },
            "BigQuery": {
                "cost": 13.476438
            },
            "AmazonS3": {
                "cost": 16.347829952799998
            }
        },
        "1740009600": {
            "microsoft.compute": {
                "cost": 11.622982797719537
            },
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "null": {
                "cost": 13.960247106686007
            },
            "Cloud Storage": {
                "cost": 1.061128
            },
            "AWSELB": {
                "cost": 1.200030848
            },
            "AmazonEC2": {
                "cost": 75.88302996220004
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "Elastic Block Storage": {
                "cost": 2.306304000000001
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AmazonS3": {
                "cost": 34.7088911498
            },
            "BigQuery": {
                "cost": 15.03422
            },
            "Compute Engine": {
                "cost": 31.222249999999992
            },
            "AWSCloudTrail": {
                "cost": 0.087212
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "Microsoft.Compute": {
                "cost": 15.665428268000001
            },
            "AmazonVPC": {
                "cost": 7.259347220000005
            },
            "AmazonCloudWatch": {
                "cost": 3.0008698999999996
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "Microsoft.Storage": {
                "cost": 3.3750805488
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            }
        },
        "1740096000": {
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "Elastic Block Storage": {
                "cost": 2.306304000000001
            },
            "null": {
                "cost": 16.561624666148973
            },
            "microsoft.compute": {
                "cost": 11.621741843312979
            },
            "Cloud Storage": {
                "cost": 1.06113
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 45.52930919619999
            },
            "AWSELB": {
                "cost": 1.2000317482
            },
            "Compute Engine": {
                "cost": 31.222254000000003
            },
            "AmazonS3": {
                "cost": 17.524128614200006
            },
            "BigQuery": {
                "cost": 10.336253999999998
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AWSCloudTrail": {
                "cost": 0.079373
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "Microsoft.Storage": {
                "cost": 3.37507998
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "AmazonCloudWatch": {
                "cost": 2.987153331
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "Microsoft.Compute": {
                "cost": 15.648875268000001
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "AmazonKinesis": {
                "cost": 0.864
            }
        },
        "1739491200": {
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "AmazonEC2": {
                "cost": 43.58281027579999
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AWSELB": {
                "cost": 1.2000309892
            },
            "Cloud Storage": {
                "cost": 0.0
            },
            "null": {
                "cost": 16.668433275311877
            },
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "microsoft.compute": {
                "cost": 11.621769702114165
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "AmazonCloudWatch": {
                "cost": 2.0587032564
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "Microsoft.Storage": {
                "cost": 3.3750796920000004
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "microsoft.network": {
                "cost": 7.247999999999994
            },
            "Microsoft.Compute": {
                "cost": 15.648565964000001
            },
            "AWSCloudTrail": {
                "cost": 0.066929
            },
            "BigQuery": {
                "cost": 0.0
            },
            "AmazonS3": {
                "cost": 16.8431769462
            },
            "Compute Engine": {
                "cost": 0.0
            },
            "AmazonKinesis": {
                "cost": 0.864
            }
        },
        "1739318400": {
            "AWSELB": {
                "cost": 1.2000312558
            },
            "Cloud Storage": {
                "cost": 1.061128
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "AmazonEC2": {
                "cost": 45.090206059
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "microsoft.compute": {
                "cost": 11.622941680312156
            },
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "Microsoft.Compute": {
                "cost": 15.680959068000002
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonCloudWatch": {
                "cost": 1.8470329584
            },
            "Microsoft.Storage": {
                "cost": 3.37507609
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "null": {
                "cost": 10.32147324718345
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AWSCloudTrail": {
                "cost": 0.064501
            },
            "BigQuery": {
                "cost": 33.92282799999999
            },
            "AmazonS3": {
                "cost": 22.412897764000004
            },
            "Compute Engine": {
                "cost": 31.257424000000007
            }
        },
        "1739404800": {
            "AWSELB": {
                "cost": 1.2000314978
            },
            "null": {
                "cost": 11.724531406643933
            },
            "AmazonEC2": {
                "cost": 45.242235552800004
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "Cloud Storage": {
                "cost": 1.061126
            },
            "microsoft.compute": {
                "cost": 11.622245629452168
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "Microsoft.Compute": {
                "cost": 15.681627168000002
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "AmazonCloudWatch": {
                "cost": 1.92541416
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "Microsoft.Storage": {
                "cost": 3.375081404
            },
            "AWSCloudTrail": {
                "cost": 0.076081
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "BigQuery": {
                "cost": 8.981558
            },
            "AmazonS3": {
                "cost": 25.318722505199997
            },
            "Compute Engine": {
                "cost": 9.115825999999995
            }
        },
        "1739059200": {
            "Elastic IP Address": {
                "cost": 0.576
            },
            "null": {
                "cost": 13.000551557461533
            },
            "AmazonEC2": {
                "cost": 43.47974550399999
            },
            "AWSELB": {
                "cost": 1.2000318274
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Cloud Storage": {
                "cost": 1.06113
            },
            "microsoft.compute": {
                "cost": 12.731343257064538
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "Microsoft.Storage": {
                "cost": 3.3750802032
            },
            "AmazonCloudWatch": {
                "cost": 1.5530896896
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "AmazonVPC": {
                "cost": 7.204313890000004
            },
            "AWSCloudTrail": {
                "cost": 0.063641
            },
            "Microsoft.Compute": {
                "cost": 15.549631868
            },
            "microsoft.network": {
                "cost": 7.074315999999993
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "Compute Engine": {
                "cost": 31.25423
            },
            "AmazonS3": {
                "cost": 26.34256617260001
            },
            "BigQuery": {
                "cost": 11.782610000000002
            }
        },
        "1738540800": {
            "Compute Engine": {
                "cost": 28.848966000000008
            },
            "null": {
                "cost": 11.818769915805753
            },
            "AmazonS3": {
                "cost": 18.1736789054
            },
            "BigQuery": {
                "cost": 34.69702999999999
            },
            "AmazonCloudWatch": {
                "cost": 3.1224993392000004
            },
            "awskms": {
                "cost": 0.064516128
            },
            "AmazonQuickSight": {
                "cost": 1.548387072
            },
            "Microsoft.Storage": {
                "cost": 3.266216596
            },
            "AmazonRedshift": {
                "cost": 0.029696256
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AWSCloudTrail": {
                "cost": 0.06798
            },
            "microsoft.network": {
                "cost": 6.902399999999994
            },
            "Microsoft.Compute": {
                "cost": 14.983255528
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Cloud Storage": {
                "cost": 1.0269
            },
            "microsoft.compute": {
                "cost": 11.61998972131312
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 44.150644984999985
            },
            "AWSELB": {
                "cost": 1.2000306964
            }
        },
        "1740182400": {
            "null": {
                "cost": 16.615203680256943
            },
            "microsoft.compute": {
                "cost": 11.621796891778708
            },
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "AWSELB": {
                "cost": 1.2000307533999999
            },
            "Cloud Storage": {
                "cost": 1.06113
            },
            "Elastic Block Storage": {
                "cost": 2.306304000000001
            },
            "AmazonEC2": {
                "cost": 44.99565711599999
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AWSCloudTrail": {
                "cost": 0.078235
            },
            "BigQuery": {
                "cost": 20.051704000000015
            },
            "AmazonS3": {
                "cost": 17.484686084600003
            },
            "Compute Engine": {
                "cost": 31.222160000000006
            },
            "microsoft.network": {
                "cost": 7.247999999999994
            },
            "Microsoft.Compute": {
                "cost": 15.650275868000003
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonCloudWatch": {
                "cost": 2.9222412814000003
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "Microsoft.Storage": {
                "cost": 3.3750795624000003
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            }
        },
        "1738800000": {
            "microsoft.compute": {
                "cost": 11.969394644314862
            },
            "null": {
                "cost": 12.678834148752104
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "AWSELB": {
                "cost": 1.2000310446
            },
            "Cloud Storage": {
                "cost": 1.026898
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 43.4592205164
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AWSCloudTrail": {
                "cost": 0.083053
            },
            "Compute Engine": {
                "cost": 28.849130000000002
            },
            "BigQuery": {
                "cost": 17.650476000000005
            },
            "AmazonS3": {
                "cost": 28.7308545572
            },
            "Microsoft.Compute": {
                "cost": 14.990688628000001
            },
            "microsoft.network": {
                "cost": 6.902399999999995
            },
            "AmazonRedshift": {
                "cost": 0.029696256
            },
            "AmazonQuickSight": {
                "cost": 1.548387072
            },
            "Microsoft.Storage": {
                "cost": 3.266219356
            },
            "awskms": {
                "cost": 0.064516128
            },
            "AmazonCloudWatch": {
                "cost": 3.1607879164
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            }
        },
        "1738627200": {
            "microsoft.network": {
                "cost": 6.902399999999994
            },
            "Microsoft.Compute": {
                "cost": 14.993735527999998
            },
            "AmazonRedshift": {
                "cost": 0.029696256
            },
            "awskms": {
                "cost": 0.064516128
            },
            "AmazonCloudWatch": {
                "cost": 3.0501937104000003
            },
            "Microsoft.Storage": {
                "cost": 3.266218488
            },
            "AmazonQuickSight": {
                "cost": 1.548387072
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AWSCloudTrail": {
                "cost": 0.07774700000000001
            },
            "AmazonS3": {
                "cost": 15.715681548800001
            },
            "BigQuery": {
                "cost": 21.580957999999995
            },
            "Compute Engine": {
                "cost": 28.849063999999995
            },
            "AWSELB": {
                "cost": 1.20003147
            },
            "Cloud Storage": {
                "cost": 1.0269
            },
            "null": {
                "cost": 10.850302005323861
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "AmazonEC2": {
                "cost": 46.031591257600006
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "microsoft.compute": {
                "cost": 11.6217615564242
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            }
        },
        "1739577600": {
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "Cloud Storage": {
                "cost": 0.0
            },
            "microsoft.compute": {
                "cost": 11.621725857220591
            },
            "null": {
                "cost": 16.815771903640737
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 43.87467559019999
            },
            "AWSELB": {
                "cost": 1.2000314658
            },
            "Compute Engine": {
                "cost": 0.0
            },
            "AmazonS3": {
                "cost": 16.734511488200003
            },
            "BigQuery": {
                "cost": 0.0
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "Microsoft.Storage": {
                "cost": 3.3750808816
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "AmazonCloudWatch": {
                "cost": 2.2134482159999997
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AWSCloudTrail": {
                "cost": 0.065313
            },
            "Microsoft.Compute": {
                "cost": 15.640483868000002
            },
            "microsoft.network": {
                "cost": 7.247999999999994
            },
            "AmazonKinesis": {
                "cost": 0.864
            }
        },
        "1738454400": {
            "microsoft.compute": {
                "cost": 11.62153444811702
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "AWSELB": {
                "cost": 1.2000319244
            },
            "Cloud Storage": {
                "cost": 1.0269
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "AmazonEC2": {
                "cost": 44.10140381499999
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AWSCloudTrail": {
                "cost": 0.06759699999999999
            },
            "BigQuery": {
                "cost": 38.192980000000006
            },
            "AmazonS3": {
                "cost": 33.977627027200015
            },
            "null": {
                "cost": 11.572768225784323
            },
            "Compute Engine": {
                "cost": 28.849062
            },
            "microsoft.network": {
                "cost": 6.902399999999995
            },
            "Microsoft.Compute": {
                "cost": 14.970770228
            },
            "AmazonCloudWatch": {
                "cost": 3.0875226018
            },
            "awskms": {
                "cost": 0.064516128
            },
            "Microsoft.Storage": {
                "cost": 3.266213316
            },
            "AmazonQuickSight": {
                "cost": 1.548387072
            },
            "AmazonRedshift": {
                "cost": 0.029696256
            },
            "AmazonVPC": {
                "cost": 7.2043194400000035
            }
        },
        "1739664000": {
            "AmazonKinesis": {
                "cost": 0.864
            },
            "Compute Engine": {
                "cost": 0.0
            },
            "BigQuery": {
                "cost": 0.0
            },
            "AmazonS3": {
                "cost": 29.176518520200005
            },
            "AWSCloudTrail": {
                "cost": 0.072004
            },
            "Microsoft.Compute": {
                "cost": 17.324274776372782
            },
            "microsoft.network": {
                "cost": 7.247999999999993
            },
            "null": {
                "cost": 11.23848536176622
            },
            "AmazonVPC": {
                "cost": 7.388036110000004
            },
            "AmazonRedshift": {
                "cost": 0.030685824
            },
            "AmazonQuickSight": {
                "cost": 1.6000000128
            },
            "Microsoft.Storage": {
                "cost": 3.3750828564000006
            },
            "AmazonCloudWatch": {
                "cost": 2.4262360856
            },
            "awskms": {
                "cost": 0.0666666672
            },
            "microsoft.compute": {
                "cost": 11.619303786525697
            },
            "Elastic Compute Service": {
                "cost": 15.098663360000003
            },
            "Cloud Storage": {
                "cost": 0.0
            },
            "AWSELB": {
                "cost": 1.2000310833999999
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 157.71860980719995
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            }
        },
        "1738368000": {
            "Compute Engine": {
                "cost": 28.848921999999984
            },
            "AmazonS3": {
                "cost": 15.705813483400005
            },
            "BigQuery": {
                "cost": 16.81883
            },
            "Microsoft.Compute": {
                "cost": 14.972073528
            },
            "microsoft.network": {
                "cost": 6.902399999999995
            },
            "AmazonKinesis": {
                "cost": 0.864
            },
            "AmazonVPC": {
                "cost": 7.200000000000005
            },
            "AWSCloudTrail": {
                "cost": 0.06322900000000001
            },
            "Microsoft.Storage": {
                "cost": 3.266214772
            },
            "AmazonQuickSight": {
                "cost": 1.548387072
            },
            "AmazonCloudWatch": {
                "cost": 2.9696913248000003
            },
            "awskms": {
                "cost": 0.064516128
            },
            "AmazonRedshift": {
                "cost": 0.029696256
            },
            "microsoft.compute": {
                "cost": 11.621202458962799
            },
            "Cloud Storage": {
                "cost": 1.0269
            },
            "Elastic Compute Service": {
                "cost": 14.974799680000002
            },
            "Elastic Block Storage": {
                "cost": 0.770304
            },
            "null": {
                "cost": 15.9248582540514
            },
            "AWSELB": {
                "cost": 1.2000309759999999
            },
            "Elastic IP Address": {
                "cost": 0.576
            },
            "AmazonEC2": {
                "cost": 44.072751650199976
            }
        },
        "1740441600": {},
        "1740528000": {},
        "1740614400": {}
    },
    "start_date": 1738368000,
    "end_date": 1740700799,
    "total": 5074.293801968134,
    "previous_total": 5142.293090887621,
    "previous_range_start": 1736035200,
    "breakdown_by": "service_name"
}

 const CleanExpensesMock = {
    "data": {
        "cleanExpenses": {
            "start_date": 1735689600,
            "end_date": 1737849599,
            "total_count": 3,
            "total_cost": 3033.029059987807,
            "clean_expenses": [
                {
                    "cloud_account_id": "100efd88-28fb-49f1-946b-edbf78ad4650",
                    "cloud_resource_id": "/subscriptions/01643997-4d64-4718-8114-15e488ce3f61/resourcegroups/nlpvs00515rgp/providers/microsoft.compute/virtualmachines/nlpvps00515[E2E_RCE]",
                    "_first_seen_date": "2025-01-01T00:00:00",
                    "_last_seen_date": "2026-04-21T00:00:00",
                    "applied_rules": [
                        {
                            "id": "2c363b0a-7cf6-462a-b3c9-579fa99b2431",
                            "name": "Rule for CPA (Infrastructure)_1744297056",
                            "pool_id": "e20b9495-9237-4b22-a03a-f0fb0b481a58"
                        }
                    ],
                    "created_at": 1744297266,
                    "deleted_at": 0,
                    "employee_id": "4447ab7b-da32-4d3e-8840-f244ed505c05",
                    "first_seen": 1735689600,
                    "last_seen": 1776729600,
                    "meta": {
                        "os": "Windows",
                        "cpu_count": 8,
                        "flavor": "Standard_D8s_v3",
                        "cloud_console_link": "https://portal.azure.com/#resource/subscriptions/01643997-4d64-4718-8114-15e488ce3f61/resourceGroups/NLPVS00515RGP/providers/Microsoft.Compute/virtualMachines/nlpvps00515/overview",
                        "stopped_allocated": false,
                        "last_seen_not_stopped": 1776692946,
                        "spotted": false,
                        "security_groups": [
                            "/subscriptions/01643997-4d64-4718-8114-15e488ce3f61/resourceGroups/nlpvs00515rgp/providers/Microsoft.Network/networkSecurityGroups/nlpvps00515-nsg"
                        ],
                        "vpc_id": "/subscriptions/01643997-4d64-4718-8114-15e488ce3f61/resourceGroups/nlpvne0100rgp/providers/Microsoft.Network/virtualNetworks/nlpvne0100",
                        "vpc_name": "nlpvne0100",
                        "ram": 34359738368,
                        "architecture": "x86_64"
                    },
                    "pool_id": "e20b9495-9237-4b22-a03a-f0fb0b481a58",
                    "region": "West Europe",
                    "resource_type": "Instance",
                    "tags": {},
                    "service_name": "microsoft.compute",
                    "last_expense": {
                        "date": 1776643200,
                        "cost": 5.688240388924163
                    },
                    "total_cost": 14635.428413960126,
                    "has_metrics": true,
                    "active": true,
                    "id": "7b1d556d-d949-4291-9a95-3027298bc9c8",
                    "is_environment": false,
                    "saving": 866.7259199999999,
                    "cost": 1000.7583856144644,
                    "cloud_account_name": "CPA (Infrastructure)",
                    "cloud_account_type": "azure_cnr",
                    "owner": {
                        "id": "4447ab7b-da32-4d3e-8840-f244ed505c05",
                        "name": "Francesco"
                    },
                    "pool": {
                        "id": "e20b9495-9237-4b22-a03a-f0fb0b481a58",
                        "name": "CPA (Infrastructure)",
                        "purpose": "budget"
                    },
                    "resource_id": "7b1d556d-d949-4291-9a95-3027298bc9c8",
                    "resource_name": "nlpvps00515",
                    "shareable": false,
                    "constraint_violated": false,
                    "traffic_expenses": [
                        {
                            "from": "westeurope",
                            "to": "Inter-Region",
                            "usage": 0.2033127257600427,
                            "cost": 0.0053865173086524035
                        },
                        {
                            "from": "westeurope",
                            "to": "External",
                            "usage": 0.004981070756912231,
                            "cost": 0.00043335315585136386
                        }
                    ]
                },
                {
                    "cloud_account_id": "100efd88-28fb-49f1-946b-edbf78ad4650",
                    "cloud_resource_id": "/subscriptions/01643997-4d64-4718-8114-15e488ce3f61/resourcegroups/nlpvs00516rgp/providers/microsoft.compute/disks/nlpvs00516-disk-4",
                    "_first_seen_date": "2025-01-01T00:00:00",
                    "_last_seen_date": "2026-04-21T00:00:00",
                    "applied_rules": [
                        {
                            "id": "2c363b0a-7cf6-462a-b3c9-579fa99b2431",
                            "name": "Rule for CPA (Infrastructure)_1744297056",
                            "pool_id": "e20b9495-9237-4b22-a03a-f0fb0b481a58"
                        }
                    ],
                    "created_at": 1744297257,
                    "deleted_at": 0,
                    "employee_id": "4447ab7b-da32-4d3e-8840-f244ed505c05",
                    "first_seen": 1735689600,
                    "last_seen": 1776729600,
                    "meta": {
                        "cloud_console_link": "https://portal.azure.com/#resource/subscriptions/01643997-4d64-4718-8114-15e488ce3f61/resourceGroups/NLPVS00516RGP/providers/Microsoft.Compute/disks/nlpvs00516-disk-4/overview",
                        "attached": true,
                        "last_attached": 1776692951,
                        "size": 2199023255552,
                        "volume_type": "Microsoft.Compute/disks"
                    },
                    "pool_id": "e20b9495-9237-4b22-a03a-f0fb0b481a58",
                    "region": "West Europe",
                    "resource_type": "Volume",
                    "tags": {
                        "devops-ownerteam": "Pixel",
                        "devops-component": "DWH",
                        "environment": "QA"
                    },
                    "service_name": "microsoft.compute",
                    "last_expense": {
                        "date": 1776643200,
                        "cost": 1.682054935575
                    },
                    "total_cost": 4435.05318666001,
                    "active": true,
                    "id": "2cc0d96b-b218-4733-950f-b4f6fe50471e",
                    "is_environment": false,
                    "saving": 0,
                    "cost": 229.7675519999999,
                    "cloud_account_name": "CPA (Infrastructure)",
                    "cloud_account_type": "azure_cnr",
                    "owner": {
                        "id": "4447ab7b-da32-4d3e-8840-f244ed505c05",
                        "name": "Francesco"
                    },
                    "pool": {
                        "id": "e20b9495-9237-4b22-a03a-f0fb0b481a58",
                        "name": "CPA (Infrastructure)",
                        "purpose": "budget"
                    },
                    "resource_id": "2cc0d96b-b218-4733-950f-b4f6fe50471e",
                    "resource_name": "nlpvs00516-disk-4",
                    "shareable": false,
                    "constraint_violated": false
                },
                {
                    "cloud_resource_id": "i-06b92e5543302d718",
                    "cloud_account_id": "3f584d10-4293-4599-8ad5-413acc72fd45",
                    "_first_seen_date": "2025-01-01T00:00:00",
                    "_last_seen_date": "2026-04-20T00:00:00",
                    "applied_rules": [
                        {
                            "id": "0dacc61b-f185-41f8-809e-9804db99744c",
                            "name": "QA_PROD_4",
                            "pool_id": "7365f455-3210-4d34-964e-f00ce45ccbe5"
                        }
                    ],
                    "cloud_created_at": 1715970770,
                    "created_at": 1746464775,
                    "deleted_at": 0,
                    "employee_id": "4447ab7b-da32-4d3e-8840-f244ed505c05",
                    "first_seen": 1735689600,
                    "last_seen": 1776692423,
                    "meta": {
                        "flavor": "t4g.2xlarge",
                        "cloud_console_link": "https://console.aws.amazon.com/ec2/v2/home?region=eu-west-1#InstanceDetails:instanceId=i-06b92e5543302d718",
                        "stopped_allocated": false,
                        "last_seen_not_stopped": 1776692426,
                        "spotted": false,
                        "security_groups": [
                            "sg-0a686dc1c44c9680a"
                        ],
                        "image_id": "ami-0a636034c582e2138",
                        "vpc_id": "vpc-0b929b438ef06d92f",
                        "os": "NA",
                        "preinstalled": "NA",
                        "architecture": "arm64"
                    },
                    "pool_id": "7365f455-3210-4d34-964e-f00ce45ccbe5",
                    "region": "eu-west-1",
                    "resource_type": "Instance",
                    "tags": {
                        "Component": "jenkins"
                    },
                    "has_metrics": true,
                    "service_name": "AmazonEC2",
                    "last_expense": {
                        "date": 1765152000,
                        "cost": 0.006618283699999998
                    },
                    "total_cost": 131.13422942980003,
                    "active": true,
                    "id": "38921f4e-00c6-41a6-8160-2180364a9d3f",
                    "is_environment": false,
                    "saving": 0,
                    "cost": 0.0008769613999999999,
                    "cloud_account_name": "Marketplace (Production)",
                    "cloud_account_type": "aws_cnr",
                    "owner": {
                        "id": "4447ab7b-da32-4d3e-8840-f244ed505c05",
                        "name": "Francesco"
                    },
                    "pool": {
                        "id": "7365f455-3210-4d34-964e-f00ce45ccbe5",
                        "name": "QA & Prod",
                        "purpose": "budget"
                    },
                    "resource_id": "38921f4e-00c6-41a6-8160-2180364a9d3f",
                    "resource_name": "mpt-jenkins-vm",
                    "shareable": false,
                    "constraint_violated": false,
                    "traffic_expenses": [
                        {
                            "from": "eu-west-1",
                            "to": "External",
                            "usage": 0.009744011799999999,
                            "cost": 0.0008769614000000001
                        }
                    ]
                }
            ],
            "limit": 5000
        }
    }
}

 const SummaryMock = {
  "start_date": 1738022400,
  "end_date": 1740614399,
  "total_count": 787,
  "total_cost": 1111.1111,
  "total_saving": 3733.244514756799
}



export const resourcesInterceptions: InterceptionEntry[] = [
    { url: `v2/organizations/[^/]+/summary_expenses`, mock: SummaryMock },
    { url: `v2/organizations/[^/]+/breakdown_expenses`, mock: BreakdownExpensesMock },
    { gql: `CleanExpenses`, mock:  CleanExpensesMock },
];

export const resourceDetailsInterceptions: InterceptionEntry[] = [
    { url: `v2/organizations/[^/]+/summary_expenses`, mock: SummaryMock },
    { url: `v2/organizations/[^/]+/breakdown_expenses`, mock: BreakdownExpensesMock },
    { url: `v2/cloud_resources/[^/]+?details=true`, mock: ResourceDetailsMock },
    { url: `v2/cloud_resources/[^/]+/limit_hits`, mock: LimitHitsMock },
    { url: `v2/allowed_actions\\?cloud_resource=.+`, mock: AllowedActionsResponse },
    { url: `v2/resources/[^/]+/raw_expenses`, mock: RawExpensesMock },
];
