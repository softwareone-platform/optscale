export const GeminisMock = {
    "geminis": [
        {
            "deleted_at": 0,
            "id": "47e2038f-f6dc-4cb1-89fc-d0499d0fa40e",
            "created_at": 1711606326,
            "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
            "last_run": 1711606337,
            "last_completed": 1711606631,
            "last_error": null,
            "status": "SUCCESS",
            "filters": {
                "min_size": 0,
                "buckets": [
                    {
                        "name": "sunflower-eu-fra",
                        "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466"
                    },
                    {
                        "name": "sunflower-ap-south-1",
                        "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466"
                    },
                    {
                        "name": "sunflower-ap-northeast-2",
                        "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466"
                    },
                    {
                        "name": "sunflower.example",
                        "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466"
                    },
                    {
                        "name": "sunflower-us-east-1",
                        "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466"
                    },
                    {
                        "name": "sunflower-infra-backup",
                        "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466"
                    },
                    {
                        "name": "sunflower-us-west-1",
                        "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466"
                    }
                ]
            },
            "stats": {
                "total_objects": 1404932,
                "filtered_objects": 1404780,
                "total_size": 11566960376932,
                "duplicates_size": 503395423938,
                "duplicated_objects": 146,
                "monthly_savings": 10.702492556541058,
                "buckets": {
                    "sunflower-eu-fra": {
                        "total_objects": 1404666,
                        "filtered_objects": 1404530,
                        "size": 8799527528456,
                        "monthly_cost": 188.48631791999998,
                        "objects_with_duplicates": 100,
                        "objects_with_duplicates_size": 289076100260,
                        "monthly_savings": 6.1920244650045015
                    },
                    "sunflower-ap-northeast-2": {
                        "total_objects": 10,
                        "filtered_objects": 8,
                        "size": 1502636780,
                        "objects_with_duplicates": 8,
                        "objects_with_duplicates_size": 1502636780
                    },
                    "sunflower-ap-south-1": {
                        "total_objects": 18,
                        "filtered_objects": 16,
                        "size": 108876948142,
                        "monthly_cost": 2.4193577580000003,
                        "objects_with_duplicates": 8,
                        "objects_with_duplicates_size": 1502636780,
                        "monthly_savings": 0.03339013458025789
                    },
                    "sunflower-infra-backup": {
                        "total_objects": 148,
                        "filtered_objects": 146,
                        "size": 2564511240100,
                        "monthly_cost": 53.138959476000004,
                        "objects_with_duplicates": 12,
                        "objects_with_duplicates_size": 210772504484,
                        "monthly_savings": 4.367394222843635
                    },
                    "sunflower.example": {
                        "total_objects": 10,
                        "filtered_objects": 10,
                        "size": 542012092,
                        "monthly_cost": 1.0302e-05,
                        "objects_with_duplicates": 6,
                        "objects_with_duplicates_size": 541553922,
                        "monthly_savings": 1.029329158295605e-05
                    },
                    "sunflower-us-east-1": {
                        "total_objects": 80,
                        "filtered_objects": 70,
                        "size": 92000011362,
                        "monthly_cost": 1.8759597959999998,
                        "objects_with_duplicates": 12,
                        "objects_with_duplicates_size": 13219830446,
                        "monthly_savings": 0.26956377569401224
                    },
                    "sunflower-us-west-1": {
                        "total_objects": 0,
                        "filtered_objects": 0,
                        "size": 0,
                        "objects_with_duplicates": 0,
                        "objects_with_duplicates_size": 0
                    }
                },
                "matrix": {
                    "sunflower-eu-fra": {
                        "sunflower-eu-fra": {
                            "duplicated_objects": 86,
                            "duplicates_size": 275856261526.0,
                            "monthly_savings": 5.908854860908147
                        },
                        "sunflower-ap-northeast-2": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780,
                            "monthly_savings": 0.03218655466642549
                        },
                        "sunflower-us-west-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-ap-south-1": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780,
                            "monthly_savings": 0.03218655466642549
                        },
                        "sunflower-infra-backup": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484,
                            "monthly_savings": 0.022647514706330293
                        },
                        "sunflower.example": {
                            "duplicated_objects": 12,
                            "duplicates_size": 541553922,
                            "monthly_savings": 0.011600111981333325
                        },
                        "sunflower-us-east-1": {
                            "duplicated_objects": 24,
                            "duplicates_size": 13219830446,
                            "monthly_savings": 0.28316942656698124
                        }
                    },
                    "sunflower-ap-northeast-2": {
                        "sunflower-ap-northeast-2": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower-eu-fra": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780
                        },
                        "sunflower-us-west-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower-ap-south-1": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780
                        },
                        "sunflower-infra-backup": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484
                        },
                        "sunflower.example": {
                            "duplicated_objects": 8,
                            "duplicates_size": 541545634
                        },
                        "sunflower-us-east-1": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780
                        }
                    },
                    "sunflower-us-west-1": {
                        "sunflower-us-west-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower-eu-fra": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower-ap-northeast-2": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower-ap-south-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower-infra-backup": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower.example": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        },
                        "sunflower-us-east-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0
                        }
                    },
                    "sunflower-ap-south-1": {
                        "sunflower-ap-south-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-eu-fra": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780,
                            "monthly_savings": 0.03339013458025789
                        },
                        "sunflower-ap-northeast-2": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780,
                            "monthly_savings": 0.03339013458025789
                        },
                        "sunflower-us-west-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-infra-backup": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484,
                            "monthly_savings": 0.023494392978368417
                        },
                        "sunflower.example": {
                            "duplicated_objects": 8,
                            "duplicates_size": 541545634,
                            "monthly_savings": 0.012033700919134353
                        },
                        "sunflower-us-east-1": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780,
                            "monthly_savings": 0.03339013458025789
                        }
                    },
                    "sunflower-infra-backup": {
                        "sunflower-infra-backup": {
                            "duplicated_objects": 8,
                            "duplicates_size": 209715200000.0,
                            "monthly_savings": 4.345485931216541
                        },
                        "sunflower-eu-fra": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484,
                            "monthly_savings": 0.021908291627093148
                        },
                        "sunflower-ap-northeast-2": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484,
                            "monthly_savings": 0.021908291627093148
                        },
                        "sunflower-us-west-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-ap-south-1": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484,
                            "monthly_savings": 0.021908291627093148
                        },
                        "sunflower.example": {
                            "duplicated_objects": 4,
                            "duplicates_size": 264519146,
                            "monthly_savings": 0.005481072556879111
                        },
                        "sunflower-us-east-1": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484,
                            "monthly_savings": 0.021908291627093148
                        }
                    },
                    "sunflower.example": {
                        "sunflower.example": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-eu-fra": {
                            "duplicated_objects": 12,
                            "duplicates_size": 541553922,
                            "monthly_savings": 1.029329158295605e-05
                        },
                        "sunflower-ap-northeast-2": {
                            "duplicated_objects": 8,
                            "duplicates_size": 541545634,
                            "monthly_savings": 1.0293134053304479e-05
                        },
                        "sunflower-us-west-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-ap-south-1": {
                            "duplicated_objects": 8,
                            "duplicates_size": 541545634,
                            "monthly_savings": 1.0293134053304479e-05
                        },
                        "sunflower-infra-backup": {
                            "duplicated_objects": 4,
                            "duplicates_size": 264519146,
                            "monthly_savings": 5.027703776933449e-06
                        },
                        "sunflower-us-east-1": {
                            "duplicated_objects": 8,
                            "duplicates_size": 541545634,
                            "monthly_savings": 1.0293134053304479e-05
                        }
                    },
                    "sunflower-us-east-1": {
                        "sunflower-us-east-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-eu-fra": {
                            "duplicated_objects": 24,
                            "duplicates_size": 13219830446,
                            "monthly_savings": 0.26956377569401224
                        },
                        "sunflower-ap-northeast-2": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780,
                            "monthly_savings": 0.03064006346889669
                        },
                        "sunflower-us-west-1": {
                            "duplicated_objects": 0,
                            "duplicates_size": 0,
                            "monthly_savings": 0.0
                        },
                        "sunflower-ap-south-1": {
                            "duplicated_objects": 16,
                            "duplicates_size": 1502636780,
                            "monthly_savings": 0.03064006346889669
                        },
                        "sunflower-infra-backup": {
                            "duplicated_objects": 8,
                            "duplicates_size": 1057304484,
                            "monthly_savings": 0.021559352816925635
                        },
                        "sunflower.example": {
                            "duplicated_objects": 8,
                            "duplicates_size": 541545634,
                            "monthly_savings": 0.011042583821929275
                        }
                    }
                }
            }
        }
    ]
}

