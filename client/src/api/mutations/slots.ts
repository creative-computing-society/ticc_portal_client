/* eslint-disable react-hooks/rules-of-hooks */
import { QueryClient, useMutation } from "react-query";
import slotsApi from "../slots";

const addHoliday = (
  queryClient: QueryClient,
  date: string,
  description?: string
) =>
  useMutation(() => slotsApi.addHoliday(date, description), {
    onSuccess: () => {
      queryClient.invalidateQueries(["slots", "holidays"]);
      queryClient.invalidateQueries(["slots", "all"]);
    },
  });

const deleteHoliday = (queryClient: QueryClient, date: string) =>
  useMutation(() => slotsApi.deleteHoliday(date), {
    onSuccess: () => {
      queryClient.invalidateQueries(["slots", "holidays"]);
      queryClient.invalidateQueries(["slots", "all"]);
    },
  });

const addLeaveByDate = (
  queryClient: QueryClient,
  userId: number,
  date: string,
  description?: string
) =>
  useMutation(() => slotsApi.addLeaveByDate(userId, date, description), {
    onSuccess: () => {
      queryClient.invalidateQueries(["slots", "leaves"]);
      queryClient.invalidateQueries(["slots", "all"]);
    },
  });

const addLeaveBySlots = (
  queryClient: QueryClient,
  userId: number,
  slots: number[],
  description?: string
) =>
  useMutation(() => slotsApi.addLeaveBySlots(userId, slots, description), {
    onSuccess: () => {
      queryClient.invalidateQueries(["slots", "leaves"]);
      queryClient.invalidateQueries(["slots", "all"]);
    },
  });

const deleteLeave = (queryClient: QueryClient, leaveId: number) =>
  useMutation(() => slotsApi.deleteLeave(leaveId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["slots", "leaves"]);
      queryClient.invalidateQueries(["slots", "all"]);
    },
  });

export {
  addHoliday,
  deleteHoliday,
  addLeaveByDate,
  addLeaveBySlots,
  deleteLeave,
};
