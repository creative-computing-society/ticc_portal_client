import { Progress, Tabs, Tooltip } from "antd";
import { tabItems } from "./config";

const AdminHome: React.FC = () => {
  const overviewData = {
    totalSessions: 12,
    pending: 5,
    completed: 5,
    cancelled: 2,
  };
  return (
    <div className="flex flex-col w-full pr-8">
      <h1 className="text-5xl font-semibold mb-8">Overview</h1>
      <div className="flex flex-row gap-4 justify-between text-xl font-semibold">
        <h3>Total sessions today: {overviewData.totalSessions}</h3>
        <h3>
          <span className="text-yellow-600">Pending:</span>{" "}
          {overviewData.pending}
        </h3>
        <h3>
          {" "}
          <span className="text-sky-400">Completed:</span>{" "}
          {overviewData.completed}
        </h3>
        <h3>
          <span className="text-red-700">Cancelled:</span>{" "}
          {overviewData.cancelled}
        </h3>
      </div>
      <Tooltip
        placement="bottom"
        title={`${overviewData.completed} completed / ${overviewData.cancelled} cancelled / ${overviewData.pending} to go`}
      >
        <Progress
          percent={
            100 - (overviewData.pending / overviewData.totalSessions) * 100
          }
          success={{
            percent:
              (overviewData.completed / overviewData.totalSessions) * 100,
            strokeColor: "#38bdf8",
          }}
          trailColor="#e5e7eb"
          strokeColor="#b91c1c"
          showInfo={false}
          className="mt-4"
        />
      </Tooltip>
      <div className="mt-10">
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          size="large"
          className="font-semibold"
        />
      </div>
    </div>
  );
};

export default AdminHome;