export const OptionsMock = {
    "options": [
        {
            "name": "recommendation_s3_abandoned_buckets",
            "value": "{\"days_threshold\":7,\"data_size_threshold\":1024,\"tier_1_request_quantity_threshold\":100,\"tier_2_request_quantity_threshold\":2000,\"excluded_pools\":{},\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_rightsizing_rds",
            "value": "{\"days_threshold\": 9, \"metric\": {\"type\": \"avg\", \"limit\": 81}, \"excluded_flavor_regex\": \"\", \"excluded_pools\": {}, \"recommended_flavor_cpu_min\": 1, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_nebius_migration",
            "value": "{\"days_threshold\": 30, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_obsolete_images",
            "value": "{\"days_threshold\":7,\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_saving_spike_notification",
            "value": "{\"threshold\": 10, \"skip_notifications\": false}"
        },
        {
            "name": "recommendation_s3_public_buckets",
            "value": "{\"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "orchid_mode",
            "value": "{\"value\":{\"finops\":true,\"mlops\":true}}"
        },
        {
            "name": "recommendation_security_optimization_notification",
            "value": "{\"skip_security_notification\": false}"
        },
        {
            "name": "recommendation_instances_in_stopped_state_for_a_long_time",
            "value": "{\"days_threshold\":2,\"excluded_pools\":{},\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_obsolete_snapshots",
            "value": "{\"days_threshold\":4,\"excluded_pools\":{},\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_obsolete_ips",
            "value": "{\"days_threshold\": 7, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_inactive_users",
            "value": "{\"days_threshold\":91,\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_insecure_security_groups",
            "value": "{\"excluded_pools\":{},\"skip_cloud_accounts\":[],\"insecure_ports\":[{\"protocol\":\"tcp\",\"port\":22},{\"protocol\":\"tcp\",\"port\":3389},{\"protocol\":\"tcp\",\"port\":1080}]}"
        },
        {
            "name": "recommendation_instance_generation_upgrade",
            "value": "{\"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "s3_duplicates_settings",
            "value": "{\"thresholds\":{\"requiring_attention\":0.1,\"critical\":2}}"
        },
        {
            "name": "finops_checklist",
            "value": "{\"items\":[]}"
        },
        {
            "name": "recommendation_instance_subscription",
            "value": "{\"days_threshold\": 90, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_instance_migration",
            "value": "{\"excluded_pools\":{\"f6fafb13-747b-4cb3-bee6-0cb91bc56fbb\":true},\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_abandoned_kinesis_streams",
            "value": "{\"days_threshold\":7,\"excluded_pools\":{},\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_reserved_instances",
            "value": "{\"days_threshold\": 90, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_instances_for_shutdown",
            "value": "{\"days_threshold\": 15, \"cpu_percent_threshold\": 6, \"network_bps_threshold\": 1001, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_rightsizing_instances",
            "value": "{\"days_threshold\": 3, \"metric\": {\"type\": \"avg\", \"limit\": 80}, \"excluded_flavor_regex\": \"\", \"excluded_pools\": {\"3a248797-84f6-46b8-b6b9-9aa612105d1e\": true, \"9ef6f469-434d-4937-80b0-6eea3085deb6\": true}, \"recommended_flavor_cpu_min\": 1, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_abandoned_images",
            "value": "{\"days_threshold\": 7, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "perspectives",
            "value": "{\"Basic\":{\"filters\":{\"filterValues\":{},\"appliedFilters\":{}},\"breakdownBy\":\"expenses\",\"breakdownData\":{\"breakdownBy\":\"service_name\",\"groupBy\":{}}}}"
        },
        {
            "name": "recommendation_short_living_instances",
            "value": "{\"days_threshold\": 3, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "theme_settings",
            "value": "{\"typography\":{\"body1\":{},\"body2\":{},\"subtitle1\":{},\"subtitle2\":{},\"h1\":{},\"h2\":{},\"h3\":{},\"h4\":{},\"h5\":{},\"h6\":{}},\"palette\":{\"text\":{},\"primary\":{},\"secondary\":{},\"info\":{},\"warning\":{},\"error\":{},\"success\":{}},\"chartPalette\":{\"chart\":[],\"monoChart\":[]}}"
        },
        {
            "name": "recommendation_cvos_opportunities",
            "value": "{\"days_threshold\": 90, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "features",
            "value": "{\"paid_organization\":0,\"show_aws_upload_report\":0,\"nebius_connection_enabled\":0,\"ri_sp_enabled\":0}"
        },
        {
            "name": "recommendation_abandoned_instances",
            "value": "{\"days_threshold\": 7, \"cpu_percent_threshold\": 5, \"network_bps_threshold\": 1000, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
        },
        {
            "name": "recommendation_obsolete_snapshot_chains",
            "value": "{\"days_threshold\":3,\"excluded_pools\":{},\"skip_cloud_accounts\":[]}"
        },
        {
            "name": "recommendation_inactive_console_users",
            "value": "{\"days_threshold\":91,\"skip_cloud_accounts\":[]}"
        }
    ]
}

