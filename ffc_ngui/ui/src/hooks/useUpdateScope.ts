import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setScopeId } from "containers/OrganizationSelectorContainer/actionCreators";

export const useUpdateScope = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useCallback(
    ({ newScopeId, redirectTo }: { newScopeId: string; redirectTo?: string }) => {
      dispatch(setScopeId(newScopeId));

      if (redirectTo) {
        navigate(redirectTo);
      }
    },
    [dispatch, navigate]
  );
};
