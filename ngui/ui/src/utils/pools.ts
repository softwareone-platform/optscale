export const isCostOverLimit = ({ limit, cost }) => limit > 0 && limit < cost;

export const isForecastOverLimit = ({ limit, forecast }) => limit > 0 && limit < forecast;

// A condition when a pool is considered limited
export const hasLimit = (limit?: number) => limit !== 0;

// id -> cost lookup from a GET_POOL_EXPENSES_RANGE pool tree; empty on error/missing so callers never fall back to a stale cost
export const getRangeCostMap = (rangePool, hasRangeError = false) => {
  if (hasRangeError || !rangePool?.id) {
    return new Map();
  }
  return new Map([rangePool, ...(rangePool.children ?? [])].map(({ id, cost }) => [id, cost]));
};
