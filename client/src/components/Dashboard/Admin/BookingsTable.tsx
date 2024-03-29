import { TableProps } from "antd";
import DashTable from "./Table";
import { getBookingsListByCounsellor } from "../../../api/query/bookings";
import { useContext, useEffect, useState } from "react";
import { IDataType } from "../../../pages/Dashboard/Admin/config";
import {
  acceptBooking,
  markBookingAsAbsent,
  rejectBooking,
} from "../../../api/mutations/bookings";
import { useQueryClient } from "react-query";
import AuthContext from "../../../store/auth-context";

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
  const [dataSource, setDataSource] = useState<IDataType[]>([]);

  const queryClient = useQueryClient();
  const authCtx = useContext(AuthContext);
  const { mutate: acceptBookingMutate } = acceptBooking(
    queryClient,
    authCtx.user!.id
  );
  const { mutate: rejectBookingMutate } = rejectBooking(
    queryClient,
    authCtx.user!.id
  );
  const { mutate: absentBookingMutate } = markBookingAsAbsent(
    queryClient,
    authCtx.user!.id
  );

  useEffect(() => {
    if (!data) return;

    let dataSource: IDataType[] = [];
    data.forEach((booking) => {
      dataSource.push({
        key: booking.id,
        name: booking.student_name,
        email: booking.student_email,
        studentId: booking.student,
        userId: booking.user_id,
        phone: "",
        slot: booking.slot.start_time,
        date: booking.slot.date,
        status: booking.remarks,
        counsellor: booking.assigned_counsellor || null,
        onAccept: acceptBookingMutate,
        onReject: rejectBookingMutate,
        onAbsent: absentBookingMutate,
      });
    });
    // sort by date and time
    dataSource.sort((a, b) => {
      if (a.date === b.date) {
        return a.slot.localeCompare(b.slot);
      }
      return a.date.localeCompare(b.date);
    });
    setDataSource(dataSource);
  }, [data]);
  return <DashTable columns={columns} dataSource={dataSource} />;
};

export default BookingsTable;
