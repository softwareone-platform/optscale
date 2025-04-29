import { useState } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Typography } from "@mui/material";
import IconButton from "components/IconButton";
import Markdown from "components/Markdown";
import PropertyLayout from "components/PropertyLayout";
import { DeleteEnvironmentPropertyModal } from "components/SideModalManager/SideModals";
import UpdateEnvironmentPropertiesFormContainer from "containers/UpdateEnvironmentPropertiesFormContainer";
import { useIsAllowedToCUDEnvironmentProperties } from "hooks/useIsAllowedToCUDEnvironmentProperties";
import { useOpenSideModal } from "hooks/useOpenSideModal";
import { useOrganizationActionRestrictions } from "hooks/useOrganizationActionRestrictions";

const EnvironmentProperty = ({ environmentId, propertyName, propertyValue, existingProperties }) => {
  const { isRestricted, restrictionReasonMessage } = useOrganizationActionRestrictions();

  const [editMode, setEditMode] = useState(false);

  const openSideModal = useOpenSideModal();

  const isAllowedToCUDEnvironmentProperties = useIsAllowedToCUDEnvironmentProperties();

  return editMode ? (
    <UpdateEnvironmentPropertiesFormContainer
      environmentId={environmentId}
      defaultPropertyName={propertyName}
      defaultPropertyValue={propertyValue}
      onSuccess={() => setEditMode(false)}
      onCancel={() => setEditMode(false)}
      existingProperties={existingProperties}
      isEdit
    />
  ) : (
    <PropertyLayout
      propertyName={
        <Typography component="span" style={{ wordBreak: "break-all" }}>
          {propertyName}
        </Typography>
      }
      propertyValue={<Markdown>{propertyValue}</Markdown>}
      iconButtons={
        isAllowedToCUDEnvironmentProperties && (
          <>
            <IconButton
              icon={<CreateOutlinedIcon />}
              onClick={() => setEditMode(true)}
              disabled={isRestricted}
              tooltip={{
                show: true,
                value: isRestricted ? restrictionReasonMessage : "edit"
              }}
            />
            <IconButton
              color="error"
              icon={<DeleteOutlinedIcon />}
              onClick={() => openSideModal(DeleteEnvironmentPropertyModal, { environmentId, propertyName })}
              tooltip={{ show: true, messageId: "delete" }}
            />
          </>
        )
      }
    />
  );
};

export default EnvironmentProperty;
