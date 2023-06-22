import { axiosClient } from "../axios";
const BASE_URL = "user";

const studentsApi = {
  getLoggedInUserDetails() {
    return axiosClient.get(`${BASE_URL}details/`);
  },
  updatePhoneNumber(phoneNumber: string) {
    return axiosClient.patch(`auth/update/`, { phone_number: phoneNumber });
  },
};

export default studentsApi;
