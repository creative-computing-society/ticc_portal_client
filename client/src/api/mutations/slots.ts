/* eslint-disable react-hooks/rules-of-hooks */
import { QueryClient, useMutation } from "react-query";
import slotsApi from "../slots";
import { openNotification } from "../../components/common/Notification";

const addHoliday = (queryClient: QueryClient) =>
  useMutation(
    ["slots", "holidays", "add"],
    ({ date, description }: { date: string; description?: string }) =>
      slotsApi
        .addHoliday(date, description)
        .then(({ data }) => {
          openNotification("success", "Success", "Holiday added successfully");
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
          return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["slots", "holidays"]);
        queryClient.invalidateQueries(["slots"]);
      },
    }
  );

const deleteHoliday = (queryClient: QueryClient) =>
  useMutation(
    (date: string) =>
      slotsApi
        .deleteHoliday(date)
        .then(({ data }) => {
          openNotification(
            "success",
            "Success",
            "Holiday deleted successfully"
          );
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
          return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["slots", "holidays"]);
        queryClient.invalidateQueries(["slots"]);
      },
    }
  );

const addLeaveByDate = (queryClient: QueryClient, userId: number) =>
  useMutation(
    ["leave", "add", "date"],
    (data: { date: string; description?: string }) =>
      slotsApi
        .addLeaveByDate(userId, data.date, data.description)
        .then(({ data }) => {
          openNotification(
            "success",
            "Success",
            `Leave for ${data.date} added successfully`
          );
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
          return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["slots", "leaves"]);
        queryClient.invalidateQueries(["slots", "all"]);
      },
    }
  );

const addLeaveBySlots = (queryClient: QueryClient, userId: number) =>
  useMutation(
    ["leave", "add", "slots"],
    (data: { slots: number[]; description?: string }) =>
      slotsApi
        .addLeaveBySlots(userId, data.slots, data.description)
        .then(({ data }) => {
          openNotification("success", "Success", `Leave added successfully`);
          return data;
        })
        .catch((err) => {
          openNotification("error", "Error", err.response.data.detail);
          return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["slots", "leaves"]);
        queryClient.invalidateQueries(["slots", "all"]);
      },
    }
  );

const deleteLeave = (queryClient: QueryClient) =>
  useMutation(
    ["slots", "leave", "delete"],
    (leaveId: number) => slotsApi.deleteLeave(leaveId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["slots", "leaves"]);
        queryClient.invalidateQueries(["slots", "all"]);
      },
    }
  );

export {
  addHoliday,
  deleteHoliday,
  addLeaveByDate,
  addLeaveBySlots,
  deleteLeave,
};
