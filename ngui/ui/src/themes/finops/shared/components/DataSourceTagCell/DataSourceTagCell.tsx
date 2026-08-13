import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography/Typography";
import { FormattedMessage } from "react-intl";
import { GET_ORG_DATASOURCES_TAGS } from "@main/api/restapi/actionTypes";
import IconLabel from "@main/components/IconLabel";
import { useApiData } from "@main/hooks/useApiData";
import { DataSourceTag } from "@theme/shared/hooks/useDataSourceTagsByOrg";
import useStyles from "./DataSourceTagCell.styles";

export const DataSourceTagCell = ({ dataSourceId, tagKey }: { dataSourceId: string; tagKey: string }) => {
  const { apiData: { dataSourcesTags: tags } = {} } = useApiData(GET_ORG_DATASOURCES_TAGS);
  const { classes } = useStyles();

  if (!tags) {
    return <FormattedMessage id="loading" />;
  }

  const tag = tags[dataSourceId]?.find((tag: DataSourceTag) => tag.name === tagKey);
  const labelClass = tag ? classes.labelSuccess : "";

  return (
    <>
      <IconLabel
        icon={
          <span className={classes.icon}>
            {tag ? <CheckIcon color="success" fontSize="small" /> : <ClearIcon fontSize="small" />}
          </span>
        }
        display="inline-flex"
        label={
          <>
            <div className="datasource-tag-cell">
              <div className={labelClass}>
                <Typography variant="inherit" color={tag ? "success.main" : "text.primary"} noWrap>
                  <FormattedMessage id={tag ? "yes" : "no"} />
                </Typography>
              </div>
              {tag && tag.value && (
                <div className={classes.tagValue}>
                  <Typography variant="caption" color="primary.gray4" noWrap>
                    {tag.value}
                  </Typography>
                </div>
              )}
            </div>
          </>
        }
      />
    </>
  );
};

export default DataSourceTagCell;
