import ContentBackdrop from "components/ContentBackdrop";
import { MESSAGE_TYPES } from "components/Mocked";

export default {
  component: ContentBackdrop,
  argTypes: {
    messageType: {
      name: "Message type",
      control: "select",
      options: [
        MESSAGE_TYPES.ASSIGNMENT_RULES,
        MESSAGE_TYPES.CLOUD_ACCOUNTS,
        MESSAGE_TYPES.RECOMMENDATIONS,
        MESSAGE_TYPES.POOLS,
        MESSAGE_TYPES.ENVIRONMENTS
      ],
      defaultValue: MESSAGE_TYPES.CLOUD_ACCOUNTS
    }
  }
};

export const withKnobs = (args) => <ContentBackdrop messageType={args.messageType} bannerContent={<div>Banner content</div>} />;
