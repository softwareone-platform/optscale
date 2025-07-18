import React, { useState, useMemo } from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import CloudLabel from "components/CloudLabel";
import ExpenseCell from "components/ExpenseCell";
import ExpensesTableHeader from "components/ExpensesTableHeader";
import ResourceCell from "components/ResourceCell";
import ResourcePaidNetworkTrafficList from "components/ResourcePaidNetworkTrafficList";
import ResourceTypeLabel from "components/ResourceTypeLabel";
import Table from "components/Table";
import TextWithDataTestId from "components/TextWithDataTestId";
import { intl } from "translations/react-intl-config";
import { getCreateAssignmentRuleUrl } from "urls";
import { isEmpty, isEmpty as isEmptyArray } from "utils/arrays";
import { resourcePoolOwner, tags } from "utils/columns";
import { CLEAN_EXPENSES_TABLE_QUERY_PARAM_PREFIX, DOWNLOAD_FILE_FORMATS } from "utils/constants";
import { MetadataNodes } from "utils/metadata";
import { CELL_EMPTY_VALUE, RESOURCE_ID_COLUMN_CELL_STYLE } from "utils/tables";

const LocationNodes = ({ region, service_name: serviceName, k8s_node: k8sNode, k8sNamespace }) => {
  const captionSettings = [
    { value: region, messageId: "region" },
    { value: serviceName, messageId: "service" },
    { value: k8sNode, messageId: "node" },
    { value: k8sNamespace, messageId: "namespace" }
  ].filter(({ value }) => Boolean(value));

  const toString = () => captionSettings.map(({ value, messageId }) => `${intl.formatMessage({ id: messageId })}: ${value}`);

  const getNodes = () =>
    captionSettings.map(({ value, messageId }) => ({
      key: value,
      node: (
        <Typography variant="caption" component="div">
          {intl.formatMessage({ id: messageId })}:&nbsp;<strong>{value}</strong>
        </Typography>
      )
    }));

  return {
    toString,
    getNodes
  };
};

