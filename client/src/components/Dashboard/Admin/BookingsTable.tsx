import { TableProps } from "antd";
import DashTable from "./Table";
import { getBookingsListByCounsellor } from "../../../api/query/bookings";
import { useEffect, useState } from "react";

const BookingsTable: React.FC<{
  columns: TableProps<any>["columns"];
  params: {
    userId?: number;
    isActive?: string;
    date?: string;
  };
}> = ({ params, columns }) => {
  const { data } = getBookingsListByCounsellor(
    params.userId,
    params.isActive,
    params.date
  );
  const [dataSource, setDataSource] = useState<any[]>([]);
  useEffect(() => {
    if (!data) return;

    let dataSource: any[] = [];
    data.forEach((booking) => {
      dataSource.push({
        key: booking.id,
        name: booking.student_email,
        studentId: booking.student,
        phone: "",
        slot: booking.slot.start_time,
        date: booking.slot.date,
        status: booking.remarks,
        counsellor: booking.assigned_counsellor || "Not Assigned",
      });
    });
    setDataSource(dataSource);
  }, [data]);
  return <DashTable columns={columns} dataSource={dataSource} />;
};

export default BookingsTable;
