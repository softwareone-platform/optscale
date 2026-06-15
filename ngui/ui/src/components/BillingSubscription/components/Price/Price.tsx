import { Typography, TypographyProps } from "@mui/material";
import FormattedMoney from "components/FormattedMoney";
import { FORMATTED_MONEY_TYPES } from "utils/constants";

type PriceProps = {
  price: number;
  currency: string;
  unit?: string;
  period?: string;
  variant?: TypographyProps["variant"];
};

const Price = ({ price, currency, unit, period, variant = "body2" }: PriceProps) => (
  <Typography component="span" variant={variant}>
    <strong>
      <FormattedMoney value={price} type={FORMATTED_MONEY_TYPES.COMMON} format={currency} />
    </strong>
    {!!unit && <>&nbsp;/&nbsp;{unit}</>}
    {!!period && <>&nbsp;/&nbsp;{period}</>}
  </Typography>
);

export default Price;