const CleanExpensesTable = ({
  expenses,
  disableColumnsSelection = false,
  downloadResources,
  isDownloadingResources = false,
  startDateTimestamp,
  endDateTimestamp,
  assignmentRuleCreationLinkParameters,
  totalResourcesCount
}) => {
  // MTP_TODO: Disabled to meet BDR requirements
  // const dispatch = useDispatch();
  // const { organizationId } = useOrganizationInfo();
  // const { isLoading: isMarkResourcesAsEnvironmentsLoading } = useApiState(MARK_RESOURCES_AS_ENVIRONMENTS);

  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_resource_name">
            <FormattedMessage id="resource" />
          </TextWithDataTestId>
        ),
        accessorKey: "resource",
        style: RESOURCE_ID_COLUMN_CELL_STYLE,
        // if cells are strings just use cell: ({ cell }) => <ComponentBasedOn value={cell.getValue()} />
        // useful props are ( {row, cell, column}  )
        cell: ({ row: { original, id } }) => (
          <ResourceCell rowData={original} dataTestIds={{ labelIds: { label: `resource_name_${id}` } }} />
        ),
        enableHiding: false
      },
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_expenses">
            <ExpensesTableHeader startDateTimestamp={startDateTimestamp} endDateTimestamp={endDateTimestamp} />
          </TextWithDataTestId>
        ),
        accessorKey: "cost",
        cell: ({ row: { original } }) => (
          <ExpenseCell
            cost={original.cost}
            saving={original.saving}
            clusterTypeId={original.cluster_type_id}
            resourceId={original.resource_id}
          />
        ),
        defaultSort: "desc",
        enableHiding: false
      },
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_paid_network_traffic">
            <FormattedMessage id="paidNetworkTraffic" />
          </TextWithDataTestId>
        ),
        columnSelector: {
          accessor: "paidNetworkTraffic",
          messageId: "paidNetworkTraffic",
          dataTestId: "btn_toggle_paid_network_traffic"
        },
        accessorKey: "traffic_expenses",
        enableSorting: false,
        style: {
          minWidth: 320
        },
        cell: ({
          row: {
            original: { traffic_expenses: trafficExpenses = [] }
          }
        }) =>
          isEmptyArray(trafficExpenses) ? (
            CELL_EMPTY_VALUE
          ) : (
            <ResourcePaidNetworkTrafficList trafficExpenses={trafficExpenses} />
          )
      },
      tags({
        headerDataTestId: "lbl_metadata",
        headerMessageId: "metadata",
        accessorKey: "metadataString",
        getTags: (rowOriginal) => rowOriginal.metadataTags ?? {},
        columnSelector: {
          accessor: "metadata",
          messageId: "metadata",
          dataTestId: "btn_toggle_column_metadata"
        },
        sorted: false
      }),
      resourcePoolOwner({
        accessorKey: "pool/owner",
        columnSelector: {
          accessor: "pool/owner",
          messageId: "pool/owner",
          dataTestId: "btn_toggle_column_pool_owner"
        },
        getOwner: (rowOriginal) => {
          const { owner } = rowOriginal;

          return owner
            ? {
                name: owner.name
              }
            : undefined;
        },
        getPool: (rowOriginal) => {
          const { pool } = rowOriginal;

          return pool
            ? {
                id: pool.id,
                name: pool.name,
                purpose: pool.purpose
              }
            : undefined;
        }
      }),
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_type">
            <FormattedMessage id="type" />
          </TextWithDataTestId>
        ),
        accessorKey: "resourceType",
        columnSelector: {
          accessor: "resourceType",
          messageId: "type",
          dataTestId: "btn_toggle_column_type"
        },
        cell: ({
          row: {
            original: { resource_type: resourceType, cluster_type_id: clusterTypeId, is_environment: isEnvironment, shareable }
          }
        }) => (
          <ResourceTypeLabel
            resourceInfo={{
              resourceType,
              clusterTypeId,
              isEnvironment,
              shareable
            }}
          />
        )
      },
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_cloud">
            <FormattedMessage id="location" />
          </TextWithDataTestId>
        ),
        columnSelector: {
          accessor: "location",
          messageId: "location",
          dataTestId: "btn_toggle_column_location"
        },
        accessorKey: "locationString",
        style: {
          whiteSpace: "nowrap"
        },
        cell: ({ row: { original, id } }) => {
          const { cloud_account_type: cloudType, cloud_account_id: cloudId, cloud_account_name: cloudName } = original;

          // Clusters do not have cloud type
          if (!cloudType) {
            return null;
          }

          const locationCaptionNodes = LocationNodes(original).getNodes();

          const cloudLabel = (
            <CloudLabel dataTestId={`resource_location_${id}`} id={cloudId} name={cloudName} type={cloudType} />
          );

          if (isEmpty(locationCaptionNodes)) {
            return cloudLabel;
          }

          return (
            <>
              {cloudLabel}
              {locationCaptionNodes.map(({ key, node }) => (
                <React.Fragment key={key}>{node}</React.Fragment>
              ))}
            </>
          );
        }
      },
      tags({
        accessorKey: "tagsString",
        getTags: (rowOriginal) => rowOriginal.tags ?? {},
        columnSelector: {
          accessor: "tags",
          messageId: "tags",
          dataTestId: "btn_toggle_column_tags"
        }
      })
    ],
    [endDateTimestamp, startDateTimestamp]
  );

  const tableData = useMemo(
    () =>
      expenses.map((e) => {
        const updatedExpense = { ...e };

        updatedExpense["pool/owner"] = `${e.pool ? e.pool.name : ""} ${e.owner ? e.owner.name : ""}`;

        // making props searchable
        updatedExpense.resource = [e.cloud_resource_id, e.cloud_resource_hash, e.resource_name].filter(Boolean).join(" ");
        updatedExpense.tagsString = Object.entries(e.tags || {}) // tags object array of entries
          .map(([key, val]) => `${key}: ${val}`) // making array of key: value strings
          .join(" "); // joining with space

        updatedExpense.metadataTags = MetadataNodes(e).getTags();
        updatedExpense.metadataString = MetadataNodes(e).toString();
        updatedExpense.locationString = `${e.cloud_account_name} ${e.cloud_account_type} ${LocationNodes(e).toString()}`;

        updatedExpense.resourceType = e.cluster_type_id
          ? `${intl.formatMessage({ id: "cluster" })}: ${e.resource_type}`
          : e.resource_type;

        return updatedExpense;
      }),
    [expenses]
  );

  const getActionBarItems = () => {
    // MPT_TODO: Disabled markAsEnvironment to meet BDR requirements
    // const selectedResourceIds = Object.keys(rowSelection);

    const actionBarItems = [
      // MPT_TODO: Disabled markAsEnvironment to meet BDR requirements
      // {
      //   key: "markAsEnvironment",
      //   icon: <DnsOutlinedIcon fontSize="small" />,
      //   messageId: "markAsEnvironment",
      //   enableIfSelectedRows: true,
      //   type: "button",
      //   isLoading: isMarkResourcesAsEnvironmentsLoading,
      //   requiredActions: ["MANAGE_RESOURCES"],
      //   dataTestId: "btn_mark_as_environment",
      //   action: () => {
      //     dispatch(markResourcesAsEnvironments(organizationId, selectedResourceIds));
      //   }
      // }
    ];

    if (typeof downloadResources === "function") {
      actionBarItems.push({
        key: "download",
        startIcon: <CloudDownloadOutlinedIcon />,
        messageId: "download",
        type: "dropdown",
        action: downloadResources,
        isLoading: isDownloadingResources,
        menu: {
          items: [
            {
              key: "xlsx",
              messageId: "xlsxFile",
              action: () => downloadResources(DOWNLOAD_FILE_FORMATS.XLSX),
              dataTestId: "btn_download_xlsx"
            },
            {
              key: "json",
              messageId: "jsonFile",
              action: () => downloadResources(DOWNLOAD_FILE_FORMATS.JSON),
              dataTestId: "btn_download_json"
            }
          ]
        },
        dataTestId: " btn_download"
      });
    }

    if (assignmentRuleCreationLinkParameters) {
      actionBarItems.push({
        key: "addAssignmentRule",
        messageId: "addAssignmentRuleShort",
        icon: <AssignmentOutlinedIcon fontSize="small" />,
        type: "button",
        link: getCreateAssignmentRuleUrl(assignmentRuleCreationLinkParameters)
      });
    }

    return actionBarItems;
  };

  return (
    <Table
      data={tableData}
      columns={columns}
      pageSize={50}
      withSelection
      memoBodyCells
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      actionBar={{
        show: true,
        definition: {
          items: getActionBarItems()
        }
      }}
      getRowId={(row) => row.resource_id}
      withSearch
      columnsSelectorUID={disableColumnsSelection ? "" : "cleanExpensesTable"}
      localization={{ emptyMessageId: "noResources" }}
      queryParamPrefix={CLEAN_EXPENSES_TABLE_QUERY_PARAM_PREFIX}
      counters={
        totalResourcesCount
          ? { total: totalResourcesCount }
          : {
              hideTotal: true
            }
      }
      dataTestIds={{
        container: "CleanExpensesTable",
        infoArea: {
          displayed: "counter_displayed",
          selected: "counter_selected"
        },
        searchInput: "input_search",
        searchButton: "btn_search",
        deleteSearchButton: "btn_delete_search",
        columnsSelector: {
          container: "list_columns",
          button: "btn_columns",
          clear: "btn_select_clear_all"
        }
      }}
    />
  );
};

export default CleanExpensesTable;
