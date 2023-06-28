import { axiosClient } from "../axios";
const BASE_URL = "bookings";

const generateQuery = (userId?: number, isActive?: string, date?: string) => {
  let query = "";
  if (userId) {
    query += `?user_id=${userId}`;
  }
  if (isActive) {
    query += query ? `&is_active=${isActive}` : `?is_active=${isActive}`;
  }
  if (date) {
    query += query ? `&date=${date}` : `?date=${date}`;
  }
  return query;
};

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
    isActive?: string,
    date?: string
  ) {
    return axiosClient.get(
      `${BASE_URL}/list/${generateQuery(userId, isActive, date)}`
    );
  },
};

export default bookingsApi;
