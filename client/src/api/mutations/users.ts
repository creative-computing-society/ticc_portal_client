/* eslint-disable react-hooks/rules-of-hooks */
import { QueryClient, useMutation } from "react-query";
import usersApi from "../users";
import studentsApi from "../students";

const updatePhoneNumber = (queryClient: QueryClient, phoneNumber: string) =>
  useMutation(() => usersApi.updatePhoneNumber(phoneNumber), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "details"]);
      // update context value
    },
  });

const updateStudentDetails = (
  queryClient: QueryClient,
  details: {
    roll_number?: string;
    branch?: string;
    admission_year?: number;
    gender?: string;
  }
) =>
  useMutation(() => studentsApi.updateStudentDetails(details), {
    onSuccess: () => {
      queryClient.invalidateQueries(["student", "details"]);
      // update context value
    },
  });

export { updatePhoneNumber, updateStudentDetails };
