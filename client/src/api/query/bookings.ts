/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "react-query";
import bookingsApi from "../bookings";
import { IBookingObject } from "../../types";

const getBookingsListByCounsellor = (
  userId?: number,
  isActive?: string,
  date?: string
) =>
  useQuery<IBookingObject[]>(["bookings", "all", userId, isActive, date], () =>
    bookingsApi
      .getBookingsListByCounsellor(userId, isActive, date)
      .then(({ data }) => data)
  );

export { getBookingsListByCounsellor };
