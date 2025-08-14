import { useCallback, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import DashedTypography from "components/DashedTypography";
import { PoolModal } from "components/SideModalManager/SideModals";
import { POOL_TABS } from "components/SideModalManager/SideModals/PoolModal";
import Table from "components/Table";
import TableLoader from "components/TableLoader";
import Tooltip from "components/Tooltip";
import { useInScopeOfPageMockup } from "hooks/useInScopeOfPageMockup";
import { useOpenSideModal } from "hooks/useOpenSideModal";
import { useRootData } from "hooks/useRootData";
import { EDIT_POOL_TAB_QUERY } from "urls";
import { text } from "utils/columns";
import { updateSearchParams } from "utils/network";
import { setExpandedRows } from "./actionCreators";
import { expenses, poolActions, poolForecast, poolLimit, poolName } from "./columns";
import useExpandRequiresAttention from "./hooks/useExpandRequiresAttention";
import useGetRowStyle from "./hooks/useGetRowStyle";
import useHoverableRows from "./hooks/useHoverableRows";
import { EXPANDED_POOL_ROWS } from "./reducer";

const PoolsTable = ({ rootPool, isLoadingProps = {} }) => {
  const dispatch = useDispatch();

  const openSideModal = useOpenSideModal();
  const { isGetPoolLoading = false, isGetPoolDataReady } = isLoadingProps;

  const { id: rootPoolId, children: rootPoolChildren = [] } = rootPool;

  const openEditModal = useCallback(
    (tab, poolId) => {
      const info = [rootPool, ...rootPoolChildren].find(({ id }) => id === poolId);
      updateSearchParams({ [EDIT_POOL_TAB_QUERY]: tab });
      openSideModal(PoolModal, { id: poolId, info });
    },
    [openSideModal, rootPool, rootPoolChildren]
  );

  const { rootData: expandedPoolIds = [] } = useRootData(EXPANDED_POOL_ROWS);

  const expandRequiresAttentionHandler = useExpandRequiresAttention(rootPool);
  const isMocked = useInScopeOfPageMockup();
  useEffect(() => {
    if (isMocked) {
      expandRequiresAttentionHandler();
    }
  }, [isMocked, expandRequiresAttentionHandler]);
  const expanded = Object.fromEntries(expandedPoolIds.map((poolId) => [poolId, true]));
  const onExpandedChange = (newState) => {
    const newExpandedPoolIds = Object.keys(newState);

    dispatch(setExpandedRows(newExpandedPoolIds));
  };

  const actionBarDefinition = {
    /*
      Action bar doesn't support mobile view for "custom" items
      See OSN-140
    */
    hideItemsOnSmallScreens: false,
    items: [
      {
        key: "expandRequiringAttention",
        type: "custom",
        node: (
          <Tooltip title={<FormattedMessage id="expandRequiresAttentionHelp" />}>
            <span>
              <DashedTypography onClick={expandRequiresAttentionHandler} dataTestId="expandRequiringAttention">
                <FormattedMessage id="expandRequiringAttention" />
              </DashedTypography>
            </span>
          </Tooltip>
        )
      }
    ],
    poolId: rootPoolId
  };

  const columns = useMemo(
    () => [
      poolName({
        onExpensesExportClick: (id) => openEditModal(POOL_TABS.SHARE, id),
        onConstraintsClick: (id) => openEditModal(POOL_TABS.CONSTRAINTS, id)
      }),
      poolLimit(),
      expenses({ defaultSort: "desc" }),
      poolForecast(),
      text({
        headerMessageId: "owner",
        headerDataTestId: "lbl_owner",
        accessorKey: "default_owner_name",
        options: {
          columnSelector: {
            accessor: "default_owner_name",
            messageId: "owner",
            dataTestId: "btn_toggle_default_owner_name"
          }
        }
      }),
      poolActions()
    ],
    [openEditModal]
  );

  const root = useMemo(() => [rootPool], [rootPool]);

  const getSubRows = useCallback(
    (parentObject) => rootPoolChildren.filter((otherObject) => otherObject.parent_id === parentObject.id) || [],
    [rootPoolChildren]
  );

  const { isSelectedRow, handleRowClick } = useHoverableRows({
    onClick: (selectedPool) => openEditModal(POOL_TABS.GENERAL, selectedPool),
    rootPool,
    isGetPoolDataReady
  });

  const getRowStyle = useGetRowStyle(rootPool);

  return (
    <>
      {isGetPoolLoading ? (
        <TableLoader columnsCounter={columns.length} showHeader />
      ) : (
        <Table
          data={root}
          columns={columns}
          actionBar={{
            show: true,
            definition: actionBarDefinition
          }}
          withExpanded
          getSubRows={getSubRows}
          getRowId={(row) => row.id}
          expanded={expanded}
          onExpandedChange={onExpandedChange}
          localization={{
            emptyMessageId: "noPools"
          }}
          columnsSelectorUID="poolsTable"
          getRowStyle={getRowStyle}
          onRowClick={handleRowClick}
          isSelectedRow={isSelectedRow}
        />
      )}
    </>
  );
};

export default PoolsTable;
