import { Space, TabsProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import DashTable from "../../../components/Dashboard/Admin/Table";
import dayjs from "dayjs";
import BookingsTable from "../../../components/Dashboard/Admin/BookingsTable";
import { Link } from "react-router-dom";

type Status = "Pending" | "Completed" | "Cancelled by student";
const statusTagColor: {
  [key in Status]: string;
} = {
  Pending: "blue",
  Completed: "green",
  "Cancelled by student": "red",
};

export interface IDataType {
  key: string;
  name: string;
  rollNumber: number;
  email: string;
  phone: number;
  year: number;
  branch: string;
  gender: string;
  slot: string;
  status: Status;
  counsellor: string;
  date: string;
  studentId: number;
}

export const columns: ColumnsType<IDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <Link to={`students/${record.studentId}`}>{record.name}</Link>
    ),
  },
  // {
  //   title: "Email",
  //   dataIndex: "email",
  //   key: "email",
  // },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (phone: number) => <a href={"tel:" + phone}>+91 {phone}</a>,
  },
  // {
  //   title: "Branch",
  //   dataIndex: "branch",
  //   key: "branch",
  // },
  // {
  //   title: "Year",
  //   dataIndex: "year",
  //   key: "year",
  // },
  {
    title: "Slot",
    dataIndex: "slot",
    key: "slot",
  },
];

export const columnsAll: ColumnsType<IDataType> = [
  ...columns,
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return record.status === "Pending" ? (
        record.counsellor === "Not Assigned" ? (
          <Space size="middle">
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Accept Appointment");
              }}
            >
              Accept Appointment
            </button>
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Cancel");
              }}
            >
              Cancel
            </button>
          </Space>
        ) : (
          <Space size="middle">
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Mark as attended");
              }}
            >
              Mark as attended
            </button>
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Absent");
              }}
            >
              Absent
            </button>
          </Space>
        )
      ) : record.status === "Completed" ? (
        <span>Attended by {record.counsellor}</span>
      ) : (
        <span>{record.status}</span>
      );
    },
  },
];

export const columnsToday: ColumnsType<IDataType> = [
  ...columns,
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Status) => (
      <Tag color={statusTagColor[status]}>{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) =>
      record.status === "Pending" ? (
        record.counsellor === "Not Assigned" ? (
          <Space size="middle">
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Accept Appointment");
              }}
            >
              Accept Appointment
            </button>
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Cancel");
              }}
            >
              Cancel
            </button>
          </Space>
        ) : (
          <Space size="middle">
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Mark as attended");
              }}
            >
              Mark as attended
            </button>
            <button
              className="text-sm text-left p-1 hover:text-sky-400"
              onClick={() => {
                console.log("Absent");
              }}
            >
              Absent
            </button>
          </Space>
        )
      ) : record.status === "Completed" ? (
        <span>Attended by {record.counsellor}</span>
      ) : (
        <span>-</span>
      ),
  },
];

export const columnsPending: ColumnsType<IDataType> = [
  ...columns,
  {
    title: "Action",
    key: "action",
    render: (_, record) =>
      record.counsellor === "Not Assigned" ? (
        <Space size="middle">
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              console.log("Accept Appointment");
            }}
          >
            Accept Appointment
          </button>
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              console.log("Cancel");
            }}
          >
            Cancel
          </button>
        </Space>
      ) : (
        <Space size="middle">
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              console.log("Mark as attended");
            }}
          >
            Mark as attended
          </button>
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              console.log("Absent");
            }}
          >
            Absent
          </button>
        </Space>
      ),
  },
];

export const columnsCompleted: ColumnsType<IDataType> = [
  ...columns,
  {
    title: "Attended by",
    key: "counsellor",
    dataIndex: "counsellor",
    render: (_, record) => {
      return record.status.includes("Cancelled") ? (
        <span>Cancelled</span>
      ) : (
        <span>{record.counsellor}</span>
      );
    },
  },
];

export const columnsAdmins: ColumnsType<IDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <span>Revoke</span>,
  },
];

const today = dayjs();

export const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: `Sessions Today`,
    children: (
      <BookingsTable
        columns={columnsToday}
        params={{
          date: today.format("YYYY-MM-DD"),
          isActive: undefined,
          userId: undefined,
        }}
      />
    ),
  },
  {
    key: "2",
    label: `Pending Sessions`,
    children: (
      <BookingsTable
        columns={columnsPending}
        params={{
          date: today.format("YYYY-MM-DD"),
          isActive: "True",
          userId: undefined,
        }}
      />
    ),
  },
  {
    key: "3",
    label: `Completed Sessions`,
    children: (
      <BookingsTable
        columns={columnsCompleted}
        params={{
          date: today.format("YYYY-MM-DD"),
          isActive: "False",
          userId: undefined,
        }}
      />
    ),
  },
  {
    key: "4",
    label: `All Upcoming Sessions`,
    children: (
      <BookingsTable
        columns={columnsAll}
        params={{
          userId: undefined,
          date: undefined,
          isActive: "True",
        }}
      />
    ),
  },
];
