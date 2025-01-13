import { useMemo } from "react";
import { CONSTRAINTS, TOTAL_EXPENSE_LIMIT } from "utils/constraints";
import { useIsFeatureEnabled } from "./useIsFeatureEnabled";

export const useConstraints = () => {
  const totalExpenseLimitEnabled = useIsFeatureEnabled("total_expense_limit_enabled");

  return useMemo(
    () => CONSTRAINTS.filter((type) => type !== TOTAL_EXPENSE_LIMIT || totalExpenseLimitEnabled),
    [totalExpenseLimitEnabled]
  );
};
