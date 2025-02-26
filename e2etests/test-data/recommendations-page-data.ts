export const GeminisResponse = {
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

export const OptionsResponse = {
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
            "name": "recommendation_volumes_not_attached_for_a_long_time",
            "value": "{\"days_threshold\": 10, \"excluded_pools\": {\"bbf504b7-a1a4-483a-bc6a-a27c6bdcc0dc\": true, \"cd7714e5-9bdd-4408-b380-1fc2bec648a9\": true, \"54704172-af6c-4c91-bf78-5e59ad3ace11\": true, \"cbefe6bf-5515-4f26-9a6d-75b2259ba158\": true, \"f6fafb13-747b-4cb3-bee6-0cb91bc56fbb\": true}, \"skip_cloud_accounts\": []}"
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
            "name": "recommendation_s3_abandoned_buckets_nebius",
            "value": "{\"days_threshold\": 7, \"data_size_threshold\": 1024, \"get_request_quantity_threshold\": 100, \"post_request_quantity_threshold\": 100, \"put_request_quantity_threshold\": 100, \"head_request_quantity_threshold\": 100, \"options_request_quantity_threshold\": 100, \"delete_request_quantity_threshold\": 100, \"excluded_pools\": {}, \"skip_cloud_accounts\": []}"
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

export const RIBreakdownResponse = {
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
        "1738195200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 124.710001,
                "cost_without_offer": 8.4962640384,
                "cost_with_offer": 6.690219031200001,
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
                "cost_without_offer": 15.184239636999997,
                "cost_with_offer": 14.496782180799999,
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
        "1738022400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 101.54162389250001,
                "cost_without_offer": 6.7769145174,
                "cost_with_offer": 5.26198699,
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
                "cost_without_offer": 14.996799999999999,
                "cost_with_offer": 13.8288649046,
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
        "1740009600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 107.13388900000001,
                "cost_without_offer": 13.8956642272,
                "cost_with_offer": 12.0874731874,
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
                "cost_with_offer": 14.0017173936,
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
        "1739836800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 144.8985488316,
                "cost_without_offer": 41.483617688399995,
                "cost_with_offer": 38.336381590399995,
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
        "1738540800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.76472299999999,
                "cost_without_offer": 6.2803777792,
                "cost_with_offer": 4.8252263072,
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
                "cost_with_offer": 13.5720088732,
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
        "1739145600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 111.69828975949999,
                "cost_without_offer": 7.259112218399999,
                "cost_with_offer": 5.6641152009999995,
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
                "cost_with_offer": 14.0062837498,
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
        "1739232000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 99.2596798925,
                "cost_without_offer": 6.566449797400001,
                "cost_with_offer": 5.085154053399999,
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
                "cost_with_offer": 13.8001552474,
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
        "1739923200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 144.9038258316,
                "cost_without_offer": 41.4845970994,
                "cost_with_offer": 38.337345779799996,
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
        "1738454400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.58277799999999,
                "cost_without_offer": 6.2839200023999995,
                "cost_with_offer": 4.8335166454,
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
                "cost_with_offer": 13.5682335588,
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
        "1739664000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 136.9743818316,
                "cost_without_offer": 35.2172644946,
                "cost_with_offer": 32.3235366428,
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
                "cost_with_offer": 14.702183824399999,
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
        "1739577600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.32555500000001,
                "cost_without_offer": 6.0995265951999995,
                "cost_with_offer": 4.6782132814,
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
                "cost_with_offer": 13.6972335038,
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
        "1738108800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 99.428611,
                "cost_without_offer": 6.206447995199999,
                "cost_with_offer": 4.766953829399999,
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
                "cost_with_offer": 13.8346787782,
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
        "1738800000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.636111,
                "cost_without_offer": 6.1419479976,
                "cost_with_offer": 4.714087553599999,
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
                "cost_with_offer": 13.5279243218,
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
        "1738972800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.27888899999999,
                "cost_without_offer": 6.0973920048,
                "cost_with_offer": 4.676480670599999,
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
                "cost_with_offer": 13.3289336444,
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
        "1738368000": [
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
                "total_usage_hrs": 176.7685325265,
                "cost_without_offer": 15.184239637000001,
                "cost_with_offer": 13.791799697199998,
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
        "1738886400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.39222199999999,
                "cost_without_offer": 6.102851975999999,
                "cost_with_offer": 4.6821481469999995,
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
                "total_usage_hrs": 172.00000000000003,
                "cost_without_offer": 14.788,
                "cost_with_offer": 13.5150229276,
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
        "1739059200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.550834,
                "cost_without_offer": 6.094344016799999,
                "cost_with_offer": 4.6751474025999995,
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
                "cost_with_offer": 13.6959950928,
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
        "1740182400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.326389,
                "cost_without_offer": 6.099681385599999,
                "cost_with_offer": 4.6783235362,
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
                "cost_with_offer": 13.6972780394,
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
        "1740268800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 85.126667,
                "cost_without_offer": 5.453367973600001,
                "cost_with_offer": 4.1776584228,
                "ri_usage_hrs": 22.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 1.9999995877
                },
                "ri_overprovision": 0.0383999921,
                "ri_cost_without_offer": 0.5896,
                "ri_cost_with_offer": 0.4224,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 148.0,
                "cost_without_offer": 12.6192,
                "cost_with_offer": 11.519393039,
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
        "1740355200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 16.328056,
                "cost_without_offer": 1.0058860096,
                "cost_with_offer": 0.7591737855999999,
                "ri_usage_hrs": 5.0,
                "ri_overprovision_hrs": {
                    "t2.micro": 18.9999995877
                },
                "ri_overprovision": 0.3647999921,
                "ri_cost_without_offer": 0.134,
                "ri_cost_with_offer": 0.096,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 29.0,
                "cost_without_offer": 2.324,
                "cost_with_offer": 2.0352571872,
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
        "1738713600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.932222,
                "cost_without_offer": 6.2640715944,
                "cost_with_offer": 4.8126080274,
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
                "cost_without_offer": 15.184239637,
                "cost_with_offer": 13.853120035199998,
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

export const SPBreakdownResponse = {
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
        "1738195200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 124.710001,
                "cost_without_offer": 8.4962640384,
                "cost_with_offer": 6.690219031200001,
                "sp_usage_hrs": 98.1364021112,
                "sp_overprovision_hrs": {
                    "t2.micro": 151.1694114533,
                    "t2.large": 18.9819375207,
                    "t3.micro": 142.5802388936,
                    "t3.small": 70.8873510886,
                    "t2.xlarge": 9.4909687604,
                    "t3.large": 17.746904446,
                    "c5d.2xlarge": 4.4971542373,
                    "t3.medium": 35.4436755443,
                    "t2.medium": 37.9065268301,
                    "c5.2xlarge": 5.1004311415
                },
                "sp_overprovision": 1.2547060955,
                "sp_cost_without_offer": 7.568938721,
                "sp_cost_with_offer": 5.9452937138,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.7685325265,
                "cost_without_offer": 15.184239636999997,
                "cost_with_offer": 14.496782180799999,
                "sp_usage_hrs": 18.2595029218,
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
                "sp_cost_without_offer": 2.4113637424,
                "sp_cost_with_offer": 1.7239062862,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738022400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 101.54162389250001,
                "cost_without_offer": 6.7769145174,
                "cost_with_offer": 5.26198699,
                "sp_usage_hrs": 75.99043026780001,
                "sp_overprovision_hrs": {
                    "t2.micro": 309.6463416395,
                    "t2.large": 38.8814605681,
                    "t3.micro": 292.0527965217,
                    "t3.small": 145.2013917502,
                    "t2.xlarge": 19.4407302841,
                    "t3.large": 36.3516930066,
                    "c5d.2xlarge": 9.2117005946,
                    "t3.medium": 72.6006958751,
                    "t2.medium": 77.6454525049,
                    "c5.2xlarge": 10.4474167662
                },
                "sp_overprovision": 2.5700645955,
                "sp_cost_without_offer": 5.9624627411999995,
                "sp_cost_with_offer": 4.6299352138,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 174.0,
                "cost_without_offer": 14.996799999999999,
                "cost_with_offer": 13.8288649046,
                "sp_usage_hrs": 25.4407321203,
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
                "sp_cost_without_offer": 4.0705998816,
                "sp_cost_with_offer": 2.9026647862000003,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740009600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 107.13388900000001,
                "cost_without_offer": 13.8956642272,
                "cost_with_offer": 12.0874731874,
                "sp_usage_hrs": 69.0112863848,
                "sp_overprovision_hrs": {
                    "t2.micro": 268.5288394792,
                    "t2.large": 33.7184461096,
                    "t3.micro": 253.2715164707,
                    "t3.small": 125.9203031788,
                    "t2.xlarge": 16.8592230548,
                    "t3.large": 31.5246028243,
                    "c5d.2xlarge": 7.9884918297,
                    "t3.medium": 62.9601515894,
                    "t2.medium": 67.3350220823,
                    "c5.2xlarge": 9.060118989
                },
                "sp_overprovision": 2.2287893329,
                "sp_cost_without_offer": 6.5970015162,
                "sp_cost_with_offer": 4.9712104764000005,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 14.0017173936,
                "sp_usage_hrs": 24.8592248389,
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
                "sp_cost_without_offer": 3.63627213,
                "sp_cost_with_offer": 2.5963895236,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739836800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 144.8985488316,
                "cost_without_offer": 41.483617688399995,
                "cost_with_offer": 38.336381590399995,
                "sp_usage_hrs": 59.4773994341,
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
                "sp_cost_without_offer": 10.632436098,
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
        "1738540800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.76472299999999,
                "cost_without_offer": 6.2803777792,
                "cost_with_offer": 4.8252263072,
                "sp_usage_hrs": 73.7466016746,
                "sp_overprovision_hrs": {
                    "t2.micro": 341.8764025043,
                    "t2.large": 42.9285028616,
                    "t3.micro": 322.4516036183,
                    "t3.small": 160.3149231066,
                    "t2.xlarge": 21.4642514308,
                    "t3.large": 40.1354201837,
                    "c5d.2xlarge": 10.170515962,
                    "t3.medium": 80.1574615533,
                    "t2.medium": 85.7273101715,
                    "c5.2xlarge": 11.5348537321
                },
                "sp_overprovision": 2.8375740965,
                "sp_cost_without_offer": 5.6351771848,
                "sp_cost_with_offer": 4.3624257127999995,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.0,
                "cost_without_offer": 14.788,
                "cost_with_offer": 13.5720088732,
                "sp_usage_hrs": 25.4642533081,
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
                "sp_cost_without_offer": 4.237365414,
                "sp_cost_with_offer": 3.0213742872,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739145600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 111.69828975949999,
                "cost_without_offer": 7.259112218399999,
                "cost_with_offer": 5.6641152009999995,
                "sp_usage_hrs": 85.69828975949999,
                "sp_overprovision_hrs": {
                    "t2.micro": 267.1668244459,
                    "t2.large": 33.5474215352,
                    "t3.micro": 251.9868886683,
                    "t3.small": 125.2816181636,
                    "t2.xlarge": 16.7737107676,
                    "t3.large": 31.3647057233,
                    "c5d.2xlarge": 7.9479731056,
                    "t3.medium": 62.6408090818,
                    "t2.medium": 66.9934896326,
                    "c5.2xlarge": 9.0141648253
                },
                "sp_overprovision": 2.2174846083,
                "sp_cost_without_offer": 6.3951122183999995,
                "sp_cost_with_offer": 4.982515200999999,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 14.0062837498,
                "sp_usage_hrs": 24.7737125495,
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
                "sp_cost_without_offer": 3.6204010492,
                "sp_cost_with_offer": 2.585084799,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739232000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 99.2596798925,
                "cost_without_offer": 6.566449797400001,
                "cost_with_offer": 5.085154053399999,
                "sp_usage_hrs": 73.8815820791,
                "sp_overprovision_hrs": {
                    "t2.micro": 328.6491321773,
                    "t2.large": 41.2675900056,
                    "t3.micro": 309.9758828689,
                    "t3.small": 154.1123048216,
                    "t2.xlarge": 20.6337950028,
                    "t3.large": 38.5825722873,
                    "c5d.2xlarge": 9.7770165482,
                    "t3.medium": 77.0561524108,
                    "t2.medium": 82.4105024078,
                    "c5.2xlarge": 11.0885678013
                },
                "sp_overprovision": 2.7277877545,
                "sp_cost_without_offer": 5.7711077988,
                "sp_cost_with_offer": 4.472212054799999,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.8001552474,
                "sp_usage_hrs": 28.6337968633,
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
                "sp_cost_without_offer": 4.3368326978,
                "sp_cost_with_offer": 3.0953879451999997,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739923200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 144.9038258316,
                "cost_without_offer": 41.4845970994,
                "cost_with_offer": 38.337345779799996,
                "sp_usage_hrs": 59.481258508500005,
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
                "sp_cost_without_offer": 10.6324513196,
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
        "1738454400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.58277799999999,
                "cost_without_offer": 6.2839200023999995,
                "cost_with_offer": 4.8335166454,
                "sp_usage_hrs": 73.4049038134,
                "sp_overprovision_hrs": {
                    "t2.micro": 343.0024721123,
                    "t2.large": 43.0699004018,
                    "t3.micro": 323.5136919877,
                    "t3.small": 160.8429670467,
                    "t2.xlarge": 21.5349502009,
                    "t3.large": 40.2676178918,
                    "c5d.2xlarge": 10.2040155216,
                    "t3.medium": 80.4214835234,
                    "t2.medium": 86.0096780619,
                    "c5.2xlarge": 11.5728471359
                },
                "sp_overprovision": 2.8469204741,
                "sp_cost_without_offer": 5.6210826922,
                "sp_cost_with_offer": 4.3530793351999995,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.0,
                "cost_without_offer": 14.788,
                "cost_with_offer": 13.5682335588,
                "sp_usage_hrs": 25.5349520796,
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
                "sp_cost_without_offer": 4.2504871060000005,
                "sp_cost_with_offer": 3.0307206648,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739664000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 136.9743818316,
                "cost_without_offer": 35.2172644946,
                "cost_with_offer": 32.3235366428,
                "sp_usage_hrs": 62.37171618050001,
                "sp_overprovision_hrs": {
                    "t2.micro": 3.2621457455,
                    "t2.large": 0.4096188914,
                    "t3.micro": 3.0767965241,
                    "t3.small": 1.5297067611,
                    "t2.xlarge": 0.2048094457,
                    "t3.large": 0.3829676141,
                    "c5d.2xlarge": 0.0970459065,
                    "t3.medium": 0.7648533805,
                    "t2.medium": 0.8180002425,
                    "c5.2xlarge": 0.1100642623
                },
                "sp_overprovision": 0.0270758093,
                "sp_cost_without_offer": 9.8842518518,
                "sp_cost_with_offer": 7.172924,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 14.702183824399999,
                "sp_usage_hrs": 11.7418759457,
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
                "sp_cost_without_offer": 1.2016921755999999,
                "sp_cost_with_offer": 0.862276,
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
                "sp_usage_hrs": 74.6830026269,
                "sp_overprovision_hrs": {
                    "t2.micro": 337.9127517918,
                    "t2.large": 42.4307978731,
                    "t3.micro": 318.7131603707,
                    "t3.small": 158.4562620392,
                    "t2.xlarge": 21.2153989366,
                    "t3.large": 39.6700976705,
                    "c5d.2xlarge": 10.0526009128,
                    "t3.medium": 79.2281310196,
                    "t2.medium": 84.7334038605,
                    "c5.2xlarge": 11.4011208073
                },
                "sp_overprovision": 2.8046757961,
                "sp_cost_without_offer": 5.674567876399999,
                "sp_cost_with_offer": 4.395324013199999,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 174.0,
                "cost_without_offer": 14.9968,
                "cost_with_offer": 13.7340975966,
                "sp_usage_hrs": 27.2154008088,
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
                "sp_cost_without_offer": 4.3999783902,
                "sp_cost_with_offer": 3.1372759868,
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
        "1739577600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.32555500000001,
                "cost_without_offer": 6.0995265951999995,
                "cost_with_offer": 4.6782132814,
                "sp_usage_hrs": 72.32555500000001,
                "sp_overprovision_hrs": {
                    "t2.micro": 359.3477800543,
                    "t2.large": 45.1223368778,
                    "t3.micro": 338.9302890939,
                    "t3.small": 168.5077159639,
                    "t2.xlarge": 22.5611684389,
                    "t3.large": 42.1865154743,
                    "c5d.2xlarge": 10.6902737544,
                    "t3.medium": 84.2538579819,
                    "t2.medium": 90.1083501947,
                    "c5.2xlarge": 12.1243351442
                },
                "sp_overprovision": 2.9825865279,
                "sp_cost_without_offer": 5.4563265952,
                "sp_cost_with_offer": 4.2174132814,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.6972335038,
                "sp_usage_hrs": 30.5611703384,
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
                "sp_cost_without_offer": 4.6945532148,
                "sp_cost_with_offer": 3.3501867186,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738108800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 99.428611,
                "cost_without_offer": 6.206447995199999,
                "cost_with_offer": 4.766953829399999,
                "sp_usage_hrs": 75.42861099999999,
                "sp_overprovision_hrs": {
                    "t2.micro": 348.6561475982,
                    "t2.large": 43.779817268,
                    "t3.micro": 328.8461358575,
                    "t3.small": 163.4941256062,
                    "t2.xlarge": 21.889908634,
                    "t3.large": 40.9313450153,
                    "c5d.2xlarge": 10.3722072902,
                    "t3.medium": 81.7470628031,
                    "t2.medium": 87.4273669941,
                    "c5.2xlarge": 11.7636012192
                },
                "sp_overprovision": 2.8938459799,
                "sp_cost_without_offer": 5.5632479951999985,
                "sp_cost_with_offer": 4.3061538293999995,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.7685325265,
                "cost_without_offer": 15.184239637000001,
                "cost_with_offer": 13.8346787782,
                "sp_usage_hrs": 30.6584430463,
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
                "sp_cost_without_offer": 4.7126070294,
                "sp_cost_with_offer": 3.3630461705999997,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738800000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.636111,
                "cost_without_offer": 6.1419479976,
                "cost_with_offer": 4.714087553599999,
                "sp_usage_hrs": 72.636111,
                "sp_overprovision_hrs": {
                    "t2.micro": 355.025578517,
                    "t2.large": 44.579609624,
                    "t3.micro": 334.8536672309,
                    "t3.small": 166.4809208939,
                    "t2.xlarge": 22.289804812,
                    "t3.large": 41.6791000062,
                    "c5d.2xlarge": 10.5616921401,
                    "t3.medium": 83.240460447,
                    "t2.medium": 89.0245353742,
                    "c5.2xlarge": 11.9785047735
                },
                "sp_overprovision": 2.9467122557,
                "sp_cost_without_offer": 5.4987479976,
                "sp_cost_with_offer": 4.2532875536,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.0,
                "cost_without_offer": 14.788,
                "cost_with_offer": 13.5279243218,
                "sp_usage_hrs": 26.289806706,
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
                "sp_cost_without_offer": 4.390588124600001,
                "sp_cost_with_offer": 3.1305124464,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738972800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.27888899999999,
                "cost_without_offer": 6.0973920048,
                "cost_with_offer": 4.676480670599999,
                "sp_usage_hrs": 72.27888899999999,
                "sp_overprovision_hrs": {
                    "t2.micro": 359.5565283468,
                    "t2.large": 45.1485488409,
                    "t3.micro": 339.1271766859,
                    "t3.small": 168.6056035811,
                    "t2.xlarge": 22.5742744205,
                    "t3.large": 42.211021993,
                    "c5d.2xlarge": 10.6964838287,
                    "t3.medium": 84.3028017906,
                    "t2.medium": 90.1606949295,
                    "c5.2xlarge": 12.1313782774
                },
                "sp_overprovision": 2.9843191387,
                "sp_cost_without_offer": 5.4541920048,
                "sp_cost_with_offer": 4.2156806706,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 168.0,
                "cost_without_offer": 14.5344,
                "cost_with_offer": 13.3289336444,
                "sp_usage_hrs": 22.5742763203,
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
                "sp_cost_without_offer": 4.189785685,
                "sp_cost_with_offer": 2.9843193294,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738368000": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.0,
                "cost_without_offer": 6.0767999999999995,
                "cost_with_offer": 4.660799999999999,
                "sp_usage_hrs": 72.0,
                "sp_overprovision_hrs": {
                    "t2.micro": 361.445765798,
                    "t2.large": 45.3857753203,
                    "t3.micro": 340.9090710819,
                    "t3.small": 169.4915171876,
                    "t2.xlarge": 22.6928876601,
                    "t3.large": 42.432813665,
                    "c5d.2xlarge": 10.7526869463,
                    "t3.medium": 84.7457585938,
                    "t2.medium": 90.6344311797,
                    "c5.2xlarge": 12.195120839
                },
                "sp_overprovision": 2.9999998093,
                "sp_cost_without_offer": 5.433599999999999,
                "sp_cost_with_offer": 4.2,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.7685325265,
                "cost_without_offer": 15.184239637000001,
                "cost_with_offer": 13.791799697199998,
                "sp_usage_hrs": 31.4614220889,
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
                "sp_cost_without_offer": 4.861639939800001,
                "sp_cost_with_offer": 3.4692,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738886400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.39222199999999,
                "cost_without_offer": 6.102851975999999,
                "cost_with_offer": 4.6821481469999995,
                "sp_usage_hrs": 72.392222,
                "sp_overprovision_hrs": {
                    "t2.micro": 358.8736998542,
                    "t2.large": 45.0628078986,
                    "t3.micro": 338.4831452733,
                    "t3.small": 168.2854071696,
                    "t2.xlarge": 22.5314039493,
                    "t3.large": 42.1308596645,
                    "c5d.2xlarge": 10.6761702942,
                    "t3.medium": 84.1427035848,
                    "t2.medium": 89.9894720853,
                    "c5.2xlarge": 12.1083397561
                },
                "sp_overprovision": 2.9786516623,
                "sp_cost_without_offer": 5.459651975999999,
                "sp_cost_with_offer": 4.221348147,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 172.00000000000003,
                "cost_without_offer": 14.788,
                "cost_with_offer": 13.5150229276,
                "sp_usage_hrs": 26.5314058483,
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
                "sp_cost_without_offer": 4.4354289254,
                "sp_cost_with_offer": 3.1624518530000003,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1739059200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.550834,
                "cost_without_offer": 6.094344016799999,
                "cost_with_offer": 4.6751474025999995,
                "sp_usage_hrs": 72.550834,
                "sp_overprovision_hrs": {
                    "t2.micro": 359.7171630481,
                    "t2.large": 45.1687193095,
                    "t3.micro": 339.278684414,
                    "t3.small": 168.680929458,
                    "t2.xlarge": 22.5843596548,
                    "t3.large": 42.2298800984,
                    "c5d.2xlarge": 10.7012625668,
                    "t3.medium": 84.340464729,
                    "t2.medium": 90.2009749276,
                    "c5.2xlarge": 12.1367980658
                },
                "sp_overprovision": 2.9856524067,
                "sp_cost_without_offer": 5.451144016799999,
                "sp_cost_with_offer": 4.2143474026000005,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.6959950928,
                "sp_usage_hrs": 30.5843615548,
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
                "sp_cost_without_offer": 4.6988575046,
                "sp_cost_with_offer": 3.3532525974,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740182400": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 96.326389,
                "cost_without_offer": 6.099681385599999,
                "cost_with_offer": 4.6783235362,
                "sp_usage_hrs": 72.326389,
                "sp_overprovision_hrs": {
                    "t2.micro": 359.3344963433,
                    "t2.large": 45.1206688778,
                    "t3.micro": 338.9177601393,
                    "t3.small": 168.501486879,
                    "t2.xlarge": 22.5603344389,
                    "t3.large": 42.1849560004,
                    "c5d.2xlarge": 10.689878576,
                    "t3.medium": 84.2507434395,
                    "t2.medium": 90.1050192341,
                    "c5.2xlarge": 12.123886954
                },
                "sp_overprovision": 2.9824762731,
                "sp_cost_without_offer": 5.4564813856,
                "sp_cost_with_offer": 4.2175235362,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.6972780394,
                "sp_usage_hrs": 30.5603363384,
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
                "sp_cost_without_offer": 4.6943984244,
                "sp_cost_with_offer": 3.3500764638,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740268800": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 85.126667,
                "cost_without_offer": 5.453367973600001,
                "cost_with_offer": 4.1776584228,
                "sp_usage_hrs": 63.126667,
                "sp_overprovision_hrs": {
                    "t2.micro": 415.0290891891,
                    "t2.large": 52.1140895142,
                    "t3.micro": 391.4478869467,
                    "t3.small": 194.6181603438,
                    "t2.xlarge": 26.0570447571,
                    "t3.large": 48.7233595564,
                    "c5d.2xlarge": 12.3467426982,
                    "t3.medium": 97.3090801719,
                    "t2.medium": 104.0707319911,
                    "c5.2xlarge": 14.0030133793
                },
                "sp_overprovision": 3.4447413865,
                "sp_cost_without_offer": 4.863767973600001,
                "sp_cost_with_offer": 3.7552584228,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 148.0,
                "cost_without_offer": 12.6192,
                "cost_with_offer": 11.519393039,
                "sp_usage_hrs": 25.9814037618,
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
                "sp_cost_without_offer": 3.8445485381999998,
                "sp_cost_with_offer": 2.7447415772,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1740355200": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 16.328056,
                "cost_without_offer": 1.0058860096,
                "cost_with_offer": 0.7591737855999999,
                "sp_usage_hrs": 11.328056,
                "sp_overprovision_hrs": {
                    "t2.micro": 787.5694127429,
                    "t2.large": 98.8929786933,
                    "t3.micro": 742.8211430779,
                    "t3.small": 369.3122102611,
                    "t2.xlarge": 49.4464893467,
                    "t3.large": 92.4586460859,
                    "c5d.2xlarge": 23.4294827745,
                    "t3.medium": 184.6561051306,
                    "t2.medium": 197.4871820144,
                    "c5.2xlarge": 26.5724627769
                },
                "sp_overprovision": 6.5368260237,
                "sp_cost_without_offer": 0.8718860096000001,
                "sp_cost_with_offer": 0.6631737856,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 29.0,
                "cost_without_offer": 2.324,
                "cost_with_offer": 2.0352571872,
                "sp_usage_hrs": 10.7929365689,
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
                "sp_cost_without_offer": 1.0255690272,
                "sp_cost_with_offer": 0.7368262144,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ],
        "1738713600": [
            {
                "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                "total_usage_hrs": 97.932222,
                "cost_without_offer": 6.2640715944,
                "cost_with_offer": 4.8126080274,
                "sp_usage_hrs": 73.932222,
                "sp_overprovision_hrs": {
                    "t2.micro": 343.1556417291,
                    "t2.large": 43.0891334998,
                    "t3.micro": 323.6581587839,
                    "t3.small": 160.9147923472,
                    "t2.xlarge": 21.5445667499,
                    "t3.large": 40.2855996153,
                    "c5d.2xlarge": 10.2085721802,
                    "t3.medium": 80.4573961736,
                    "t2.medium": 86.0480861508,
                    "c5.2xlarge": 11.5780150536
                },
                "sp_overprovision": 2.8481917819,
                "sp_cost_without_offer": 5.6208715944,
                "sp_cost_with_offer": 4.351808027400001,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.7685325265,
                "cost_without_offer": 15.184239637,
                "cost_with_offer": 13.853120035199998,
                "sp_usage_hrs": 30.3131011552,
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
                "sp_cost_without_offer": 4.6485115744000005,
                "sp_cost_with_offer": 3.3173919726,
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
                "sp_usage_hrs": 72.0,
                "sp_overprovision_hrs": {
                    "t2.micro": 361.445765798,
                    "t2.large": 45.3857753203,
                    "t3.micro": 340.9090710819,
                    "t3.small": 169.4915171876,
                    "t2.xlarge": 22.6928876601,
                    "t3.large": 42.432813665,
                    "c5d.2xlarge": 10.7526869463,
                    "t3.medium": 84.7457585938,
                    "t2.medium": 90.6344311797,
                    "c5.2xlarge": 12.195120839
                },
                "sp_overprovision": 2.9999998093,
                "sp_cost_without_offer": 5.433599999999999,
                "sp_cost_with_offer": 4.2,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 176.0,
                "cost_without_offer": 15.041599999999999,
                "cost_with_offer": 13.690199697199999,
                "sp_usage_hrs": 30.6928895624,
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
                "sp_cost_without_offer": 4.7190003028000005,
                "sp_cost_with_offer": 3.3676,
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
                "sp_cost_with_offer": 0,
                "sp_cost_without_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 0,
                "cost_without_offer": 0,
                "cost_with_offer": 0,
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
                "sp_cost_with_offer": 0,
                "sp_cost_without_offer": 0,
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
                "sp_cost_with_offer": 0,
                "sp_cost_without_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS HQ"
            },
            {
                "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                "total_usage_hrs": 0,
                "cost_without_offer": 0,
                "cost_with_offer": 0,
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
                "sp_cost_with_offer": 0,
                "sp_cost_without_offer": 0,
                "cloud_account_type": "aws_cnr",
                "cloud_account_name": "AWS Marketing"
            }
        ]
    }
}

export const SummaryExpensesResponse = {
    "start_date": 1738022400,
    "end_date": 1740614399,
    "total_count": 787,
    "total_cost": 5862.251871638755,
    "total_saving": 3733.244514756799
}

export const OptimisationsResponse = {
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
        "abandoned_kinesis_streams": {
            "count": 1,
            "saving": 25.919999999999995,
            "options": {
                "days_threshold": 7,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "OMtest",
                    "resource_name": null,
                    "resource_id": "8e316252-ff26-43c0-832a-fb5adbc819fb",
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
                    "shardhours_capacity": 1,
                    "shardhours_price": 0.018000000000000002,
                    "saving": 25.919999999999995,
                    "detected_at": 1730140506
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
        "inactive_console_users": {
            "count": 3,
            "options": {
                "days_threshold": 91,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "om-fill-user",
                    "user_id": "AIDAQUWY5LJ4RTVWKO6GP",
                    "last_used": 1663918452,
                    "detected_at": 1736688490
                },
                {
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "aqa-user",
                    "user_id": "AIDAIKFDVXZELQ5NVB2EQ",
                    "last_used": 1652869334,
                    "detected_at": 1700028391
                },
                {
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "user_name": "pk-full",
                    "user_id": "AIDAIPPYCHRYQONGDLRJS",
                    "last_used": 1629370721,
                    "detected_at": 1700028391
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
        "instance_migration": {
            "count": 2,
            "saving": 3.168000000000001,
            "options": {
                "excluded_pools": {
                    "f6fafb13-747b-4cb3-bee6-0cb91bc56fbb": true
                },
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "saving": 1.7279999999999998,
                    "flavor": "t3.micro",
                    "current_region": "us-west-2",
                    "recommended_region": "eu-north-1",
                    "cloud_resource_id": "i-0c84e6b7499a93600",
                    "resource_name": "wg-frankfurt",
                    "resource_id": "45830f63-4e9a-4fcf-aac6-058340b3b45f",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "is_excluded": false,
                    "detected_at": 1731300881
                },
                {
                    "saving": 1.4400000000000013,
                    "flavor": "ecs.t6-c1m1.large",
                    "current_region": "Germany (Frankfurt)",
                    "recommended_region": "UK (London)",
                    "cloud_resource_id": "i-gw88picys2t778uzra24",
                    "resource_name": "aqa-instance-migration",
                    "resource_id": "6cae74bf-5943-4073-9e7e-65fcba448dd3",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "is_excluded": false,
                    "detected_at": 1739835049
                }
            ],
            "cloud_accounts": [
                {
                    "id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "name": "AWS Marketing",
                    "type": "aws_cnr"
                },
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
        "instances_for_shutdown": {
            "count": 11,
            "saving": 334.8967615019071,
            "options": {
                "days_threshold": 15,
                "cpu_percent_threshold": 6,
                "network_bps_threshold": 1001,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "resource_id": "993a1aba-9f5d-4296-9181-1d91eeae0f89",
                    "resource_name": "aqa-eu-underutilized-instance",
                    "cloud_resource_id": "i-gw8bwy1fbwc2spcyqhdy",
                    "region": "Germany (Frankfurt)",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "owner": {
                        "id": "c71e247c-bdef-47a1-8f74-29d9786fbb9d",
                        "name": "Lincoln Davies"
                    },
                    "pool": {
                        "id": "43ec75c7-79f3-4a07-92c8-423758ac4ad7",
                        "name": "Ali dev",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "inactivity_periods": [
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 23
                            }
                        }
                    ],
                    "saving": 77.75999999999999,
                    "detected_at": 1699860467
                },
                {
                    "resource_id": "e8ec7653-59b6-44b2-840c-92db63bbd57f",
                    "resource_name": "finops-practice",
                    "cloud_resource_id": "i-0e464cfbf9650bd21",
                    "region": "us-west-2",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "owner": {
                        "id": "d2477dcd-1a9b-4aec-bd55-d01ce1f778d4",
                        "name": "Edwin Gagnon"
                    },
                    "pool": {
                        "id": "45a3f65a-b62c-413a-baae-74793c518773",
                        "name": "AWS Marketing",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "inactivity_periods": [
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 3
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 7
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 7
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 9
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 10
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 16
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 19
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 21
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 9
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 11
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 11
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 15
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 15
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 17
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 18
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 1
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 4
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 6
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 6
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 11
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 11
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 13
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 16
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 18
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 19
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 21
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 22
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 2
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 5
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 7
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 11
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 11
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 13
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 13
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 17
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 18
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 20
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 21
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 23
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 3
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 6
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 10
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 10
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 12
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 12
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 15
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 15
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 18
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 18
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 20
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 23
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 1
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 3
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 6
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 13
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 17
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 17
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 19
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 20
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 23
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 3
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 5
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 13
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 16
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 18
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 6,
                                "hour": 20
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 23
                            }
                        }
                    ],
                    "saving": 75.79910126832856,
                    "detected_at": 1700030191
                },
                {
                    "resource_id": "8af63839-5307-4600-b93f-6ef4f9ab512a",
                    "resource_name": "orchidAiWebsite",
                    "cloud_resource_id": "i-0e44a71a514e20aa5",
                    "region": "us-west-2",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "owner": {
                        "id": "d2477dcd-1a9b-4aec-bd55-d01ce1f778d4",
                        "name": "Edwin Gagnon"
                    },
                    "pool": {
                        "id": "45a3f65a-b62c-413a-baae-74793c518773",
                        "name": "AWS Marketing",
                        "purpose": "budget"
                    },
                    "is_excluded": false,
                    "inactivity_periods": [
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 0
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 6
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 8
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 8
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 0,
                                "hour": 13
                            },
                            "end": {
                                "day_of_week": 0,
                                "hour": 23
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 1
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 1
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 3
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 5
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 7
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 11
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 13
                            },
                            "end": {
                                "day_of_week": 1,
                                "hour": 17
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 1,
                                "hour": 19
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 14
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 16
                            },
                            "end": {
                                "day_of_week": 2,
                                "hour": 17
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 2,
                                "hour": 19
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 8
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 10
                            },
                            "end": {
                                "day_of_week": 3,
                                "hour": 11
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 3,
                                "hour": 13
                            },
                            "end": {
                                "day_of_week": 4,
                                "hour": 20
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 4,
                                "hour": 22
                            },
                            "end": {
                                "day_of_week": 5,
                                "hour": 5
                            }
                        },
                        {
                            "start": {
                                "day_of_week": 5,
                                "hour": 7
                            },
                            "end": {
                                "day_of_week": 6,
                                "hour": 23
                            }
                        }
                    ],
                    "saving": 50.593826045657124,
                    "detected_at": 1732498958
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
        "nebius_migration": {
            "count": 0,
            "saving": 0,
            "options": {
                "days_threshold": 30,
                "skip_cloud_accounts": []
            },
            "items": [],
            "cloud_accounts": []
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
        "obsolete_snapshot_chains": {
            "count": 5,
            "saving": 5.4045958999999995,
            "options": {
                "days_threshold": 3,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "sl-gw87g3h09m06z68ctzcv",
                    "resource_name": null,
                    "resource_id": "a94af45e-9a32-4530-8647-4a394c874451",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "saving": 1.7895169499999999,
                    "region": "Germany (Frankfurt)",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": [
                        {
                            "cloud_resource_id": "s-gw8i2p03k4ni1kdqdkjd",
                            "name": "Controller_DR_Alibaba_4_2_2443-release_4_2_en",
                            "cloud_console_link": "https://ecs.console.aliyun.com/#/snapshot/region/eu-central-1?snapshotIds=s-gw8i2p03k4ni1kdqdkjd"
                        }
                    ],
                    "first_seen": 1739145600,
                    "last_seen": 1740182400,
                    "detected_at": 1739499501
                },
                {
                    "cloud_resource_id": "sl-gw8gr3nimaa9zrdwxhn7",
                    "resource_name": null,
                    "resource_id": "709ff3b7-4d4b-400b-a55f-0104de3348a5",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "saving": 1.7537632499999998,
                    "region": "Germany (Frankfurt)",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": [
                        {
                            "cloud_resource_id": "s-gw87g3h09m06z68h5d3p",
                            "name": "Controller_MGR_Alibaba_4_2_2443-release_4_2_en",
                            "cloud_console_link": "https://ecs.console.aliyun.com/#/snapshot/region/eu-central-1?snapshotIds=s-gw87g3h09m06z68h5d3p"
                        }
                    ],
                    "first_seen": 1739145600,
                    "last_seen": 1740182400,
                    "detected_at": 1739499501
                },
                {
                    "cloud_resource_id": "sl-gw84m857olspqve95jb9",
                    "resource_name": null,
                    "resource_id": "6bb86825-9d89-4220-8380-24cf44c68a74",
                    "cloud_account_id": "719306dd-072b-4a33-9275-24fc25e7ae17",
                    "cloud_type": "alibaba_cnr",
                    "cloud_account_name": "Ali dev",
                    "saving": 1.5216576799999997,
                    "region": "Germany (Frankfurt)",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": [
                        {
                            "cloud_resource_id": "s-gw8f5fd047rk6z0mpkx8",
                            "name": "sunflower_lily_VA_DR_Alibaba_3_9_om20221228-feature_cloud7_en",
                            "cloud_console_link": "https://ecs.console.aliyun.com/#/snapshot/region/eu-central-1?snapshotIds=s-gw8f5fd047rk6z0mpkx8"
                        }
                    ],
                    "first_seen": 1737590400,
                    "last_seen": 1740182400,
                    "detected_at": 1734849212
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
        "obsolete_snapshots": {
            "count": 53,
            "saving": 115.1070246418,
            "options": {
                "days_threshold": 4,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "snap-035cab587ba161af9",
                    "resource_name": null,
                    "resource_id": "607a7d2f-b5b9-46c0-a1da-ecb2d38b8b4a",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "saving": 9.817204302600002,
                    "region": "ap-southeast-3",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": null,
                    "first_seen": 1737504000,
                    "last_seen": 1740096000,
                    "detected_at": 1735227935
                },
                {
                    "cloud_resource_id": "snap-05ee454deeffe599a",
                    "resource_name": null,
                    "resource_id": "8f121e69-a9d9-4c0f-a8ad-b4f7dd4d536a",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "saving": 4.7266905040000005,
                    "region": "us-west-2",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": null,
                    "first_seen": 1737504000,
                    "last_seen": 1740096000,
                    "detected_at": 1700030191
                },
                {
                    "cloud_resource_id": "snap-04b96eca0fa400096",
                    "resource_name": null,
                    "resource_id": "6a648da6-b234-4073-93a2-d15fa7d3a167",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "saving": 4.502683762799999,
                    "region": "us-east-1",
                    "folder_id": null,
                    "last_used": 0,
                    "is_excluded": false,
                    "child_snapshots": null,
                    "first_seen": 1737504000,
                    "last_seen": 1740096000,
                    "detected_at": 1700030191
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
        "reserved_instances": {
            "count": 8,
            "saving": 139.35333333333332,
            "options": {
                "days_threshold": 90,
                "excluded_pools": {},
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "saving": 29.465333333333334,
                    "average_saving": 3.5279999999999987,
                    "flavor": "t2.large",
                    "region": "us-west-2",
                    "cloud_resource_id": "i-082b1a163698b8ede",
                    "resource_name": "sunflowerWebSite",
                    "resource_id": "6856279e-1d58-493b-bb7f-223d6ec9bef4",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "is_excluded": false,
                    "detected_at": 1705282508,
                    "cloud_account_name": "AWS Marketing"
                },
                {
                    "saving": 29.465333333333334,
                    "average_saving": 3.5279999999999987,
                    "flavor": "t2.large",
                    "region": "us-west-2",
                    "cloud_resource_id": "i-0e464cfbf9650bd21",
                    "resource_name": "finops-practice",
                    "resource_id": "e8ec7653-59b6-44b2-840c-92db63bbd57f",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "is_excluded": false,
                    "detected_at": 1700030191,
                    "cloud_account_name": "AWS Marketing"
                },
                {
                    "saving": 27.488,
                    "average_saving": 8.136,
                    "flavor": "t2.medium",
                    "region": "us-west-1",
                    "cloud_resource_id": "i-0436ee72bb653bf8a",
                    "resource_name": "aqa_us_instance_for_migration",
                    "resource_id": "7de60c8f-8535-4ac2-a388-92397b82c38b",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "is_excluded": false,
                    "detected_at": 1739235553,
                    "cloud_account_name": "AWS HQ"
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
        "rightsizing_instances": {
            "count": 19,
            "saving": 971.7,
            "options": {
                "days_threshold": 3,
                "metric": {
                    "type": "avg",
                    "limit": 80
                },
                "excluded_flavor_regex": "",
                "excluded_pools": {
                    "3a248797-84f6-46b8-b6b9-9aa612105d1e": true,
                    "9ef6f469-434d-4937-80b0-6eea3085deb6": true
                },
                "recommended_flavor_cpu_min": 1,
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "i-0e464cfbf9650bd21",
                    "resource_name": "finops-practice",
                    "resource_id": "e8ec7653-59b6-44b2-840c-92db63bbd57f",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "region": "us-west-2",
                    "flavor": "t2.large",
                    "recommended_flavor": "t2.small",
                    "saving": 100.52,
                    "saving_percent": 75.22,
                    "current_cost": 66.82,
                    "recommended_flavor_cost": 16.56,
                    "cpu": 2,
                    "recommended_flavor_cpu": 1,
                    "recommended_flavor_ram": 2048,
                    "cpu_usage": 0.56,
                    "is_excluded": false,
                    "cpu_peak": 3.45,
                    "cpu_quantile_50": 0.48,
                    "cpu_quantile_99": 2.05,
                    "project_cpu_avg": 1.11,
                    "project_cpu_peak": 6.9,
                    "projected_cpu_qtl_50": 0.95,
                    "projected_cpu_qtl_99": 4.09,
                    "detected_at": 1732455758
                },
                {
                    "cloud_resource_id": "i-082b1a163698b8ede",
                    "resource_name": "sunflowerWebSite",
                    "resource_id": "6856279e-1d58-493b-bb7f-223d6ec9bef4",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "region": "us-west-2",
                    "flavor": "t2.large",
                    "recommended_flavor": "t2.small",
                    "saving": 100.52,
                    "saving_percent": 75.22,
                    "current_cost": 66.82,
                    "recommended_flavor_cost": 16.56,
                    "cpu": 2,
                    "recommended_flavor_cpu": 1,
                    "recommended_flavor_ram": 2048,
                    "cpu_usage": 3.9,
                    "is_excluded": false,
                    "cpu_peak": 22.02,
                    "cpu_quantile_50": 2.82,
                    "cpu_quantile_99": 19.25,
                    "project_cpu_avg": 7.81,
                    "project_cpu_peak": 44.04,
                    "projected_cpu_qtl_50": 5.63,
                    "projected_cpu_qtl_99": 38.51,
                    "detected_at": 1732455758
                },
                {
                    "cloud_resource_id": "i-082b1a163698b8ede-x1",
                    "resource_name": "sunflowerWebSite-x1",
                    "resource_id": "89adc21a-eec6-4d8a-b216-7f99f00998d4",
                    "cloud_account_id": "402fc0bc-da7c-4eb1-b194-1c409471d0e5",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS Marketing",
                    "region": "us-west-2",
                    "flavor": "t2.large",
                    "recommended_flavor": "t2.small",
                    "saving": 100.52,
                    "saving_percent": 75.22,
                    "current_cost": 66.82,
                    "recommended_flavor_cost": 16.56,
                    "cpu": 2,
                    "recommended_flavor_cpu": 1,
                    "recommended_flavor_ram": 2048,
                    "cpu_usage": 3.9,
                    "is_excluded": false,
                    "cpu_peak": 22.02,
                    "cpu_quantile_50": 2.82,
                    "cpu_quantile_99": 19.25,
                    "project_cpu_avg": 7.81,
                    "project_cpu_peak": 44.04,
                    "projected_cpu_qtl_50": 5.63,
                    "projected_cpu_qtl_99": 38.51,
                    "detected_at": 1732455758
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
                },
                {
                    "id": "9db87a3b-d5bd-4eb9-bc5b-ddd81516e698",
                    "name": "Azure QA",
                    "type": "azure_cnr"
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
        "volumes_not_attached_for_a_long_time": {
            "count": 51,
            "saving": 260.58323892963875,
            "options": {
                "days_threshold": 10,
                "excluded_pools": {
                    "bbf504b7-a1a4-483a-bc6a-a27c6bdcc0dc": true,
                    "cd7714e5-9bdd-4408-b380-1fc2bec648a9": true,
                    "54704172-af6c-4c91-bf78-5e59ad3ace11": true,
                    "cbefe6bf-5515-4f26-9a6d-75b2259ba158": true,
                    "f6fafb13-747b-4cb3-bee6-0cb91bc56fbb": true
                },
                "skip_cloud_accounts": []
            },
            "items": [
                {
                    "cloud_resource_id": "8250395586197146724",
                    "resource_name": "ds-test-2-d3vg4xvl",
                    "resource_id": "8516d3e5-2c37-4222-ac07-0ac8fa85897f",
                    "cloud_account_id": "30626d4b-d79b-4654-a4a8-60a71027d7cb",
                    "cloud_type": "gcp_cnr",
                    "cloud_account_name": "GCP dev",
                    "cost_in_detached_state": 129.83656299999996,
                    "saving": 35.23058129032258,
                    "region": "europe-west4",
                    "zone_id": "europe-west4-a",
                    "is_excluded": false,
                    "last_seen_in_attached_state": 0,
                    "detected_at": 1720889778
                },
                {
                    "cloud_resource_id": "vol-0adec22ebb1a3b533",
                    "resource_name": "dm-aplika",
                    "resource_id": "54d2eb01-84ed-4c0b-85d6-886425ce8b63",
                    "cloud_account_id": "42e6a779-6b1f-4469-b221-412f7aa15466",
                    "cloud_type": "aws_cnr",
                    "cloud_account_name": "AWS HQ",
                    "cost_in_detached_state": 222.38333382609994,
                    "saving": 22.843912643032255,
                    "region": "ap-southeast-3",
                    "zone_id": null,
                    "is_excluded": false,
                    "last_seen_in_attached_state": 0,
                    "detected_at": 1721905143
                },
                {
                    "cloud_resource_id": "/subscriptions/7a26946b-0d60-4c01-adce-b6269d527407/resourcegroups/sunflower_env/providers/microsoft.compute/disks/volume_from_snapshot_euzgbl8nl6rrrn6wsrcavd",
                    "resource_name": "volume_from_snapshot_euZgbL8nL6RRrN6WsRCaVD",
                    "resource_id": "4444623c-4eaf-4924-b19e-2cdfcfbce516",
                    "cloud_account_id": "beba6b9b-1fe9-4be0-b104-cc4b015f4750",
                    "cloud_type": "azure_cnr",
                    "cloud_account_name": "Dev environment",
                    "cost_in_detached_state": 99.58566009599997,
                    "saving": 22.295849992258063,
                    "region": "West US 2",
                    "zone_id": null,
                    "is_excluded": false,
                    "last_seen_in_attached_state": 1717306969,
                    "detected_at": 1730759518
                }
            ],
            "cloud_accounts": [
                {
                    "id": "30626d4b-d79b-4654-a4a8-60a71027d7cb",
                    "name": "GCP dev",
                    "type": "gcp_cnr"
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
        }
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