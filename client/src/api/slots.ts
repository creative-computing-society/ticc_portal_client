import { axiosClient } from "../axios";
import { ISlotObject } from "../types";
const BASE_URL = "slots";

const slotsApi = {
  listAllSlots() {
    return axiosClient.get(`${BASE_URL}/listslots/`);
  },
  listSlotsByDate(startDate: string, endDate: string) {
    return axiosClient.get<ISlotObject[]>(
      `${BASE_URL}/listslots?start_date=${startDate}&end_date=${endDate}`
    );
  },
  getSlotById(id: number) {
    return axiosClient.get(`${BASE_URL}/slotdetails?slot_id=${id}`);
  },
  listAllHolidays() {
    return axiosClient.get(`${BASE_URL}/holidays/`);
  },
  addHoliday(date: string, description?: string) {
    const body = {
      date: date,
      description: description,
    };
    return axiosClient.post(`${BASE_URL}/holidays/`, body);
  },
  deleteHoliday(date: string) {
    return axiosClient.delete(`${BASE_URL}/holidays/delete/?date=${date}`);
  },

  // TODO: Add leave APIs by slot, date. DEL, GET, POST

  addLeaveByDate(userId: number, date: string, description?: string) {
    const body = {
      method: "by_date",
      counsellor: String(userId),
      date: date,
      description: description,
    };
    return axiosClient.post(`${BASE_URL}/leaves/add/`, body);
  },
  addLeaveBySlots(userId: number, slots: number[], description?: string) {
    const body = {
      method: "by_slot",
      counsellor: String(userId),
      slots: slots,
      description: description,
    };
    return axiosClient.post(`${BASE_URL}/leaves/add/`, body);
  },
  getLeavesListByConsellor() {
    return axiosClient.get(`${BASE_URL}/leaves/list/`);
  },
  deleteLeave(leaveId: number) {
    return axiosClient.delete(`${BASE_URL}/leaves/delete/?leave_id=${leaveId}`);
  },
};

export default slotsApi;
