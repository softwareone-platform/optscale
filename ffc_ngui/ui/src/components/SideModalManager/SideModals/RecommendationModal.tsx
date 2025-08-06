import RecommendationDetails from "components/RecommendationDetails";
import BaseSideModal from "./BaseSideModal";

class RecommendationModal extends BaseSideModal {
  get headerProps() {
    return {
      showExpand: true,
      messageId: this.payload.titleMessageId,
      dataTestIds: {
        title: "lbl_ml_sidemodal_title",
        closeButton: "btn_close"
      }
    };
  }

  dataTestId = "smodal_recommendation";

  get content() {
    const { type, limit, dataSourceIds, mlTaskId, dismissable, withExclusions } = this.payload;

    return (
      <RecommendationDetails
        mlTaskId={mlTaskId}
        type={type}
        dataSourceIds={dataSourceIds}
        limit={limit}
        dismissable={dismissable}
        withExclusions={withExclusions}
      />
    );
  }
}

export default RecommendationModal;
