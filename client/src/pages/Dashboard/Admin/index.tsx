import { Progress, Tabs, Tooltip } from "antd";
import { tabItems } from "./config";
import SearchBar from "../../../components/Dashboard/Admin/Search";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getBookingsListByCounsellor } from "../../../api/query/bookings";
import { useEffect, useState } from "react";

const AdminHome: React.FC = () => {
  const [progressBarData, setProgressBarData] = useState({
    totalSessions: 0,
    completed: 0,
    cancelled: 0,
    pending: 0,
  });
  const navigate = useNavigate();

  const today = dayjs().format("YYYY-MM-DD");
  const { data: todayBookingsData } = getBookingsListByCounsellor(
    undefined,
    undefined,
    today
  );

  useEffect(() => {
    if (!todayBookingsData) return;

    const completed = todayBookingsData.filter((booking) => {
      return booking.remarks.includes("Completed");
    });

    const cancelled = todayBookingsData.filter((booking) => {
      return booking.remarks.includes("Cancelled");
    });

    const pending = todayBookingsData.filter((booking) => {
      return booking.remarks.includes("Pending");
    });

    setProgressBarData({
      totalSessions: todayBookingsData.length,
      completed: completed.length,
      cancelled: cancelled.length,
      pending: pending.length,
    });
  }, [todayBookingsData]);

  return (
    <div className="flex flex-col w-full pr-8">
      <h1 className="text-5xl font-semibold mb-8">Overview</h1>
      <div className="flex flex-row gap-4 justify-between text-xl font-semibold">
        <h3>Total sessions today: {progressBarData.totalSessions}</h3>
        <h3>
          <span className="text-yellow-600">Pending:</span>{" "}
          {progressBarData.pending}
        </h3>
        <h3>
          {" "}
          <span className="text-sky-400">Completed:</span>{" "}
          {progressBarData.completed}
        </h3>
        <h3>
          <span className="text-red-700">Cancelled:</span>{" "}
          {progressBarData.cancelled}
        </h3>
      </div>
      <Tooltip
        placement="bottom"
        title={`${progressBarData.completed} completed / ${progressBarData.cancelled} cancelled / ${progressBarData.pending} to go`}
      >
        <Progress
          percent={
            100 -
            (progressBarData.pending / progressBarData.totalSessions) * 100
          }
          success={{
            percent:
              (progressBarData.completed / progressBarData.totalSessions) * 100,
            strokeColor: "#38bdf8",
          }}
          trailColor="#e5e7eb"
          strokeColor="#b91c1c"
          showInfo={false}
          className="mt-4"
          strokeLinecap="square"
        />
      </Tooltip>
      <SearchBar
        placeholder="Search student by email or name"
        onSelect={(value) => {
          navigate(`/dashboard/student/${value}`);
        }}
      />
      <div className="mt-8">
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
