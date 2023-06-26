import { Space, TabsProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import DashTable from "../../../components/Dashboard/Admin/Table";
import dayjs from "dayjs";
import BookingsTable from "../../../components/Dashboard/Admin/BookingsTable";

type Status = "pending" | "completed" | "cancelled";
const statusTagColor: {
  [key in Status]: string;
} = {
  pending: "blue",
  completed: "green",
  cancelled: "red",
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
}

export const columns: ColumnsType<IDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    render: (phone: number) => <a href={"tel:" + phone}>`+91${phone}`</a>,
  },
  // {
  //   title: "Branch",
  //   dataIndex: "branch",
  //   key: "branch",
  // },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
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
      return record.status === "pending" ? (
        <Space size="middle">
          <span>Mark as attended</span>
          <span>Absent</span>
        </Space>
      ) : record.status === "completed" ? (
        <span>Attended by {record.counsellor}</span>
      ) : (
        <span>Absent</span>
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
    render: (_, record) => {
      return record.status === "pending" ? (
        <Space size="middle">
          <span>Mark as attended</span>
          <span>Absent</span>
        </Space>
      ) : record.status === "completed" ? (
        <span>Attended by {record.counsellor}</span>
      ) : (
        <span>Absent</span>
      );
    },
  },
];

export const columnsPending: ColumnsType<IDataType> = [
  ...columns,
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Accept Appointment</a>
        <a>Cancel</a>
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
          isActive: true,
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
          isActive: false,
        }}
      />
    ),
  },
  {
    key: "4",
    label: `All Upcoming Sessions`,
    children: <BookingsTable columns={columnsAll} params={{}} />,
  },
];
