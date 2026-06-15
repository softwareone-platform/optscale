import { STATUS } from "containers/RecommendationsOverviewContainer/recommendations/BaseRecommendation";
import { ObjectValues, TODO } from "utils/types";

type Status = ObjectValues<typeof STATUS>;

type BaseRecommendationProps = {
  type: string;
  status: Status;
  limit?: number;
};

export type RecommendationDetailsProps = {
  type: string;
  dataSourceIds: string[];
  mlTaskId: string;
  limit?: number;
  withExclusions?: boolean;
  dismissible?: boolean;
};

export type RecommendationsContainerProps = BaseRecommendationProps & {
  dataSourceIds: string[];
};

export type MlRecommendationsContainerProps = BaseRecommendationProps & {
  taskId: string;
};

export type RecommendationsProps = BaseRecommendationProps & {
  isLoading: boolean;
  data: TODO;
  dataSourceIds: string[];
  withDownload: boolean;
};
