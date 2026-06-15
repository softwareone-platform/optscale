import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "components/Button";
import { CONTACT_US_URL } from "urls";

const ContactSalesButton = () => (
  <Button
    variant="contained"
    fullWidth
    messageId="contactSales"
    color="primary"
    href={CONTACT_US_URL}
    startIcon={<ChatOutlinedIcon />}
  />
);

export default ContactSalesButton;
