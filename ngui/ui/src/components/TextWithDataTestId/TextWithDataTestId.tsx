import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

type TextWithDataTestIdProps = {
  dataTestId?: string;
  children?: ReactNode;
  messageId?: string;
};

const TextWithDataTestId = ({ messageId, children, dataTestId }: TextWithDataTestIdProps) =>
  dataTestId ? (
    <span data-test-id={dataTestId}>
      {!!messageId && <FormattedMessage id={messageId} />}
      {children}
    </span>
  ) : (
    <>
      {!!messageId && <FormattedMessage id={messageId} />}
      {children}
    </>
  );

export default TextWithDataTestId;
