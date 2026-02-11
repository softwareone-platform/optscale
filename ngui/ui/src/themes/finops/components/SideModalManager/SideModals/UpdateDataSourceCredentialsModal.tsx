import BaseSideModal from "@main/components/SideModalManager/SideModals/BaseSideModal";
import UpdateDataSourceCredentialsContainer from "containers/UpdateDataSourceCredentialsContainer";

class UpdateDataSourceCredentialsModal extends BaseSideModal {
  get headerProps() {
    return {
      messageId: "updateDataSourceCredentials",
      color: "primary",
      formattedMessageValues: { name: this.payload?.name },
      dataTestIds: {
        title: "lbl_update_data_source_credentials",
        closeButton: "btn_close"
      }
    };
  }

  dataTestId = "smodal_update_data_source_credentials";

  get content() {
    return (
      <UpdateDataSourceCredentialsContainer
        id={this.payload?.id}
        name={this.payload?.type}
        type={this.payload?.type}
        config={this.payload?.config}
        dataSourceProps={this.payload?.dataSourceProps}
        closeSideModal={this.closeSideModal}
      />
    );
  }
}

export default UpdateDataSourceCredentialsModal;
