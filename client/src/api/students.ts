import { axiosClient } from "../axios";
const BASE_URL = "student";

const studentsApi = {
  getListofAllStudentsByCounsellor() {
    return axiosClient.get(`students/`);
  },

  getLoggedInStudentDetails() {
    return axiosClient.get(`${BASE_URL}/details/`);
  },
  getStudentDetailsByUserId(userId: number) {
    return axiosClient.get(`${BASE_URL}/details?user_id=${userId}`);
  },
  updateStudentDetails(details: {
    roll_number?: string;
    branch?: string;
    admission_year?: number;
    gender?: string;
  }) {
    return axiosClient.put(`${BASE_URL}/update/`, details);
  },
};

export default studentsApi;
