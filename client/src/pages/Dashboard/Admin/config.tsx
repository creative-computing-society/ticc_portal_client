import { Button, Space, TabsProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import DashTable from "../../../components/Dashboard/Admin/Table";
import dayjs from "dayjs";
import BookingsTable from "../../../components/Dashboard/Admin/BookingsTable";
import { Link } from "react-router-dom";
import { Status } from "../../../types";

const statusTagColor: {
  [key in Status]: string;
} = {
  Pending: "blue",
  Completed: "green",
  "Cancelled by student": "red",
  "Cancelled by counsellor": "red",
  "Cancelled due to Institute holiday": "red",
  "Missed by student": "red",
  "Counsellor on leave": "red",
};

export interface IDataType {
  key: number;
  name: string;
  rollNumber?: number;
  email: string;
  phone: string;
  year?: number;
  branch?: string;
  gender?: string;
  slot: string;
  status: Status;
  counsellor: number | null;
  date: string;
  studentId: number;
  userId: number;
  onAccept: (bookingId: number) => void;
  onReject: (bookingId: number) => void;
  onAbsent: (bookingId: number) => void;
}

export const columns: ColumnsType<IDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <Link to={`student/${record.userId}`}>{record.name}</Link>
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

export const columnsAllPrevious: ColumnsType<IDataType> = [
  ...columns,
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Status) => (
      <Tag className="whitespace-pre-wrap" color={statusTagColor[status]}>
        {status}
      </Tag>
    ),
  },
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

export const columnsAllUpcoming: ColumnsType<IDataType> = [
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
        <div className="w-full flex flex-row justify-between items-center">
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              record.onAccept(record.key);
            }}
          >
            Accept
          </button>
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              record.onReject(record.key);
            }}
          >
            Cancel
          </button>
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              record.onAbsent(record.key);
            }}
          >
            Absent
          </button>
        </div>
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
      <Tag className="whitespace-pre-wrap" color={statusTagColor[status]}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return record.status === "Pending" ? (
        <div className="w-full flex flex-row justify-between items-center">
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              record.onAccept(record.key);
            }}
          >
            Accept
          </button>
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              record.onReject(record.key);
            }}
          >
            Cancel
          </button>
          <button
            className="text-sm text-left p-1 hover:text-sky-400"
            onClick={() => {
              record.onAbsent(record.key);
            }}
          >
            Absent
          </button>
        </div>
      ) : record.status === "Completed" ? (
        <span>Attended by {record.counsellor}</span>
      ) : (
        <span>-</span>
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
      <div className="w-full flex flex-row justify-between items-center">
        <button
          className="text-sm text-left p-1 hover:text-sky-400"
          onClick={() => {
            record.onAccept(record.key);
          }}
        >
          Accept
        </button>
        <button
          className="text-sm text-left p-1 hover:text-sky-400"
          onClick={() => {
            record.onReject(record.key);
          }}
        >
          Cancel
        </button>
        <button
          className="text-sm text-left p-1 hover:text-sky-400"
          onClick={() => {
            record.onAbsent(record.key);
          }}
        >
          Absent
        </button>
      </div>
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

export const columnsStudentPage: ColumnsType<IDataType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Slot",
    dataIndex: "slot",
    key: "slot",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Status) => (
      <Tag className="whitespace-pre-wrap" color={statusTagColor[status]}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Counsellor Assigned",
    dataIndex: "counsellor",
    key: "counsellor",
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
        columns={columnsAllUpcoming}
        params={{
          userId: undefined,
          date: undefined,
          isActive: "True",
        }}
      />
    ),
  },
  {
    key: "5",
    label: `All Past Sessions`,
    children: (
      <BookingsTable
        columns={columnsAllPrevious}
        params={{
          userId: undefined,
          date: undefined,
          isActive: "False",
        }}
      />
    ),
  },
];

export interface IHolidayItemType {
  date: string;
  description: string | null;
  id: number;
  time?: string;
  onAction: (data: string) => void;
}

export interface ILeaveItemType {
  date: string;
  description: string | null;
  id: number;
  slots: string;
  onAction: (id: number) => void;
}

export const giveSlotsArray = (slots: string[]) => {
  if (slots.length === 0 || slots.length === 16) {
    return "All";
  } else {
    return slots.join(", ");
  }
};

export const columnsHolidays: ColumnsType<IHolidayItemType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <button
        className="bg-red-500 text-white font-semibold px-4 py-1 rounded-md hover:bg-red-600"
        onClick={() => {
          record.onAction(record.date);
        }}
      >
        Delete
      </button>
    ),
  },
];

export const columnsLeaves: ColumnsType<ILeaveItemType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Slots",
    dataIndex: "slots",
    key: "slots",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <button
        className="bg-red-500 text-white font-semibold px-4 py-1 rounded-md hover:bg-red-600"
        onClick={() => {
          record.onAction(record.id);
        }}
      >
        Delete
      </button>
    ),
  },
];

export type TSiteSettingsKeys =
  | "enableDailyReport"
  | "enableWeeklyReport"
  | "enableMonthlyReport"
  | "enableNonThaparEmails";

export const getSettingsLabel = (key: TSiteSettingsKeys) => {
  switch (key) {
    case "enableDailyReport":
      return "Daily Report";
    case "enableWeeklyReport":
      return "Weekly Report";
    case "enableMonthlyReport":
      return "Monthly Report";
    case "enableNonThaparEmails":
      return "Non-Thapar Emails";
  }
};