export const RIBreakdownMock = {
    "breakdown": {
        "1739404800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.95444499999999,
                "cost_without_offer": 6.367236062399999,
                "cost_with_offer": 4.8985105739999995,
                "ri_usage_hrs": 24.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0.0
                },
                "ri_overprovision": 0.0,
                "ri_cost_without_offer": 0.6432,
                "ri_cost_with_offer": 0.4608,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.9455370651,
                "cost_without_offer": 14.963491679199999,
                "cost_with_offer": 13.727237708399999,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_without_offer": 0,
                "ri_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739750400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 144.8982708316,
                "cost_without_offer": 41.48356609139999,
                "cost_with_offer": 38.336330795399995,
                "ri_usage_hrs": 24.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0.0
                },
                "ri_overprovision": 0.0,
                "ri_cost_without_offer": 0.6432,
                "ri_cost_with_offer": 0.4608,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 168.0,
                "cost_without_offer": 14.5344,
                "cost_with_offer": 14.5344,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_without_offer": 0,
                "ri_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739318400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 98.82722299999999,
                "cost_without_offer": 6.3336898056,
                "cost_with_offer": 4.872045942399999,
                "ri_usage_hrs": 24.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0.0
                },
                "ri_overprovision": 0.0,
                "ri_cost_without_offer": 0.6432,
                "ri_cost_with_offer": 0.4608,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 174.0,
                "cost_without_offer": 14.9968,
                "cost_with_offer": 13.7340975966,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_without_offer": 0,
                "ri_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738281600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.406112,
                "cost_without_offer": 6.103248076799999,
                "cost_with_offer": 4.6824727296,
                "ri_usage_hrs": 24.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0.0
                },
                "ri_overprovision": 0.0,
                "ri_cost_without_offer": 0.6432,
                "ri_cost_with_offer": 0.4608,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.7685325265,
                "cost_without_offer": 15.184239637000001,
                "cost_with_offer": 13.8005540374,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_without_offer": 0,
                "ri_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740096000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.4075,
                "cost_without_offer": 6.102744019199999,
                "cost_with_offer": 4.6820596824,
                "ri_usage_hrs": 24.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0.0
                },
                "ri_overprovision": 0.0,
                "ri_cost_without_offer": 0.6432,
                "ri_cost_with_offer": 0.4608,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.6987871938,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_without_offer": 0,
                "ri_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738627200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 110.87444599999999,
                "cost_without_offer": 6.7272872416,
                "cost_with_offer": 5.1927332092,
                "ri_usage_hrs": 24.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0.0
                },
                "ri_overprovision": 0.0,
                "ri_cost_without_offer": 0.6432,
                "ri_cost_with_offer": 0.4608,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.0,
                "cost_without_offer": 14.788,
                "cost_with_offer": 13.7212653054,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_without_offer": 0,
                "ri_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739491200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.0,
                "cost_without_offer": 6.0767999999999995,
                "cost_with_offer": 4.660799999999999,
                "ri_usage_hrs": 24.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0.0
                },
                "ri_overprovision": 0.0,
                "ri_cost_without_offer": 0.6432,
                "ri_cost_with_offer": 0.4608,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.690199697199999,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_without_offer": 0,
                "ri_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740441600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 0,
                "cost_without_offer": 0,
                "cost_with_offer": 0,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_with_offer": 0,
                "ri_cost_without_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 0,
                "cost_without_offer": 0,
                "cost_with_offer": 0,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_with_offer": 0,
                "ri_cost_without_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740528000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 0,
                "cost_without_offer": 0,
                "cost_with_offer": 0,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_with_offer": 0,
                "ri_cost_without_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 0,
                "cost_without_offer": 0,
                "cost_with_offer": 0,
                "ri_usage_hrs": 0,
                "ri_overprovision_hrs": {
                    "t2.micro": 0
                },
                "ri_overprovision": 0,
                "ri_cost_with_offer": 0,
                "ri_cost_without_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ]
    }
}

