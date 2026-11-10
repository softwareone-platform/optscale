import BaseSideModal from "@main/components/SideModalManager/SideModals/BaseSideModal";
import DaysThreshold from "@main/components/SideModalManager/SideModals/recommendations/components/DaysThreshold";
import InformationWrapper from "@main/components/SideModalManager/SideModals/recommendations/components/InformationWrapper";

class SnapshotsWithNonUsedImagesModal extends BaseSideModal {
  headerProps = {
    messageId: "snapshotsWithNonUsedImagesTitle",
    dataTestIds: {
      title: "lbl_snapshots_with_non_used_images_sidemodal_title",
      closeButton: "btn_close"
    }
  };

  dataTestId = "smodal_snapshots_with_non_used_mages";

  get content() {
    return (
      <InformationWrapper>
        <DaysThreshold
          messageId="thresholds.snapshotsWithNonUsedImages"
          recommendationType={this.payload?.recommendationType}
          onSuccess={this.closeSideModal}
        />
      </InformationWrapper>
    );
  }
}

export default SnapshotsWithNonUsedImagesModal;
