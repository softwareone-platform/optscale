import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { SECOND } from "api/constants";
import Events from "components/Events";
import { GET_EVENTS } from "graphql/api/keeper/queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { getLastElement } from "utils/arrays";
import { EVENT_LEVEL, EVENTS_LIMIT } from "utils/constants";
import { scrolledToBottom } from "utils/layouts";
import { getQueryParams, updateQueryParams } from "utils/network";

type FilterParams = {
  level: keyof typeof EVENT_LEVEL;
  timeStart?: number;
  timeEnd?: number;
  descriptionLike?: string;
  lastId?: string;
  includeDebugEvents?: boolean;
};

type FilterNames = keyof FilterParams;

type RequestParams = Pick<FilterParams, Exclude<keyof FilterParams, "level" | "includeDebugEvents">> & {
  level: Exclude<FilterParams["level"], typeof EVENT_LEVEL.ALL>[];
  limit?: number;
};

type Variables = {
  organizationId: string;
  requestParams: RequestParams & {
    requestId: string;
  };
};

const POLL_INTERVAL = 10 * SECOND;

const getQueryParamFilters = () => {
  const {
    level = EVENT_LEVEL.ALL,
    timeStart,
    timeEnd,
    descriptionLike = "",
    includeDebugEvents = false
  } = getQueryParams() as Partial<FilterParams>;

  return {
    level,
    timeStart: timeStart === undefined ? timeStart : Number(timeStart),
    timeEnd: timeEnd === undefined ? timeEnd : Number(timeEnd),
    descriptionLike,
    includeDebugEvents
  };
};

/**
 * Request Flows:
 *
 * 1. Initial data:
 *    - Fetches events on component mount using default or query param filters.
 *    - Starts polling for periodic updates.
 *
 * 2. Filter changes:
 *    - Aborts ongoing requests and resets polling.
 *    - Fetches filtered events and replaces the current list.
 *    - Resumes polling with the updated filters.
 *
 * 3. Pagination:
 *    - Fetches additional events when scrolled to the bottom.
 *    - Appends new events to the current list without interrupting polling.
 *
 * 4. Concurrency management:
 *    - Properly aborts ongoing requests during filter changes or pagination.
 *    - Prevents redundant or conflicting requests to ensure data consistency.
 */
const EventsContainer = () => {
  const { organizationId } = useOrganizationInfo();

  const [filters, setFilters] = useState<FilterParams>(() => getQueryParamFilters());

  const getQueryVariables = useCallback(
    (params: FilterParams): Variables => {
      const getLevelParameter = () => {
        const levels =
          params.level === EVENT_LEVEL.ALL ? [EVENT_LEVEL.INFO, EVENT_LEVEL.WARNING, EVENT_LEVEL.ERROR] : [params.level];

        return params.includeDebugEvents ? [...levels, EVENT_LEVEL.DEBUG] : levels;
      };

      return {
        organizationId,
        requestParams: {
          timeStart: params.timeStart,
          timeEnd: params.timeEnd,
          lastId: params.lastId,
          descriptionLike: params.descriptionLike,
          limit: EVENTS_LIMIT,
          level: getLevelParameter(),
          /**
           * Adding a unique requestId ensures each request is treated as distinct, even if the parameters are the same.
           * This prevents issues where a new request is not triggered after canceling a previous one
           * See OS-7903 PR for more details
           */
          requestId: uuidv4()
        }
      };
    },
    [organizationId]
  );

  const intervalId = useRef();

  const [events, setEvents] = useState([]);

  const [getEvents, { loading: isLoading }] = useLazyQuery(GET_EVENTS, {
    fetchPolicy: "no-cache"
  });

  const [refetchAbortController, setRefetchAbortController] = useState(new AbortController());
  const [refetchEvents] = useLazyQuery(GET_EVENTS, {
    fetchPolicy: "no-cache",
    context: {
      fetchOptions: {
        signal: refetchAbortController.signal
      }
    }
  });

  const [fetchMoreAbortController, setFetchMoreAbortController] = useState(new AbortController());
  const [fetchMoreEvents, { loading: isFetchingMore }] = useLazyQuery(GET_EVENTS, {
    fetchPolicy: "no-cache",
    context: {
      fetchOptions: {
        signal: fetchMoreAbortController.signal
      }
    }
  });

  const refetch = useCallback(
    (variables: Variables) => {
      refetchEvents({
        variables
      }).then(({ data }) => {
        if (data) {
          setEvents((currentEvents) => {
            /**
             * If more than EVENTS_LIMIT events are generated between poll intervals,
             * only the latest EVENTS_LIMIT events will be displayed, and older excess events will be lost.
             */
            const firstEvents = currentEvents.slice(0, EVENTS_LIMIT);
            const newEvents = data.events.filter((event) => !firstEvents.some((currentEvent) => currentEvent.id === event.id));
            return [...newEvents, ...currentEvents];
          });
        }
      });
    },
    [refetchEvents]
  );

  const setPolling = useCallback(
    (variables: Variables) => {
      if (!intervalId.current) {
        intervalId.current = setInterval(() => {
          refetch(variables);
        }, POLL_INTERVAL);
      }
    },
    [refetch]
  );

  const resetPolling = () => {
    clearInterval(intervalId.current);
    intervalId.current = undefined;
  };

  useEffect(() => {
    const variables = getQueryVariables(getQueryParamFilters());

    getEvents({
      variables
    }).then(({ data }) => {
      setEvents(data.events);
      setPolling(variables);
    });
  }, [getEvents, getQueryVariables, setPolling]);

  useEffect(
    () => () => {
      resetPolling();
    },
    []
  );

  const applyFilter = (newFilterParams: FilterParams) => {
    const filterParams: FilterParams = {
      level: newFilterParams.level ?? filters.level,
      timeStart: newFilterParams.timeStart ?? filters.timeStart,
      timeEnd: newFilterParams.timeEnd ?? filters.timeEnd,
      descriptionLike: newFilterParams.descriptionLike ?? filters.descriptionLike,
      includeDebugEvents: newFilterParams.includeDebugEvents ?? filters.includeDebugEvents
    };

    const areFiltersDifferent = (Object.keys(filterParams) as FilterNames[]).some((key) => filterParams[key] !== filters[key]);

    if (areFiltersDifferent) {
      updateQueryParams(filterParams);

      setFilters((currentRequestParams) => ({
        ...currentRequestParams,
        ...filterParams
      }));

      const variables = getQueryVariables(filterParams);

      refetchAbortController.abort();
      setRefetchAbortController(new AbortController());

      fetchMoreAbortController.abort();
      setFetchMoreAbortController(new AbortController());

      resetPolling();

      getEvents({
        variables
      }).then(({ data }) => {
        setEvents(data.events);
        setPolling(variables);
      });
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (isFetchingMore) {
      return;
    }

    if (scrolledToBottom(event.target)) {
      const lastEvent = getLastElement(events);

      fetchMoreEvents({
        variables: getQueryVariables({
          ...filters,
          lastId: lastEvent.id
        })
      }).then(({ data }) => {
        if (data) {
          setEvents((currentEvents) => [...currentEvents, ...data.events]);
        }
      });
    }
  };

  return (
    <Events
      eventLevel={filters.level}
      descriptionLike={filters.descriptionLike}
      includeDebugEvents={filters.includeDebugEvents}
      events={events}
      isLoading={isLoading}
      isFetchingMore={isFetchingMore}
      onScroll={handleScroll}
      applyFilter={applyFilter}
    />
  );
};

export default EventsContainer;
