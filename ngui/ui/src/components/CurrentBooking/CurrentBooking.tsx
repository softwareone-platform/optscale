import { FormattedMessage } from "react-intl";
import JiraIssuesAttachments from "components/JiraIssuesAttachments";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { getBookingTimeMeasuresDefinition } from "components/UpcomingBooking";
import AvailableIn from "./AvailableIn";

const CurrentBooking = ({ employeeName, acquiredSince, releasedAt, jiraIssues = [] }) => {
  const { remained, bookedUntil } = getBookingTimeMeasuresDefinition({ releasedAt, acquiredSince });

  return (
    <>
      <KeyValueLabel keyMessageId="user" value={employeeName} />
      <KeyValueLabel keyMessageId="until" value={bookedUntil === Infinity ? <FormattedMessage id="infinite" /> : bookedUntil} />
      {remained !== Infinity && <AvailableIn remained={remained} />}
      {jiraIssues.length > 0 && <JiraIssuesAttachments issues={jiraIssues} />}
    </>
  );
};

export default CurrentBooking;
