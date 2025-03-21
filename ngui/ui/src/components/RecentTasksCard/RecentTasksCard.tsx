import { useMemo } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import IconButton from "components/IconButton";
import Table from "components/Table";
import TableLoader from "components/TableLoader";
import WrapperCard from "components/WrapperCard";
import { ML_TASKS } from "urls";
import { metrics, mlTaskLastRun, mlTaskName } from "utils/columns";

const RecentTasksTable = ({ tasks }) => {
  const tableData = useMemo(() => tasks.toSorted((taskA, taskB) => taskB.last_run - taskA.last_run), [tasks]);

  const columns = useMemo(
    () => [
      mlTaskName({
        enableSorting: false,
        enableHiding: false
      }),
      mlTaskLastRun({
        columnSelector: {
          accessor: "lastRun",
          messageId: "lastRun",
          dataTestId: "btn_toggle_column_last_run"
        }
      }),
      metrics({
        accessorKey: "last_run_reached_goals",
        enableSorting: false,
        columnSelector: {
          accessor: "metrics",
          messageId: "metrics",
          dataTestId: "btn_toggle_column_metrics"
        }
      })
    ],
    []
  );

  return (
    <Table
      data={tableData}
      columns={columns}
      pageSize={5}
      enablePaginationQueryParam={false}
      localization={{
        emptyMessageId: "noTasks"
      }}
    />
  );
};

const RecentTasksCard = ({ tasks, isLoading = false }) => {
  const navigate = useNavigate();

  const goToTasks = () => navigate(ML_TASKS);

  return (
    <WrapperCard
      variant="shadow"
      needAlign
      title={
        <Box display="flex" alignItems="center">
          <Box mr={0.5}>
            <FormattedMessage id="tasks" />
          </Box>
          <Box display="flex">
            <IconButton
              icon={<ArrowForwardIosIcon />}
              tooltip={{
                show: true,
                messageId: "goToTasks"
              }}
              onClick={goToTasks}
              isLoading={isLoading}
              dataTestId="btn_go_to_tasks"
            />
          </Box>
        </Box>
      }
      dataTestIds={{
        wrapper: "block_recent_tasks",
        title: "lbl_recent_tasks",
        titleCaption: "p_recent_tasks"
      }}
      elevation={0}
    >
      {isLoading ? <TableLoader /> : <RecentTasksTable tasks={tasks} />}
    </WrapperCard>
  );
};

export default RecentTasksCard;
