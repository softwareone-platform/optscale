import { useEffect, useState, useMemo } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import PestControlIcon from "@mui/icons-material/PestControl";
import { FormControlLabel, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Accordion from "components/Accordion";
import ActionBar from "components/ActionBar";
import ButtonGroup from "components/ButtonGroup";
import Checkbox from "components/Checkbox";
import { getBasicRangesSet } from "components/DateRangePicker/defaults";
import PageContentWrapper from "components/PageContentWrapper";
import RangePickerForm from "components/RangePickerForm";
import SearchInput from "components/SearchInput";
import Table from "components/Table";
import { useInitialMount } from "hooks/useInitialMount";
import { isEmpty } from "utils/arrays";
import { EVENT_LEVEL, EVENTS_LIMIT } from "utils/constants";
import { EN_FULL_FORMAT, formatUTC } from "utils/datetime";
import { SPACING_1, SPACING_2, SPACING_3 } from "utils/layouts";
import { getSearchParams, updateSearchParams, removeSearchParam } from "utils/network";

const Loader = () => (
  <Box width="100%" textAlign="center" pt={2}>
    <CircularProgress />
  </Box>
);

const Picker = ({ onApply }) => {
  const filterParams = getSearchParams();

  return (
    <RangePickerForm
      initialStartDateValue={filterParams?.timeStart}
      initialEndDateValue={filterParams?.timeEnd}
      onApply={(startDate, endDate) =>
        onApply({
          timeStart: startDate,
          timeEnd: endDate
        })
      }
      notSetMessageId="latest"
      definedRanges={getBasicRangesSet()}
      fullWidth
    />
  );
};

const EVENT_LEVEL_ITEMS = [
  {
    id: "all",
    messageId: "all",
    value: EVENT_LEVEL.ALL,
    type: "text",
    dataTestId: "event_lvl_all"
  },
  {
    id: "info",
    messageId: "info",
    value: EVENT_LEVEL.INFO,
    type: "text",
    dataTestId: "event_lvl_info"
  },
  {
    id: "warning",
    messageId: "warning",
    value: EVENT_LEVEL.WARNING,
    type: "text",
    dataTestId: "event_lvl_warning"
  },
  {
    id: "error",
    messageId: "error",
    value: EVENT_LEVEL.ERROR,
    type: "text",
    dataTestId: "event_lvl_error"
  }
];

const formatEventTime = (eventTime) => `${formatUTC(eventTime, EN_FULL_FORMAT)} UTC`;

const EventLevelSelector = ({ eventLevel, onApply }) => {
  const activeButtonIndex = EVENT_LEVEL_ITEMS.findIndex(({ value }) => value === eventLevel);
  const buttons = EVENT_LEVEL_ITEMS.map((e) => ({ ...e, action: () => onApply({ level: e.value }) }));

  return <ButtonGroup buttons={buttons} activeButtonIndex={activeButtonIndex === -1 ? 0 : activeButtonIndex} />;
};

const getEventsGroupedByTime = (events) =>
  events.reduce((resultObject, event) => {
    const groupKey = formatUTC(event.time);
    return {
      ...resultObject,
      [groupKey]: [...(resultObject[groupKey] || []), event]
    };
  }, {});

const EventIcon = ({ eventLevel }) =>
  ({
    [EVENT_LEVEL.INFO]: <InfoIcon fontSize="small" color="primary" />,
    [EVENT_LEVEL.WARNING]: <ErrorIcon fontSize="small" color="warning" />,
    [EVENT_LEVEL.ERROR]: <ErrorIcon fontSize="small" color="error" />,
    [EVENT_LEVEL.DEBUG]: <PestControlIcon fontSize="small" color="info" />
  })[eventLevel];

const Events = ({
  eventLevel,
  descriptionLike,
  includeDebugEvents,
  onScroll,
  applyFilter,
  events,
  isLoading = false,
  isFetchingMore = false
}) => {
  const actionBarDefinition = {
    title: {
      messageId: "events",
      dataTestId: "lbl_events"
    }
  };

  const [expanded, setExpanded] = useState("");
  const queryParams = getSearchParams();

  const handleAccordion = (eventId) => (_, isExpanded) => {
    setExpanded(isExpanded ? eventId : "");
    if (isExpanded) {
      updateSearchParams({ event: eventId });
    } else {
      removeSearchParam("event");
    }
  };

  const { isInitialMount, setIsInitialMount } = useInitialMount();

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
    } else if (queryParams.event) {
      setExpanded(queryParams.event);
    }
  }, [setExpanded, queryParams, isInitialMount, setIsInitialMount]);

  const eventTableColumns = useMemo(
    () => [
      {
        accessorKey: "name",
        cell: ({ row: { original } }) => <div data-test-id={original.dataTestId}>{original.name}</div>,
        style: {
          whiteSpace: "nowrap"
        }
      },
      {
        accessorKey: "value"
      }
    ],
    []
  );

  const expandedEventData = useMemo(() => {
    const event = events.find((e) => e.id === expanded);

    if (!event) {
      return [];
    }

    const eventDataRaw = [
      {
        name: <FormattedMessage id="date" />,
        dataTestId: "lbl_date",
        value: formatEventTime(event.time)
      },
      {
        name: <FormattedMessage id="objectName" />,
        dataTestId: "lbl_object_name",
        value: event.object_name
      },
      {
        name: <FormattedMessage id="objectType" />,
        dataTestId: "lbl_object_type",
        value: event.object_type
      },
      {
        name: <FormattedMessage id="description" />,
        dataTestId: "lbl_description",
        value: event.description
      }
    ];

    // adding resolve by at second row
    if (event.acknowledged_user) {
      eventDataRaw.splice(1, 0, {
        name: <FormattedMessage id="resolveBy" />,
        value: event.acknowledged_user
      });
    }

    return eventDataRaw;
  }, [events, expanded]);

  const getAccordionContent = (event) =>
    expanded === `${event.id}` ? (
      <Table
        data={expandedEventData}
        columns={eventTableColumns}
        localization={{ emptyMessageId: "noEvents" }}
        withHeader={false}
        dataTestIds={{
          container: "div_event_details"
        }}
        counters={{
          show: false
        }}
      />
    ) : null;

  const renderAccordion = (eventsList, parentIndex) =>
    eventsList.map((event, index) => (
      <Accordion
        headerDataTestId={index === 0 && parentIndex === 0 ? "sp_first_event" : null}
        key={event.id}
        expanded={expanded === event.id}
        onChange={handleAccordion(event.id)}
        zeroSummaryMinHeight
        hideExpandIcon
      >
        <Box maxWidth="100%" display="flex" alignItems="center" py={0.5}>
          <Box display="flex" mr={0.5}>
            <EventIcon eventLevel={event.level} />
          </Box>
          <Typography variant="body2">{`${formatEventTime(event.time)} | ${event.description}`}</Typography>
        </Box>
        {getAccordionContent(event)}
      </Accordion>
    ));

  const renderEventList = () => {
    const noEvents = isEmpty(events);

    if (isLoading) {
      return <Loader />;
    }

    if (noEvents) {
      return <FormattedMessage id="noEvents" />;
    }

    return (
      <Box
        onScroll={onScroll}
        display="flex"
        flexDirection="column"
        flexGrow={1}
        flexBasis="0px"
        overflow="auto"
        /**
         * Set an approximate maximum height for the events section to ensure it remains scrollable on large screens.
         * The maximum height should be determined based on the height of the container when all events belong to a single date.
         * In this scenario, the container's height will be close to its minimum possible value.
         *
         * EVENTS_LIMIT represents the maximum number of events that can be fetched in a single request.
         * Each event is assumed to occupy approximately 25 pixels in height.
         */
        maxHeight={`${EVENTS_LIMIT * 25}px`}
      >
        <Box>
          <Stack spacing={SPACING_3}>
            {Object.entries(getEventsGroupedByTime(events)).map(([groupKey, groupData], index) => (
              <Box key={groupKey}>
                <Typography variant="subtitle1">{groupKey}</Typography>
                {renderAccordion(groupData, index)}
              </Box>
            ))}
          </Stack>
          {isFetchingMore ? <Loader /> : null}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Stack spacing={SPACING_1} height="100%">
          <Box display="flex" flexWrap="wrap" gap={SPACING_2} className={"MTPBoxShadow"}>
            <Box display="flex" gap={2}>
              <EventLevelSelector eventLevel={eventLevel} onApply={applyFilter} />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={includeDebugEvents}
                    onChange={() => {
                      applyFilter({
                        includeDebugEvents: !includeDebugEvents
                      });
                    }}
                  />
                }
                label={<FormattedMessage id="showDebugEvents" />}
              />
            </Box>
            <Box
              display="flex"
              gap={SPACING_2}
              flexGrow={1}
              justifyContent="flex-end"
              flexWrap={{
                sm: "nowrap",
                xs: "wrap"
              }}
            >
              <Box
                sx={{
                  flexGrow: {
                    sm: 0,
                    xs: 1
                  }
                }}
              >
                <SearchInput
                  onSearch={(text) => {
                    applyFilter({
                      descriptionLike: text
                    });
                  }}
                  initialSearchText={descriptionLike}
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  flexGrow: {
                    sm: 0,
                    xs: 1
                  }
                }}
              >
                <Picker onApply={applyFilter} />
              </Box>
            </Box>
          </Box>
          {renderEventList()}
        </Stack>
      </PageContentWrapper>
    </>
  );
};

export default Events;