export const SPBreakdownMock = {
    "breakdown": {
        "1739404800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.95444499999999,
                "cost_without_offer": 6.367236062399999,
                "cost_with_offer": 4.8985105739999995,
                "sp_usage_hrs": 73.950380859,
                "sp_overprovision_hrs": {
                    "t2.micro": 332.8599951346,
                    "t2.large": 41.7963367725,
                    "t3.micro": 313.9474922086,
                    "t3.small": 156.0868902749,
                    "t2.xlarge": 20.8981683862,
                    "t3.large": 39.0769168893,
                    "c5d.2xlarge": 9.9022859397,
                    "t3.medium": 78.0434451374,
                    "t2.medium": 83.4663984925,
                    "c5.2xlarge": 11.2306416266
                },
                "sp_overprovision": 2.7627379165,
                "sp_cost_without_offer": 5.7235873812,
                "sp_cost_with_offer": 4.4372618928,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.9455370651,
                "cost_without_offer": 14.963491679199999,
                "cost_with_offer": 13.727237708399999,
                "sp_usage_hrs": 25.8437073172,
                "sp_overprovision_hrs": {
                    "t2.micro": 0.0,
                    "t2.large": 0.0,
                    "t3.micro": 0.0,
                    "t3.small": 0.0,
                    "t2.xlarge": 0.0,
                    "t3.large": 0.0,
                    "c5d.2xlarge": 0.0,
                    "t3.medium": 0.0,
                    "t2.medium": 0.0,
                    "c5.2xlarge": 0.0
                },
                "sp_overprovision": 0,
                "sp_cost_without_offer": 4.307792078,
                "sp_cost_with_offer": 3.0715381072000003,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739750400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 144.8982708316,
                "cost_without_offer": 41.48356609139999,
                "cost_with_offer": 38.336330795399995,
                "sp_usage_hrs": 59.4771961324,
                "sp_overprovision_hrs": {
                    "t2.micro": 0.0,
                    "t2.large": 0.0,
                    "t3.micro": 0.0,
                    "t3.small": 0.0,
                    "t2.xlarge": 0.0,
                    "t3.large": 0.0,
                    "c5d.2xlarge": 0.0,
                    "t3.medium": 0.0,
                    "t2.medium": 0.0,
                    "c5.2xlarge": 0.0
                },
                "sp_overprovision": 0.0,
                "sp_cost_without_offer": 10.632435296,
                "sp_cost_with_offer": 7.6676,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 168.0,
                "cost_without_offer": 14.5344,
                "cost_with_offer": 14.5344,
                "sp_usage_hrs": 0,
                "sp_overprovision_hrs": {
                    "t2.micro": 0,
                    "t2.large": 0,
                    "t3.micro": 0,
                    "t3.small": 0,
                    "t2.xlarge": 0,
                    "t3.large": 0,
                    "c5d.2xlarge": 0,
                    "t3.medium": 0,
                    "t2.medium": 0,
                    "c5.2xlarge": 0
                },
                "sp_overprovision": 0,
                "sp_cost_without_offer": 0,
                "sp_cost_with_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738281600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.406112,
                "cost_without_offer": 6.103248076799999,
                "cost_with_offer": 4.6824727296,
                "sp_usage_hrs": 72.40611200000001,
                "sp_overprovision_hrs": {
                    "t2.micro": 358.8345935162,
                    "t2.large": 45.0578974207,
                    "t3.micro": 338.4462608868,
                    "t3.small": 168.2670691693,
                    "t2.xlarge": 22.5289487103,
                    "t3.large": 42.1262686799,
                    "c5d.2xlarge": 10.6750069158,
                    "t3.medium": 84.1335345846,
                    "t2.medium": 89.9796659649,
                    "c5.2xlarge": 12.1070203146
                },
                "sp_overprovision": 2.9783270797,
                "sp_cost_without_offer": 5.460048076799999,
                "sp_cost_with_offer": 4.2216727296,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.7685325265,
                "cost_without_offer": 15.184239637000001,
                "cost_with_offer": 13.8005540374,
                "sp_usage_hrs": 31.2974831358,
                "sp_overprovision_hrs": {
                    "t2.micro": 0.0,
                    "t2.large": 0.0,
                    "t3.micro": 0.0,
                    "t3.small": 0.0,
                    "t2.xlarge": 0.0,
                    "t3.large": 0.0,
                    "c5d.2xlarge": 0.0,
                    "t3.medium": 0.0,
                    "t2.medium": 0.0,
                    "c5.2xlarge": 0.0
                },
                "sp_overprovision": 0,
                "sp_cost_without_offer": 4.831212870000001,
                "sp_cost_with_offer": 3.4475272703999997,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740096000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.4075,
                "cost_without_offer": 6.102744019199999,
                "cost_with_offer": 4.6820596824,
                "sp_usage_hrs": 72.40749999999998,
                "sp_overprovision_hrs": {
                    "t2.micro": 358.8843582399,
                    "t2.large": 45.0641462435,
                    "t3.micro": 338.4931980688,
                    "t3.small": 168.2904051696,
                    "t2.xlarge": 22.5320731218,
                    "t3.large": 42.1321109319,
                    "c5d.2xlarge": 10.6764873716,
                    "t3.medium": 84.1452025848,
                    "t2.medium": 89.9921447317,
                    "c5.2xlarge": 12.1086993682
                },
                "sp_overprovision": 2.9787401269,
                "sp_cost_without_offer": 5.459544019199999,
                "sp_cost_with_offer": 4.2212596824,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.6987871938,
                "sp_usage_hrs": 30.5320750207,
                "sp_overprovision_hrs": {
                    "t2.micro": 0.0,
                    "t2.large": 0.0,
                    "t3.micro": 0.0,
                    "t3.small": 0.0,
                    "t2.xlarge": 0.0,
                    "t3.large": 0.0,
                    "c5d.2xlarge": 0.0,
                    "t3.medium": 0.0,
                    "t2.medium": 0.0,
                    "c5.2xlarge": 0.0
                },
                "sp_overprovision": 0,
                "sp_cost_without_offer": 4.6891531238,
                "sp_cost_with_offer": 3.3463403175999997,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738627200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 110.87444599999999,
                "cost_without_offer": 6.7272872416,
                "cost_with_offer": 5.1927332092,
                "sp_usage_hrs": 86.87444599999999,
                "sp_overprovision_hrs": {
                    "t2.micro": 297.3574263391,
                    "t2.large": 37.3383744359,
                    "t3.micro": 280.4621151635,
                    "t3.small": 139.4387930537,
                    "t2.xlarge": 18.669187218,
                    "t3.large": 34.9090056039,
                    "c5d.2xlarge": 8.8461164001,
                    "t3.medium": 69.7193965268,
                    "t2.medium": 74.5639422108,
                    "c5.2xlarge": 10.0327907801
                },
                "sp_overprovision": 2.4680666001,
                "sp_cost_without_offer": 6.0840872416,
                "sp_cost_with_offer": 4.7319332092,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.0,
                "cost_without_offer": 14.788,
                "cost_with_offer": 13.7212653054,
                "sp_usage_hrs": 22.6691890379,
                "sp_overprovision_hrs": {
                    "t2.micro": 0.0,
                    "t2.large": 0.0,
                    "t3.micro": 0.0,
                    "t3.small": 0.0,
                    "t2.xlarge": 0.0,
                    "t3.large": 0.0,
                    "c5d.2xlarge": 0.0,
                    "t3.medium": 0.0,
                    "t2.medium": 0.0,
                    "c5.2xlarge": 0.0
                },
                "sp_overprovision": 0,
                "sp_cost_without_offer": 3.7186014854000002,
                "sp_cost_with_offer": 2.6518667908,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
    }
}

