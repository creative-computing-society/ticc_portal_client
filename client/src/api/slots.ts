import { axiosClient } from "../axios";
const BASE_URL = "slots";

const slotsApi = {
  listAllSlots() {
    return axiosClient.get(`${BASE_URL}/listslots`);
  },
  listSlotsByDate(startDate: string, endDate: string) {
    return axiosClient.get(
      `${BASE_URL}/available_slots?start_date=${startDate}&end_date=${endDate}`
    );
  },
  getSlotById(id: number) {
    const body = {
      slot_id: id,
    };
    return axiosClient.post(`${BASE_URL}/slotdetails`, body);
  },
  listAllHolidays() {
    return axiosClient.get(`${BASE_URL}/holidays`);
  },
  listHolidayByDate(date: string) {
    const body = {
      date: date,
    };
    return axiosClient.post(`${BASE_URL}/holidays`, body);
  },
  addHoliday(date: string, description?: string) {
    const body = {
      date: date,
      description: description,
    };
    return axiosClient.post(`${BASE_URL}/holidays`, body);
  },
  deleteHoliday(date: string) {
    return axiosClient.delete(`${BASE_URL}/holidays/delete?date=${date}`);
  },

  // TODO: Add leave APIs by slot, date. DEL, GET, POST

  addLeave(userId: number, date: string, description?: string) {
    const body = {
      counsellor: String(userId),
      date: date,
      description: description,
    };
    return axiosClient.post(`${BASE_URL}/leaves/add`, body);
  },
  getLeavesListByConsellor(userId: number) {
    return axiosClient.get(`${BASE_URL}/leaves?counsellor_id=${userId}`);
  },
  deleteLeave(leaveId: number) {
    return axiosClient.delete(`${BASE_URL}/leaves/delete?leave_id=${leaveId}`);
  },
};

export default slotsApi;
