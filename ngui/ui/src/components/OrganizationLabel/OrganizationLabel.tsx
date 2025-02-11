import { forwardRef } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Link from "@mui/material/Link";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import { useUpdateScope } from "hooks/useUpdateScope";
import { HOME } from "urls";
import { sliceByLimitWithEllipsis } from "utils/strings";

type OrganizationLabelProps = {
  id: string;
  name: string;
  dataTestId?: string;
  disableLink?: boolean;
};

type LabelLinkProps = {
  organizationId: string;
  organizationName: string;
  dataTestId?: string;
};

const MAX_ORGANIZATION_NAME_LENGTH = 32;

const LabelLink = forwardRef<HTMLButtonElement, LabelLinkProps>(
  ({ organizationId, organizationName, dataTestId, ...rest }, ref) => {
    const updateScope = useUpdateScope();

    const link = (
      <Link
        ref={ref}
        data-test-id={dataTestId}
        color="primary"
        component="button"
        onClick={() =>
          updateScope({
            newScopeId: organizationId,
            redirectTo: HOME
          })
        }
        {...rest}
      >
        {organizationName}
      </Link>
    );

    return link;
  }
);

const OrganizationLabel = ({ id, name, dataTestId, disableLink = false }: OrganizationLabelProps) => {
  const isNameLong = name.length > MAX_ORGANIZATION_NAME_LENGTH;
  const organizationName = isNameLong ? sliceByLimitWithEllipsis(name, MAX_ORGANIZATION_NAME_LENGTH) : name;

  return (
    <>
      <Icon icon={ApartmentIcon} hasRightMargin />
      <Tooltip title={isNameLong ? name : undefined} placement="top">
        {!disableLink ? (
          <LabelLink organizationId={id} organizationName={organizationName} dataTestId={dataTestId} />
        ) : (
          <span data-test-id={dataTestId}>{organizationName}</span>
        )}
      </Tooltip>
    </>
  );
};

export default OrganizationLabel;
