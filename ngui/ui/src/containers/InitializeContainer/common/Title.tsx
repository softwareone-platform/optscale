import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import PageTitle from "components/PageTitle";

type TitleProps = {
  messageId: string;
  messageValues?: Record<string, ReactNode>;
  dataTestId?: string;
};

export const Title = ({ messageId, messageValues, dataTestId }: TitleProps) => (
  <PageTitle dataTestId={dataTestId} align="center" px={2}>
    <FormattedMessage id={messageId} values={messageValues} />
  </PageTitle>
);
