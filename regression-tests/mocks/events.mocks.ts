import type { InterceptionEntry } from '../utils/interceptor';

const EventsRegressionResponse = {
  data: {
    events: [
      {
        time: 1740394800,
        level: 'INFO',
        evt_class: 'ORGANIZATION_CREATED',
        object_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
        object_type: 'organization',
        object_name: '[E2EMock] Sunflower Inc',
        organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
        description: '[E2EMock] Organization Sunflower Inc (6765b96c-3fda-4073-ade4-aaa840e45f97) created',
        ack: false,
        localized: 'N0027(Sunflower Inc,6765b96c-3fda-4073-ade4-aaa840e45f97)',
        id: '67c6cffef17f1ab35d1f9bc8',
        read: false,
        acknowledged_user: null,
        __typename: 'Event',
      },
    ],
  },
};

export const eventsInterceptions: InterceptionEntry[] = [{ mock: EventsRegressionResponse, gql: 'events' }];
