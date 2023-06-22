/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "react-query";
import slotsApi from "../slots";

const getAllAvailableSlots = () =>
  useQuery(["slots", "all"], () =>
    slotsApi.listAllSlots().then(({ data }) => data)
  );

const getSlotsByDate = (startDate: string, endDate: string) =>
  useQuery(["slots", "byDate", startDate, endDate], () =>
    slotsApi.listSlotsByDate(startDate, endDate).then(({ data }) => data)
  );

const getSlotById = (id: number) =>
  useQuery(["slots", "byId", id], () =>
    slotsApi.getSlotById(id).then(({ data }) => data)
  );

const getAllHolidays = () =>
  useQuery(["slots", "holidays"], () =>
    slotsApi.listAllHolidays().then(({ data }) => data)
  );

const getAllLeavesByCounsellor = () =>
  useQuery(["slots", "leaves"], () =>
    slotsApi.getLeavesListByConsellor().then(({ data }) => data)
  );

export {
  getAllAvailableSlots,
  getSlotsByDate,
  getSlotById,
  getAllHolidays,
  getAllLeavesByCounsellor,
};
