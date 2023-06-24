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

export { bookSlot, cancelBooking };
