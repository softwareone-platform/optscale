import { useState } from "react";
import PoolLabel from "components/PoolLabel";
import PoolSummary from "components/PoolSummary";
import TabsWrapper from "components/TabsWrapper";
import PoolAssignmentRulesContainer from "containers/PoolAssignmentRulesContainer";
import PoolConstraintsContainer from "containers/PoolConstraintsContainer";
import ShareSettingsContainer from "containers/ShareSettingsContainer";
import PoolsService from "services/PoolsService";
import { EDIT_POOL_TAB_QUERY } from "urls";
import BaseSideModal from "./BaseSideModal";

export const POOL_TABS = Object.freeze({
  GENERAL: "general",
  SHARE: "share",
  CONSTRAINTS: "constraints",
  ASSIGNMENT_RULES: "assignmentRules"
});

const Pool = ({ onSuccess, id }) => {
  const [activeTab, setActiveTab] = useState();
  const { useGet } = PoolsService();
  const { data } = useGet();

  const allPools = [data, ...(data.children || [])];
  const pool = allPools.find(({ id: poolId }) => poolId === id) ?? {};
  const parentPool = allPools.find(({ id: poolId }) => poolId === pool.parent_id) ?? {};
  const childPools = allPools.filter(({ parent_id: parentId }) => parentId === pool.id);

  const { id: poolId, name: poolName, purpose: poolPurpose, expenses_export_link: initialLink } = pool;

  const tabs = [
    {
      title: POOL_TABS.GENERAL,
      dataTestId: "tab_general",
      node: <PoolSummary pool={pool} parentPool={parentPool} childPools={childPools} onSuccess={onSuccess} />
    },
    {
      title: POOL_TABS.CONSTRAINTS,
      dataTestId: "tab_constraints",
      node: <PoolConstraintsContainer poolId={poolId} />
    },
    {
      title: POOL_TABS.ASSIGNMENT_RULES,
      dataTestId: "tab_assignment",
      node: <PoolAssignmentRulesContainer poolId={poolId} />
    },
    {
      title: POOL_TABS.SHARE,
      dataTestId: "tab_share",
      node: <ShareSettingsContainer poolId={poolId} poolName={poolName} poolPurpose={poolPurpose} initialLink={initialLink} />
    }
  ];
  return (
    <TabsWrapper
      tabsProps={{
        tabs,
        defaultTab: POOL_TABS.GENERAL,
        name: "pool-details",
        activeTab,
        queryTabName: EDIT_POOL_TAB_QUERY,
        handleChange: (event, value) => {
          setActiveTab(value);
        }
      }}
    />
  );
};

class PoolModal extends BaseSideModal {
  get headerProps() {
    const purpose = this.payload?.info.purpose;

    return {
      text: (
        <PoolLabel
          disableLink
          type={purpose}
          name={this.payload?.info.name}
          iconProps={{ hasLeftMargin: true, color: "white" }}
        />
      ),
      dataTestIds: {
        title: "lbl_edit_pool",
        closeButton: "bnt_close"
      }
    };
  }

  dataTestId = "smodal_edit_pool";

  get content() {
    return <Pool id={this.payload?.id} onSuccess={this.closeSideModal} />;
  }
}

export default PoolModal;
