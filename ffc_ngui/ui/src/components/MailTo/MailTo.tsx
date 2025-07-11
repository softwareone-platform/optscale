import { ReactNode } from "react";
import Link, { LinkOwnProps } from "@mui/material/Link";

type MailToProps = {
  email: string;
  text: ReactNode;
  dataTestId?: string;
  color?: LinkOwnProps["color"];
};

const MailTo = ({ email, text, dataTestId, color = "primary" }: MailToProps) => (
  <Link data-test-id={dataTestId} href={`mailto:${email}`} rel="noopener" color={color}>
    {text}
  </Link>
);

export default MailTo;
