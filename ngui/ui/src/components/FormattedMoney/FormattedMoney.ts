import { FORMATTED_MONEY_TYPES } from "utils/constants";
import { ObjectValues, TODO } from "utils/types";
import { useMoneyFormatter } from "./useMoneyFormatter";

type FormattedMoneyProps = {
  value: number;
  format?: string;
  type?: ObjectValues<typeof FORMATTED_MONEY_TYPES>;
  [key: string]: TODO;
};

/**
 * See {@link https://datatrendstech.atlassian.net/wiki/spaces/NGUI/pages/1969651789/Money+format|Money format} for more information on when to use the different types
 */
const FormattedMoney = ({ value, format, type = FORMATTED_MONEY_TYPES.COMMON, ...rest }: FormattedMoneyProps) => {
  const formatter = useMoneyFormatter();

  return formatter(type, value, { format, ...rest });
};

export default FormattedMoney;
