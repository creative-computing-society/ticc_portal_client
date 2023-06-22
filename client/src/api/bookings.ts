import { axiosClient } from "../axios";
const BASE_URL = "bookings";

const bookingsApi = {
  bookSlot(id: number, info?: string) {
    const body = {
      slot_id: id,
      additional_info: info,
    };
    return axiosClient.post(`${BASE_URL}/create/`, body);
  },
  cancelBooking(booking_id: number) {
    return axiosClient.delete(`${BASE_URL}/cancel?booking_id=${booking_id}`);
  },
};

export default bookingsApi;
