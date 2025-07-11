import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORGANIZATION_PERSPECTIVES } from "graphql/api/restapi/queries";
import { validatePerspectiveSchema } from "utils/validation";
import { useOrganizationInfo } from "../useOrganizationInfo";

const validatePerspectives = (perspectives) => {
  const validPerspectives = {};
  const invalidPerspectives = {};

  Object.entries(perspectives).forEach(([perspectiveName, perspectivePayload]) => {
    const [isValid] = validatePerspectiveSchema(perspectivePayload);
    (isValid ? validPerspectives : invalidPerspectives)[perspectiveName] = perspectivePayload;
  });

  return {
    validPerspectives,
    invalidPerspectives
  };
};

export const useOrganizationPerspectives = () => {
  const { organizationId } = useOrganizationInfo();

  const { data: { organizationPerspectives = {} } = {} } = useQuery(GET_ORGANIZATION_PERSPECTIVES, {
    variables: {
      organizationId
    },
    fetchPolicy: "cache-only"
  });

  return useMemo(() => {
    const { validPerspectives, invalidPerspectives } = validatePerspectives(organizationPerspectives);

    return {
      allPerspectives: organizationPerspectives,
      validPerspectives,
      invalidPerspectives
    };
  }, [organizationPerspectives]);
};
