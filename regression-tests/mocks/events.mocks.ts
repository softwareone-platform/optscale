import type { InterceptionEntry } from '@/types';
import { e2e } from './constants';
import { ORGANIZATION_ID_EVENTS } from './ids';

// ─── Mock payloads ──────────────────────────────────────────────────────────
const EventsRegressionMock = {
  data: {
    events: [
      {
        time: 1740394800,
        level: 'INFO',
        evt_class: 'ORGANIZATION_CREATED',
        object_id: ORGANIZATION_ID_EVENTS,
        object_type: 'organization',
        object_name: e2e('Sunflower Inc'),
        organization_id: ORGANIZATION_ID_EVENTS,
        description: e2e('Organization Sunflower Inc (6765b96c-3fda-4073-ade4-aaa840e45f97) created'),
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

// ─── Interceptions ──────────────────────────────────────────────────────────
export const eventsInterceptions: InterceptionEntry[] = [{ mock: EventsRegressionMock, gql: 'events' }];
