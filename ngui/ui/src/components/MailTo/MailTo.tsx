import { ReactNode } from "react";
import Link from "@mui/material/Link";

type MailToProps = {
  email: string;
  text: ReactNode;
  dataTestId?: string;
};

const MailTo = ({ email, text, dataTestId }: MailToProps) => (
  <Link data-test-id={dataTestId} href={`mailto:${email}`} rel="noopener">
    {text}
  </Link>
);

export default MailTo;
