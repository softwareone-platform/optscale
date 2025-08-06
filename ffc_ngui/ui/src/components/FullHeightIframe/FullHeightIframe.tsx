import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useIntl, FormattedMessage } from "react-intl";
import Button from "components/Button";
import ContentBackdropLoader from "components/ContentBackdropLoader";
import { SPACING_1 } from "utils/layouts";

// TODO: remove hacky stuff after CORS setup https://datatrendstech.atlassian.net/browse/OS-4691
const FullHeightIframe = ({ source, iframeTitleMessageId, fallbackUrl, fallbackMessageId, fallbackButtonMessageId }) => {
  const intl = useIntl();

  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reachable, setReachable] = useState(true);

  // adding event listener to resize iframe properly
  useEffect(() => {
    const messageHandler = (event) => {
      if (event.data?.iframeHeight) {
        setIsLoading(false);
        setHeight(event.data.iframeHeight);
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // checking if iframe source is reachable by fetching it
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    // if same domain (or cors is setup) — response must be 200. Otherwise it will be 0
    fetch(source, { mode: "no-cors", signal })
      .then(({ status }) => {
        if (status !== 200 && status !== 0) {
          setReachable(false);
        }
      })
      .catch(({ name }) => {
        if (name !== "AbortError") {
          setReachable(false);
        }
      });

    return () => controller.abort();
  }, [source]);

  if (!reachable) {
    return (
      <>
        <Typography marginBottom={SPACING_1}>
          <FormattedMessage id={fallbackMessageId} />
        </Typography>
        <Button messageId={fallbackButtonMessageId} href={fallbackUrl} color="primary" variant="contained" />
      </>
    );
  }

  return (
    <ContentBackdropLoader isLoading={isLoading}>
      <iframe
        style={{ width: "100%", overflow: "hidden", height: `${height}px`, border: 0 }}
        title={intl.formatMessage({ id: iframeTitleMessageId })}
        src={source}
      />
    </ContentBackdropLoader>
  );
};

export default FullHeightIframe;
