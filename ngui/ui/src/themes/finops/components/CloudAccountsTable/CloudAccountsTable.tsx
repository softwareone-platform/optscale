import { useMemo } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import CaptionedCell from "@main/components/CaptionedCell";
import Circle from "@main/components/Circle";
import useStyles from "@main/components/CloudAccountsTable/CloudAccountsTable.styles";
import CloudLabel from "@main/components/CloudLabel";
import CloudType from "@main/components/CloudType";
import FormattedMoney from "@main/components/FormattedMoney";
import IconLabel from "@main/components/IconLabel";
import Table from "@main/components/Table";
import Expander from "@main/components/Table/components/Expander";
import TableLoader from "@main/components/TableLoader";
import Tooltip from "@main/components/Tooltip";
import { CLOUD_ACCOUNT_CONNECT } from "@main/urls";
import { getColorScale } from "@main/utils/charts";
import { FORMATTED_MONEY_TYPES } from "@main/utils/constants";
import { BILLING_IMPORT_STATUS, getBillingImportStatus, summarizeChildrenDetails } from "@main/utils/dataSources";
import { DataSourceTagCell } from "@theme/shared/components/DataSourceTagCell/DataSourceTagCell";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY } from "@theme/utils/layouts";

/**
 * Theme override of the upstream table. Two changes from base:
 *   1. Header strings come from `useIntl()`, so column labels react to a language switch. The
 *      upstream import of the `intl` singleton is frozen at first module load, and the useMemo
 *      dependency list never included the locale, so headers were stuck until the page reloaded.
 *   2. The SoftwareOne styling (white card shadow, primary "Add" button) is applied in the same
 *      component instead of a separate wrapper file.
 * Everything else is a verbatim fork of upstream so cell rendering stays in sync.
 */

const NameCell = ({
  row: {
    original: {
      id,
      name,
      type,
      details: { cost } = {},
      last_import_at: lastImportAt,
      last_import_attempt_at: lastImportAttemptAt,
      last_import_attempt_error: lastImportAttemptError,
      children
    },
    index
  },
  colorScale
}) => {
  const importStatus = getBillingImportStatus({
    timestamp: lastImportAt,
    attemptTimestamp: lastImportAttemptAt,
    error: lastImportAttemptError
  });

  return (
    <CaptionedCell
      caption={
        importStatus === BILLING_IMPORT_STATUS.ERROR
          ? {
              key: "import_failed",
              node: (
                <Typography component="div" variant="caption">
                  <Tooltip title={lastImportAttemptError}>
                    <span>
                      <IconLabel
                        icon={<ErrorOutlineOutlinedIcon fontSize="inherit" color="error" />}
                        label={<FormattedMessage id="billingImportFailed" />}
                      />
                    </span>
                  </Tooltip>
                </Typography>
              )
            }
          : undefined
      }
    >
      <CloudLabel
        id={id}
        name={name}
        type={type}
        dataTestId={`link_cloud_${index}`}
        startAdornment={cost && !children ? <Circle color={colorScale(id)} mr={1} /> : null}
      />
    </CaptionedCell>
  );
};

const CloudAccountsTable = ({ cloudAccounts = [], isLoading = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const intl = useIntl();
  const { classes } = useStyles();

  const columns = useMemo(() => {
    const colorScale = getColorScale(theme.palette.chart);
    return [
      {
        header: intl.formatMessage({ id: "name" }),
        accessorKey: "name",
        cell: (cellData) => (
          <div className={classes.nameCellWrapper}>
            <Expander row={cellData.row} />
            <NameCell {...cellData} colorScale={colorScale} />
          </div>
        )
      },
      {
        header: intl.formatMessage({ id: "type" }),
        accessorKey: "type",
        cell: ({ cell }) => <CloudType type={cell.getValue()} />
      },
      {
        header: intl.formatMessage({ id: "entitled" }),
        id: "tags",
        accessorKey: "id",
        cell: ({ cell }) => <DataSourceTagCell dataSourceId={cell.getValue()} tagKey="entitlement" />,
        enableSorting: false,
        emptyValue: <FormattedMessage id="notEntitled" />
      },
      {
        header: intl.formatMessage({ id: "resourcesChargedThisMonth" }),
        id: "details.resources",
        accessorFn: (originalRow) => originalRow.details?.resources,
        emptyValue: "0"
      },
      {
        header: intl.formatMessage({ id: "expensesUpToDateThisMonth" }),
        id: "details.cost",
        accessorFn: (originalRow) => originalRow.details?.cost,
        cell: ({ cell }) => <FormattedMoney type={FORMATTED_MONEY_TYPES.COMMON} value={cell.getValue()} />,
        defaultSort: "desc"
      },
      {
        header: intl.formatMessage({ id: "expensesForecastThisMonth" }),
        id: "details.forecast",
        accessorFn: (originalRow) => originalRow.details?.forecast,
        cell: ({ cell }) => <FormattedMoney type={FORMATTED_MONEY_TYPES.COMMON} value={cell.getValue()} />
      }
    ];
    // `intl` in the deps re-computes headers when the language changes — useIntl returns a fresh
    // object per locale, so referencing it is enough. Upstream omits this on purpose (they use the
    // singleton, which never changes), so this line is the actual behavioural fix.
  }, [theme.palette.chart, classes.nameCellWrapper, intl]);

  const data = useMemo(
    () =>
      cloudAccounts
        .map((dataSource) => {
          const { id } = dataSource;
          const children = cloudAccounts.filter(({ parent_id: parentId }) => parentId === id);
          const childrenDetails = summarizeChildrenDetails(children);
          return { ...dataSource, children, details: { ...dataSource.details, ...childrenDetails } };
        })
        .filter(({ parent_id: parentId }) => !parentId),
    [cloudAccounts]
  );

  const actionBarDefinition = {
    items: [
      {
        key: "bu-add",
        dataTestId: "btn_add",
        icon: <AddOutlinedIcon fontSize="small" />,
        messageId: "add",
        color: "success",
        variant: "contained",
        type: "button",
        action: () => navigate(CLOUD_ACCOUNT_CONNECT),
        requiredActions: ["MANAGE_CLOUD_CREDENTIALS"]
      }
    ]
  };

  return (
    <Box
      sx={{
        ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
        "& .MuiButton-containedSuccess": MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY
      }}
    >
      {isLoading ? (
        <TableLoader columnsCounter={columns.length} showHeader />
      ) : (
        <>
          <Table
            dataTestIds={{
              container: "table_accs"
            }}
            data={data}
            columns={columns}
            localization={{
              emptyMessageId: "noDataSources"
            }}
            pageSize={50}
            withExpanded
            actionBar={{
              show: true,
              definition: actionBarDefinition
            }}
          />
          <Typography variant="caption" color="text.primary">
            <FormattedMessage id="entitledColumnDisclaimer" />
          </Typography>
        </>
      )}
    </Box>
  );
};

export default CloudAccountsTable;