export const SummaryExpensesMock = {
    "start_date": 1738022400,
    "end_date": 1740614399,
    "total_count": 787,
    "total_cost": 5862.251871638755,
    "total_saving": 3733.244514756799
}

export const OptimisationsMock = {
    "total_saving": 3956.1424881109824,
    "optimizations": {
        "abandoned_images": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 7,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "abandoned_instances": {
            "count": 22,
            "saving": 1466.2318238691428,
            "options": {
                "days_threshold": 7,
                "cpu_percent_threshold": 5,
                "network_bps_threshold": 1000,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "resource_id": "1f9ac14f-ec06-4b1f-97f0-8c375dc7d13d",
                    "resource_name": "clustertest24",
                    "cloud_resource_id": "i-00f9f573b5ea31978",
                    "region": "us-east-1",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "owner": {
                        "id": "8d50c2b1-1b98-4e9d-999d-97d30c22e36e",
                        "name": "Oscar Foster"
                    },
                    "pool": {
                        "id": "b9d9f439-0aeb-4e4f-a514-8c977d17be3a",
                        "name": "QA",
                        "purpose": "team"
                    },
                    "is_excluded": false,
                    "saving": 175.5583913837143,
                    "detected_at": 1740288896
                },
                {
                    "resource_id": "f151914e-6b0c-4616-b8e5-1e9718b4898d",
                    "resource_name": "clustertest24-x1",
                    "cloud_resource_id": "i-00f9f573b5ea31978-x1",
                    "region": "us-east-1",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "owner": {
                        "id": "8d50c2b1-1b98-4e9d-999d-97d30c22e36e",
                        "name": "Oscar Foster"
                    },
                    "pool": {
                        "id": "b9d9f439-0aeb-4e4f-a514-8c977d17be3a",
                        "name": "QA",
                        "purpose": "team"
                    },
                    "is_excluded": false,
                    "saving": 175.5583913837143,
                    "detected_at": 1740288896
                },
                {
                    "resource_id": "880e7a15-adea-446d-ba28-4adf61ad11ae",
                    "resource_name": "clustertest24-x2",
                    "cloud_resource_id": "i-00f9f573b5ea31978-x2",
                    "region": "us-east-1",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "owner": {
                        "id": "8d50c2b1-1b98-4e9d-999d-97d30c22e36e",
                        "name": "Oscar Foster"
                    },
                    "pool": {
                        "id": "b9d9f439-0aeb-4e4f-a514-8c977d17be3a",
                        "name": "QA",
                        "purpose": "team"
                    },
                    "is_excluded": false,
                    "saving": 175.5583913837143,
                    "detected_at": 1740288896
                }
            ],
            "cloud_accounts": [
                {
                    "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "cvos_opportunities": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 90,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "inactive_users": {
            "count": 37,
            "options": {
                "days_threshold": 91,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "np-member",
                    "user_id": "AIDAQUWY5LJ4T5RA66A4L",
                    "last_used": 1716934087,
                    "detected_at": 1738630103
                },
                {
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "mk-full",
                    "user_id": "AIDAQUWY5LJ4ZOHQ32TBF",
                    "last_used": 1716832301,
                    "detected_at": 1738522067
                },
                {
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "ak-member",
                    "user_id": "AIDAQUWY5LJ42MTENTJCJ",
                    "last_used": 1716456215,
                    "detected_at": 1738143403
                }
            ],
            "cloud_accounts": [
                {
                    "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "insecure_security_groups": {
            "count": 20,
            "options": {
                "excluded_pools": {},
                "insecure_ports": [
                    {
                        "protocol": "tcp",
                        "port": 22
                    },
                    {
                        "protocol": "tcp",
                        "port": 3389
                    },
                    {
                        "protocol": "tcp",
                        "port": 1080
                    }
                ],
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "i-00f9f573b5ea31978",
                    "resource_name": "clustertest24",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "resource_id": "1f9ac14f-ec06-4b1f-97f0-8c375dc7d13d",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "security_group_name": "launch-wizard-55",
                    "security_group_id": "sg-0840e05b209b55aec",
                    "region": "us-east-1",
                    "is_excluded": false,
                    "insecure_ports": [
                        {
                            "port": 22,
                            "protocol": "tcp"
                        }
                    ],
                    "detected_at": 1739693901
                },
                {
                    "cloud_resource_id": "i-0b62e296e131a2a8e",
                    "resource_name": "clustertest22",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "resource_id": "3c9da8eb-dc70-44ae-ba18-455797492972",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "security_group_name": "launch-wizard-54",
                    "security_group_id": "sg-07047937a3e64a04f",
                    "region": "us-east-1",
                    "is_excluded": false,
                    "insecure_ports": [
                        {
                            "port": 22,
                            "protocol": "tcp"
                        }
                    ],
                    "detected_at": 1739683101
                },
                {
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/aqa/providers/microsoft.compute/virtualmachines/aqa-westus2-underutilized-instance",
                    "resource_name": "aqa-westus2-underutilized-instance",
                    "cloud_account_id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "resource_id": "cf1183db-b165-4fae-bac4-5e8d0f2ba864",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Azure QA",
                    "security_group_name": "aqa-westus2-underutilized-instance-nsg",
                    "security_group_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourceGroups/aqa/providers/Microsoft.Network/networkSecurityGroups/aqa-westus2-underutilized-instance-nsg",
                    "region": "West US 2",
                    "is_excluded": false,
                    "insecure_ports": [
                        {
                            "port": 22,
                            "protocol": "tcp"
                        }
                    ],
                    "detected_at": 1733212884
                }
            ],
            "cloud_accounts": [
                {
                    "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
                {
                    "id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                }
            ],
            "limit": 3
        },
        "instance_generation_upgrade": {
            "count": 1,
            "saving": 12.6144,
            "options": {
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "i-gw8csaxjubfrl7s2e1ip",
                    "resource_name": "aqa-instance-generation-upgrade",
                    "resource_id": "837cad0b-a9b8-41b2-b513-449a2f3ccf21",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "region": "Germany (Frankfurt)",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "43ec75c7-79f3-4a07-92c8-423758ac4ad7",
                        "name": "Ali dev",
                        "purpose": "budget"
                    },
                    "saving": 12.6144,
                    "recommended_flavor": "ecs.t6-c1m1.large",
                    "is_excluded": false,
                    "flavor": "ecs.t5-c1m1.large",
                    "detected_at": 1739062255
                }
            ],
            "cloud_accounts": [
                {
                    "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                }
            ],
            "limit": 3
        },
        "instance_subscription": {
            "count": 2,
            "saving": 32.751066666666674,
            "options": {
                "days_threshold": 90,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "monthly_saving": 20.080000000000005,
                    "annually_monthly_saving": 28.73166666666667,
                    "saving": 28.73166666666667,
                    "invoice_discount": 0.0,
                    "flavor": "ecs.n4.large",
                    "region": "Germany (Frankfurt)",
                    "cloud_resource_id": "i-gw8bwy1fbwc2spcyqhdy",
                    "resource_name": "aqa-eu-underutilized-instance",
                    "resource_id": "993a1aba-9f5d-4296-9181-1d91eeae0f89",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "is_excluded": false,
                    "detected_at": 1699860467
                },
                {
                    "monthly_saving": 3.0744000000000016,
                    "annually_monthly_saving": 4.019400000000001,
                    "saving": 4.019400000000001,
                    "invoice_discount": 0.06999999999999999,
                    "flavor": "ecs.t5-lc2m1.nano",
                    "region": "Germany (Frankfurt)",
                    "cloud_resource_id": "i-gw8692qiefklcvhgc75e",
                    "resource_name": "aqa-stopped-not-deallocated",
                    "resource_id": "ecfadbd7-a9f6-49e0-9953-21e465342f34",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "is_excluded": false,
                    "detected_at": 1719483678
                }
            ],
            "cloud_accounts": [
                {
                    "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                }
            ],
            "limit": 3
        },
        "instances_in_stopped_state_for_a_long_time": {
            "count": 2,
            "saving": 42.90462443612902,
            "options": {
                "days_threshold": 2,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/aqa/providers/microsoft.compute/virtualmachines/aqa-stopped-not-deallocated",
                    "resource_name": "aqa-stopped-not-deallocated",
                    "resource_id": "7ed5ffc9-c02b-4de1-94c2-eb2bca199408",
                    "cloud_account_id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Azure QA",
                    "cost_in_stopped_state": 356.70413100297145,
                    "saving": 33.62787443612902,
                    "region": "Germany West Central",
                    "is_excluded": false,
                    "last_seen_active": 0,
                    "detected_at": 1717245288
                },
                {
                    "cloud_resource_id": "i-gw8692qiefklcvhgc75e",
                    "resource_name": "aqa-stopped-not-deallocated",
                    "resource_id": "ecfadbd7-a9f6-49e0-9953-21e465342f34",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "cost_in_stopped_state": 37.929122,
                    "saving": 9.27675,
                    "region": "Germany (Frankfurt)",
                    "is_excluded": false,
                    "last_seen_active": 1719897778,
                    "detected_at": 1720078676
                }
            ],
            "cloud_accounts": [
                {
                    "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                }
            ],
            "limit": 3
        },
        "obsolete_images": {
            "count": 109,
            "saving": 214.33317437871426,
            "options": {
                "days_threshold": 7,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "ami-06f4e737af7d45d1b",
                    "resource_name": "sunflower_lily_VA_DR_AWS_3_9_2066-release_3_9",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "last_used": 0,
                    "saving": 5.2637343780000005,
                    "snapshots": [
                        {
                            "cloud_resource_id": "snap-0b14b0f5690db4384",
                            "resource_id": "376d8e25-a85f-4de9-a978-c03ce757746e",
                            "cost": 2.6318671890000003
                        }
                    ],
                    "first_seen": 1676376374,
                    "detected_at": 1722845929
                },
                {
                    "cloud_resource_id": "ami-04c8e04f79cc9f5ac",
                    "resource_name": "sunflower_lily_VA_DR_AWS_4_1_202407040959-release_4_1_en",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "me-central-1",
                    "last_used": 0,
                    "saving": 5.140996092,
                    "snapshots": [
                        {
                            "cloud_resource_id": "snap-017e5e174ce9d3b3a",
                            "resource_id": "10a6b09d-840e-4d93-b050-db091379e4d4",
                            "cost": 2.570498046
                        }
                    ],
                    "first_seen": 1735122751,
                    "detected_at": 1735737449
                },
                {
                    "cloud_resource_id": "ami-03c0d4d9fd012643f",
                    "resource_name": "sunflower_lily_VA_MGR_AWS_4_1_202401241136-release_4_1_en",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "me-central-1",
                    "last_used": 0,
                    "saving": 5.072675784,
                    "snapshots": [
                        {
                            "cloud_resource_id": "snap-0ad9c7fe4a98f3c65",
                            "resource_id": "3f11fd87-23f6-4507-b594-be7c8faae434",
                            "cost": 2.536337892
                        }
                    ],
                    "first_seen": 1730803684,
                    "detected_at": 1731409199
                }
            ],
            "cloud_accounts": [
                {
                    "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                },
                {
                    "id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "obsolete_ips": {
            "count": 50,
            "saving": 296.3103868548388,
            "options": {
                "days_threshold": 7,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "eip-gw80wgx89t7t7p3x2ah7y",
                    "resource_name": "aqa-obsolete-ip",
                    "resource_id": "a35328df-1949-437d-a879-5c84adffac9a",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "cost_not_active_ip": 90.17400000000004,
                    "saving": 8.426249999999998,
                    "region": "Germany (Frankfurt)",
                    "is_excluded": false,
                    "folder_id": null,
                    "zone_id": null,
                    "last_seen_active": 0,
                    "detected_at": 1720587158
                },
                {
                    "cloud_resource_id": "/subscriptions/7a26946b-0d60-4c01-adce-b6269d527407/resourcegroups/sunflower_env/providers/microsoft.network/publicipaddresses/lily-pypi-1",
                    "resource_name": "lily-pypi-1",
                    "resource_id": "2a06dc26-7713-4571-af4b-06e1acd2cafe",
                    "cloud_account_id": "beba6b9b-1fe9-4be0-b104-cc4b015f4750",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Dev environment",
                    "cost_not_active_ip": 75.10499999999999,
                    "saving": 7.200000000000002,
                    "region": "West US 2",
                    "is_excluded": false,
                    "folder_id": null,
                    "zone_id": null,
                    "last_seen_active": 0,
                    "detected_at": 1729740439
                },
                {
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/stop-not-deallocated-test_group/providers/microsoft.network/publicipaddresses/pip-stop-not-deallocated-test_group-vnet-germanywestcentral-default",
                    "resource_name": "pip-stop-not-deallocated-test_group-vnet-germanywestcentral-default",
                    "resource_id": "bd0c8f1c-be1e-475b-b754-1cba5c11fc89",
                    "cloud_account_id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Azure QA",
                    "cost_not_active_ip": 15.706856944444453,
                    "saving": 7.016129032258068,
                    "region": "Germany West Central",
                    "is_excluded": false,
                    "folder_id": null,
                    "zone_id": null,
                    "last_seen_active": 1729061227,
                    "detected_at": 1729675639
                }
            ],
            "cloud_accounts": [
                {
                    "id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
                {
                    "id": "beba6b9b-1fe9-4be0-b104-cc4b015f4750",
                    "name": "Dev environment",
                    "type": "azure_cnr"
                },
                {
                    "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                },
                {
                    "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "rightsizing_rds": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 9,
                "metric": {
                    "type": "avg",
                    "limit": 81
                },
                "excluded_flavor_regex": "",
                "excluded_pools": {},
                "recommended_flavor_cpu_min": 1,
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "s3_abandoned_buckets": {
            "count": 72,
            "saving": 34.82506341257143,
            "options": {
                "days_threshold": 7,
                "data_size_threshold": 1024,
                "tier_1_request_quantity_threshold": 100,
                "tier_2_request_quantity_threshold": 2000,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "sunflower-ap-south-1",
                    "resource_name": "sunflower-ap-south-1",
                    "resource_id": "66d67637-ebf3-4d18-9daf-a2d9fa749379",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "ap-south-1",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 2.2596180557142858,
                    "tier_1_request_quantity": 0,
                    "tier_2_request_quantity": 0,
                    "avg_data_size": 4.652320621714284,
                    "detected_at": 1700030191
                },
                {
                    "cloud_resource_id": "aarmstrong-1",
                    "resource_name": "aarmstrong-1",
                    "resource_id": "f5b1a401-b532-41ad-8612-9f76c7ed990b",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 1.9696739751428574,
                    "tier_1_request_quantity": 0,
                    "tier_2_request_quantity": 0,
                    "avg_data_size": 2.2393943771428573,
                    "detected_at": 1739997296
                },
                {
                    "cloud_resource_id": "sunflower-us-east-1",
                    "resource_name": "sunflower-us-east-1",
                    "resource_id": "cc2d6dcf-b04b-4f51-9a61-c104e9b3f63f",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-east-1",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "saving": 1.8601972739999995,
                    "tier_1_request_quantity": 0,
                    "tier_2_request_quantity": 3,
                    "avg_data_size": 4.806508704914282,
                    "detected_at": 1710287980
                }
            ],
            "cloud_accounts": [
                {
                    "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "s3_abandoned_buckets_nebius": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 7,
                "data_size_threshold": 1024,
                "get_request_quantity_threshold": 100,
                "post_request_quantity_threshold": 100,
                "put_request_quantity_threshold": 100,
                "head_request_quantity_threshold": 100,
                "options_request_quantity_threshold": 100,
                "delete_request_quantity_threshold": 100,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
        },
        "s3_public_buckets": {
            "count": 3,
            "options": {
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "sunflower-eu-fra",
                    "resource_name": "sunflower-eu-fra",
                    "resource_id": "ae385f3a-d3ad-4542-b206-21e7abcc9ef3",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "is_public_policy": false,
                    "is_public_acls": true,
                    "detected_at": 1729686439
                },
                {
                    "cloud_resource_id": "sunflower-static-files",
                    "resource_name": "sunflower-static-files",
                    "resource_id": "205eea2e-9db4-4589-9fe5-bdf7dfefbd0a",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-east-1",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "is_public_policy": true,
                    "is_public_acls": false,
                    "detected_at": 1729686439
                },
                {
                    "cloud_resource_id": "ds-report-bucket",
                    "resource_name": "ds-report-bucket",
                    "resource_id": "41212b41-436c-4c26-a74f-678ebe8771de",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "region": "us-west-2",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "349414ea-b340-48fa-b57e-6cea84c1c3e5",
                        "name": "AWS HQ",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "is_public_policy": true,
                    "is_public_acls": true,
                    "detected_at": 1729686439
                }
            ],
            "cloud_accounts": [
                {
                    "id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "name": "AWS HQ",
                    "type": "aws_cnr"
                }
            ],
            "limit": 3
        },
        "short_living_instances": {
            "count": 5,
            "saving": 0.03899418623999999,
            "options": {
                "days_threshold": 3,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/aqa/providers/microsoft.compute/virtualmachines/aqa-power-schedule-instance-1726452362",
                    "resource_name": "aqa-power-schedule-instance-1726452362",
                    "resource_id": null,
                    "cloud_account_id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Azure QA",
                    "total_cost": 0.007600152,
                    "saving": 0.010944218879999999,
                    "region": "Germany West Central",
                    "is_excluded": false,
                    "first_seen": 1740268800,
                    "last_seen": 1740355200,
                    "detected_at": 1740375369
                },
                {
                    "cloud_resource_id": "/subscriptions/318bd278-e4ef-4230-9ab4-2ad6a29f578c/resourcegroups/aqa/providers/microsoft.compute/virtualmachines/aqa-power-schedule-instance-1726538731",
                    "resource_name": "aqa-power-schedule-instance-1726538731",
                    "resource_id": null,
                    "cloud_account_id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Azure QA",
                    "total_cost": 0.007200144,
                    "saving": 0.01036820736,
                    "region": "Germany West Central",
                    "is_excluded": false,
                    "first_seen": 1740355200,
                    "last_seen": 0,
                    "detected_at": 1740483798
                },
                {
                    "cloud_resource_id": "i-gw836x0o3ntvox94ug9i",
                    "resource_name": "aqa-power-schedule-instance-1726538739",
                    "resource_id": null,
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "total_cost": 0.004246,
                    "saving": 0.006114239999999999,
                    "region": "Germany (Frankfurt)",
                    "is_excluded": false,
                    "first_seen": 1740355200,
                    "last_seen": 0,
                    "detected_at": 1740386359
                }
            ],
            "cloud_accounts": [
                {
                    "id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "name": "Ali dev",
                    "type": "alibaba_cnr"
                },
                {
                    "id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "name": "Azure QA",
                    "type": "azure_cnr"
                }
            ],
            "limit": 3
        },
    },
    "dismissed_optimizations": {
        "obsolete_snapshot_chains": {
            "count": 1,
            "saving": 0.21382213999999997
        },
        "s3_abandoned_buckets": {
            "count": 1,
            "saving": 95.73797784771432
        },
        "volumes_not_attached_for_a_long_time": {
            "count": 1,
            "saving": 29.497668863999998
        }
    },
    "excluded_optimizations": {
        "instance_migration": {
            "count": 1,
            "saving": 12.671999999999997
        },
        "rightsizing_instances": {
            "count": 7,
            "saving": 900.5599999999998
        },
        "volumes_not_attached_for_a_long_time": {
            "count": 6,
            "saving": 17.693025445161286
        }
    },
    "deleted_at": 0,
    "id": "f3bf6d2b-6141-44b6-bd5b-8e4bae36e79d",
    "created_at": 1694581818,
    "organization_id": "77fe9add-bafc-4199-980a-da275af7c2c7",
    "last_run": 1740483798,
    "next_run": 1740494598,
    "last_completed": 1740483798
}
