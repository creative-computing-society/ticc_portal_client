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
  getBookingDetailsByBookingId(booking_id: number) {
    return axiosClient.get(`${BASE_URL}/details?booking_id=${booking_id}`);
  },
  getBookingsListByCounsellor(
    userId?: number,
    isActive?: boolean,
    date?: string
  ) {
    const query = `?`;
    if (userId) {
      query.concat(`user_id=${userId}&`);
    }
    if (isActive) {
      query.concat(`is_active=${isActive}&`);
    }
    if (date) {
      query.concat(`date=${date}`);
    }
    return axiosClient.get(`${BASE_URL}/list/${query}`);
  },
};

export default bookingsApi;
