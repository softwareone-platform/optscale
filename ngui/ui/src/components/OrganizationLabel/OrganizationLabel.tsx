import ApartmentIcon from "@mui/icons-material/Apartment";
import Link from "@mui/material/Link";
import Icon from "components/Icon";
import { useUpdateScope } from "hooks/useUpdateScope";
import { HOME } from "urls";

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

const LabelLink = ({ organizationId, organizationName, dataTestId }: LabelLinkProps) => {
  const updateScope = useUpdateScope();

  return (
    <Link
      data-test-id={dataTestId}
      color="primary"
      component="button"
      onClick={() =>
        updateScope({
          newScopeId: organizationId,
          redirectTo: HOME
        })
      }
    >
      {organizationName}
    </Link>
  );
};

const OrganizationLabel = ({ id, name, dataTestId, disableLink = false }: OrganizationLabelProps) => (
  <>
    <Icon icon={ApartmentIcon} hasRightMargin />
    {!disableLink ? (
      <LabelLink organizationId={id} organizationName={name} dataTestId={dataTestId} />
    ) : (
      <span data-test-id={dataTestId}>{name}</span>
    )}
  </>
);

export default OrganizationLabel;
