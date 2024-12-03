import BaseClient from "../baseClient.js";
import { EventsRequestParams } from "../../graphql/resolvers/keeper.generated.js";

class KeeperClient extends BaseClient {
  override baseURL = `${
    process.env.KEEPER_ENDPOINT || this.endpoint
  }/report/v2/`;

  async getEvents(organizationId: string, requestParams: EventsRequestParams) {
    const params = new URLSearchParams();

    const paramsMapping = {
      timeStart: "time_start",
      timeEnd: "time_end",
      lastId: "last_id",
      includeRead: "include_read",
      readOnGet: "read_on_get",
      descriptionLike: "description_like",
    };

    const appendParameter = (key, value) => {
      const parameterName = paramsMapping[key];

      if (parameterName) {
        params.append(parameterName, value);
      } else {
        params.append(key, value);
      }
    };

    /**
     * This is temporary
     * Mapping will be done elsewhere, not clear how at this point
     */
    Object.entries(requestParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((datum) => {
          const stringValue = datum.toString();
          appendParameter(key, stringValue);
        });
      } else {
        const stringValue = value.toString();
        appendParameter(key, stringValue);
      }
    });

    const events = await this.get(
      `organizations/${organizationId}/events?${params}`
    );

    return events.events;
  }
}

export default KeeperClient;
