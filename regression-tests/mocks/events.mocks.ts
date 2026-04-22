import type { InterceptionEntry } from '@/types';
import { E2E_EV } from './e2e-markers';

// ─── Mock payloads ──────────────────────────────────────────────────────────
const EventsRegressionMock = {
  data: {
    events: [
      {
        time: 1740394800,
        level: 'INFO',
        evt_class: 'ORGANIZATION_CREATED',
        object_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
        object_type: 'organization',
        object_name: `${E2E_EV} Sunflower Inc`,
        organization_id: '6765b96c-3fda-4073-ade4-aaa840e45f97',
        description: `${E2E_EV} Organization Sunflower Inc (6765b96c-3fda-4073-ade4-aaa840e45f97) created`,
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
