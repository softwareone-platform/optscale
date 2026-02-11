import InlineSeverityAlert from "@main/components/InlineSeverityAlert/InlineSeverityAlert";
import { EMPTY_UUID } from "utils/constants";

const TaggingPolicyDescriptionShort = ({ conditions }) => {
  const strong = (chunks) => <strong>{chunks}</strong>;
  const { tag: prohibitedTag, without_tag: requiredTag } = conditions;
  if (prohibitedTag === EMPTY_UUID) {
    return <InlineSeverityAlert messageId="taggingPolicy.anyTagsShort" />;
  }

  if (!prohibitedTag) {
    return (
      <InlineSeverityAlert messageId={"taggingPolicy.requiredTagDescriptionShort"} messageValues={{ requiredTag, strong }} />
    );
  }

  if (!requiredTag) {
    return (
      <InlineSeverityAlert
        messageId={"taggingPolicy.prohibitedTagDescriptionShort"}
        messageValues={{ prohibitedTag, strong }}
      />
    );
  }

  return (
    <InlineSeverityAlert
      messageId={"taggingPolicy.tagsCorrelationDescriptionShort"}
      messageValues={{ firstTag: prohibitedTag, secondTag: requiredTag, strong }}
    />
  );
};

export default TaggingPolicyDescriptionShort;
