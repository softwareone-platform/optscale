import { FormattedMessage } from "react-intl";
import PageTitle from "components/PageTitle";
import { IntlFormatValues } from "utils/types";

type TitleProps = {
  messageId: string;
  messageValues?: IntlFormatValues;
  dataTestId?: string;
};

export const Title = ({ messageId, messageValues, dataTestId }: TitleProps) => (
  <PageTitle dataTestId={dataTestId} align="center" px={2}>
    <FormattedMessage id={messageId} values={messageValues} />
  </PageTitle>
);
