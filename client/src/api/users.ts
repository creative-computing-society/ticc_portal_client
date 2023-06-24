import { axiosClient } from "../axios";
import { IStudentObject, IUserObject } from "../types";
const BASE_URL = "user";

const usersApi = {
  getLoggedInUserDetails() {
    return axiosClient.get<IUserObject>(`${BASE_URL}details/`);
  },
  updatePhoneNumber(phoneNumber: string) {
    return axiosClient.patch(`auth/update/`, { phone_number: phoneNumber });
  },
  getCounsellorsList() {
    return axiosClient.get(`/counsellors/`);
  },
  getUserDetailsByUserId(userId: number) {
    return axiosClient.get(`${BASE_URL}details?user_id=${userId}`);
  },
  getStudentListBySearchQuery(searchQuery: string) {
    return axiosClient.get<IStudentObject[]>(
      `search?searchWord=${searchQuery}`
    );
  },
};

export default usersApi;
