import { FormattedMessage } from "react-intl";
import CaptionedCell from "components/CaptionedCell";
import CloudLabel from "components/CloudLabel";
import FormattedDigitalUnit, { IEC_UNITS } from "components/FormattedDigitalUnit";
import FormattedMoney from "components/FormattedMoney";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import RecommendationListItemFlavorLabel from "components/RecommendationListItemFlavorLabel";
import NebiusMigrationModal from "components/SideModalManager/SideModals/recommendations/NebiusMigrationModal";
import TextWithDataTestId from "components/TextWithDataTestId";
import { ALIBABA_ECS, AWS_EC2, AWS_RDS, AZURE_COMPUTE, GCP_COMPUTE_ENGINE } from "hooks/useRecommendationServices";
import { possibleMonthlySavings, expenses, usage } from "utils/columns";
import { ALIBABA_CNR, AWS_CNR, AZURE_CNR, FORMATTED_MONEY_TYPES, GCP_CNR, NEBIUS } from "utils/constants";
import BaseRecommendation, { CATEGORY } from "./BaseRecommendation";

const columns = [
  {
    header: (
      <TextWithDataTestId dataTestId="lbl_size">
        <FormattedMessage id="size" />
      </TextWithDataTestId>
    ),
    cell: ({ row: { original: { ram, cpu, region, cloud_type: type } = {} } = {}, cell }) => (
      <CaptionedCell
        caption={[
          {
            key: "region",
            node: <KeyValueLabel keyMessageId="region" value={region} />
          },
          {
            key: "cpu",
            node: <KeyValueLabel keyMessageId="cpu" value={cpu} />
          },
          {
            key: "ram",
            node: (
              <KeyValueLabel keyMessageId="ram" value={<FormattedDigitalUnit value={ram} baseUnit={IEC_UNITS.GIBIBYTE} />} />
            )
          }
        ]}
      >
        <CloudLabel type={type} label={cell.getValue()} />
      </CaptionedCell>
    ),
    accessorKey: "flavor"
  },
  expenses({
    headerDataTestId: "lbl_current_monthly_cost",
    headerMessageId: "currentMonthlyCost",
    accessorKey: "cost"
  }),
  usage({
    headerDataTestId: "lbl_projected_monthly_usage",
    headerMessageId: "projectedMonthlyUsage"
  }),
  {
    id: "recommendedSize",
    header: (
      <TextWithDataTestId dataTestId="lbl_recommended_size">
        <FormattedMessage id="recommendedSize" />
      </TextWithDataTestId>
    ),
    cell: ({ row: { original: { recommended_flavor: { ram, cpu } = {} } = {} } = {}, cell }) => (
      <CaptionedCell
        caption={[
          {
            key: "cpu",
            node: <KeyValueLabel keyMessageId="cpu" value={cpu} />
          },
          {
            key: "ram",
            node: (
              <KeyValueLabel keyMessageId="ram" value={<FormattedDigitalUnit value={ram} baseUnit={IEC_UNITS.GIBIBYTE} />} />
            )
          }
        ]}
      >
        <CloudLabel type={NEBIUS} label={cell.getValue()} />
      </CaptionedCell>
    ),
    accessorFn: (originalRow) => originalRow?.recommended_flavor?.flavor
  },
  expenses({
    headerDataTestId: "lbl_projected_monthly_cost",
    headerMessageId: "projectedMonthlyCost",
    id: "recommendedCost",
    accessorFn: (originalRow) => originalRow?.recommended_flavor?.cost
  }),
  possibleMonthlySavings({
    headerDataTestId: "lbl_nm_savings",
    defaultSort: "desc"
  })
];

class NebiusMigration extends BaseRecommendation {
  type = "nebius_migration";

  name = "migrationToNebius";

  title = "migrationToNebiusTitle";

  descriptionMessageId = "migrationToNebiusDescription";

  services = [AWS_EC2, AWS_RDS, AZURE_COMPUTE, ALIBABA_ECS, GCP_COMPUTE_ENGINE];

  appliedDataSources = [ALIBABA_CNR, AWS_CNR, AZURE_CNR, GCP_CNR];

  categories = [CATEGORY.COST];

  emptyMessageId = "noMigrationToNebius";

  hasSettings = true;

  settingsSidemodalClass = NebiusMigrationModal;

  dismissable = false;

  get previewItems() {
    return this.items.map((item) => [
      {
        key: `${item.flavor}-flavor`,
        value: <RecommendationListItemFlavorLabel item={item} />
      },
      {
        key: `${item.flavor}-recommended_flavor`,
        value: item.recommended_flavor.flavor
      },
      {
        key: `${item.saving}-saving`,
        value: <FormattedMoney type={FORMATTED_MONEY_TYPES.COMMON} value={item.saving} />
      }
    ]);
  }

  columns = columns;
}

export default NebiusMigration;
