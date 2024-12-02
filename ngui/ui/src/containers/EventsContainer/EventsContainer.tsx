import { useState } from "react";
import { useQuery } from "@apollo/client";
import Events from "components/Events";
import { GET_EVENTS } from "graphql/api/keeper/queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { EVENT_LEVEL, EVENTS_LIMIT } from "utils/constants";
import { scrolledToBottom } from "utils/layouts";
import { getQueryParams, updateQueryParams } from "utils/network";

type FilterParams = {
  level?: keyof typeof EVENT_LEVEL;
  timeStart?: number;
  timeEnd?: number;
  descriptionLike?: string;
  includeDebugEvents?: boolean;
};

type FilterNames = keyof FilterParams;

type RequestParams = FilterParams & {
  lastId?: string;
};

const EventsContainer = () => {
  const { organizationId } = useOrganizationInfo();

  const {
    level = EVENT_LEVEL.ALL,
    timeStart,
    timeEnd,
    lastId,
    descriptionLike,
    includeDebugEvents = false
  } = getQueryParams() as Partial<{
    level: keyof typeof EVENT_LEVEL;
    timeStart: string;
    timeEnd: string;
    lastId: string;
    descriptionLike: string;
    includeDebugEvents: string | boolean;
  }>;

  // Undefined query parameters are ignored in the API calls
  const [requestParams, setRequestParams] = useState<RequestParams>({
    level,
    timeStart: timeStart === undefined ? timeStart : Number(timeStart),
    timeEnd: timeEnd === undefined ? timeEnd : Number(timeEnd),
    lastId,
    descriptionLike,
    includeDebugEvents: Boolean(includeDebugEvents)
  });

  const [events, setEvents] = useState([]);

  const getLevelParameter = () => {
    const levels =
      requestParams.level === EVENT_LEVEL.ALL
        ? [EVENT_LEVEL.INFO, EVENT_LEVEL.WARNING, EVENT_LEVEL.ERROR]
        : [requestParams.level];

    return includeDebugEvents ? [...levels, EVENT_LEVEL.DEBUG] : levels;
  };

  const { loading } = useQuery(GET_EVENTS, {
    variables: {
      organizationId,
      requestParams: {
        timeStart: requestParams.timeStart,
        timeEnd: requestParams.timeEnd,
        lastId: requestParams.lastId,
        descriptionLike: requestParams.descriptionLike,
        limit: EVENTS_LIMIT,
        level: getLevelParameter()
      }
    },
    onCompleted: (data) => {
      setEvents((state) => [...state, ...(data?.events ?? [])]);
    }
  });

  const applyFilter = (newFilterParams: FilterParams) => {
    const newRequestParams = {
      level: newFilterParams.level ?? requestParams.level,
      timeStart: newFilterParams.timeStart ?? requestParams.timeStart,
      timeEnd: newFilterParams.timeEnd ?? requestParams.timeEnd,
      descriptionLike: newFilterParams.descriptionLike ?? requestParams.descriptionLike,
      includeDebugEvents: newFilterParams.includeDebugEvents ?? requestParams.includeDebugEvents
    };

    const areParamsDifferent = (Object.keys(newRequestParams) as FilterNames[]).some(
      (key) => newRequestParams[key] !== requestParams[key]
    );

    if (areParamsDifferent) {
      const params = {
        ...newRequestParams,
        lastId: undefined
      };
      updateQueryParams(params);
      setRequestParams(params);
      setEvents([]);
    }
  };

  const handleScroll = (event) => {
    if (scrolledToBottom(event.target)) {
      const { [events.length - 1]: lastEvent } = events;
      // While requesting, the scroll listener remains active, preventing from sending a new request with the same last_id
      if (lastEvent !== undefined && lastEvent.id !== requestParams.lastId) {
        const params = {
          ...requestParams,
          lastId: lastEvent.id
        };
        setRequestParams(params);
        updateQueryParams(params);
      }
    }
  };

  return (
    <Events
      eventLevel={requestParams.level}
      includeDebugEvents={requestParams.includeDebugEvents}
      descriptionLike={requestParams.descriptionLike}
      events={events}
      isLoading={loading}
      onScroll={handleScroll}
      applyFilter={applyFilter}
    />
  );
};

export default EventsContainer;
