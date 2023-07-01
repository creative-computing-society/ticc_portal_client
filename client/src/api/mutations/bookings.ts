/* eslint-disable react-hooks/rules-of-hooks */
import { QueryClient, useMutation } from "react-query";
import bookingsApi from "../bookings";
import { openNotification } from "../../components/common/Notification";

const bookSlot = (queryClient: QueryClient, id: number, info?: string) =>
  useMutation(
    () =>
      bookingsApi
        .bookSlot(id, info)
        .then(({ data }) => {
          openNotification("success", "Success", "Slot booked successfully");
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
          return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings", "all"]);
        queryClient.invalidateQueries(["slots"]);
      },
    }
  );

const cancelBooking = (queryClient: QueryClient, booking_id: number) =>
  useMutation(() => bookingsApi.cancelBooking(booking_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings", "all"]);
      queryClient.invalidateQueries(["slots"]);
    },
  });

const acceptBooking = (queryClient: QueryClient, counsellorId: number) =>
  useMutation(
    (bookingId: number) =>
      bookingsApi
        .updateBookingByCounsellor(bookingId, "Completed", counsellorId)
        .then(({ data }) => {
          openNotification(
            "success",
            "Success",
            "Booking accepted successfully"
          );
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings", "all"]);
      },
    }
  );

const rejectBooking = (queryClient: QueryClient, counsellorId: number) =>
  useMutation(
    (bookingId: number) =>
      bookingsApi
        .updateBookingByCounsellor(
          bookingId,
          "Cancelled by counsellor",
          counsellorId
        )
        .then(({ data }) => {
          openNotification(
            "success",
            "Success",
            "Booking rejected successfully"
          );
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings", "all"]);
      },
    }
  );

const markBookingAsAbsent = (queryClient: QueryClient, counsellorId: number) =>
  useMutation(
    (bookingId: number) =>
      bookingsApi
        .updateBookingByCounsellor(bookingId, "Missed by student", counsellorId)
        .then(({ data }) => {
          openNotification(
            "success",
            "Success",
            "Booking marked as 'Missed by student' successfully"
          );
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings", "all"]);
      },
    }
  );

export {
  bookSlot,
  cancelBooking,
  acceptBooking,
  rejectBooking,
  markBookingAsAbsent,
};
