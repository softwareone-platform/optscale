import BaseRecommendation from "../recommendations/BaseRecommendation";

export type DownloadCleanupScriptsProps = {
  recommendation: BaseRecommendation;
};

export type GeneralActionsProps = {
  recommendation: BaseRecommendation;
  withMenu: boolean;
};

export type DownloadItemsProps = {
  recommendation: BaseRecommendation;
  downloadLimit?: number;
  isDownloadAvailable: boolean;
  isLoading: boolean;
  selectedDataSourceIds: string[];
};

export type ActionsProps = {
  recommendation: BaseRecommendation;
  downloadLimit?: number;
  withMenu?: boolean;
  isDownloadAvailable: boolean;
  isGetIsDownloadAvailableLoading: boolean;
  selectedDataSourceIds: string[];
};
