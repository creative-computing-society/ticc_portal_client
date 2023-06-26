/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "react-query";
import usersApi from "../users";
import studentsApi from "../students";

const getLoggedInUserDetails = (authCtx: {
  refresh: () => void;
  token: string | null;
}) =>
  useQuery(
    ["user", "details"],
    () =>
      usersApi
        .getLoggedInUserDetails()
        .then(({ data }) => {
          localStorage.setItem("userDetails", JSON.stringify(data));
          return data;
        })
        .then((data) => {
          authCtx.refresh();
          return data;
        }),
    {
      enabled: !!authCtx.token,
    }
  );

const getLoggedInStudentDetails = (authCtx: {
  refresh: () => void;
  token: string | null;
}) =>
  useQuery(
    ["student", "details"],
    () =>
      studentsApi
        .getLoggedInStudentDetails()
        .then(({ data }) => {
          localStorage.setItem("studentDetails", JSON.stringify(data));
          return data;
        })
        .then((data) => {
          authCtx.refresh();
          return data;
        }),
    {
      enabled: !!authCtx.token,
    }
  );

const getUserDetailsByUserId = (userId: number) =>
  useQuery(["user", "details", userId], () =>
    usersApi.getUserDetailsByUserId(userId).then(({ data }) => data)
  );

const getCounsellorsList = () =>
  useQuery(["counsellors", "list"], () =>
    usersApi.getCounsellorsList().then(({ data }) => data)
  );

const getStudentDetailsByUserId = (userId: number) =>
  useQuery(["student", "details", userId], () =>
    studentsApi.getStudentDetailsByUserId(userId).then(({ data }) => data)
  );

const getStudentListBySearchQuery = (searchQuery: string) =>
  useQuery(
    ["student", "search", searchQuery],
    () =>
      usersApi
        .getStudentListBySearchQuery(searchQuery)
        .then(({ data }) => data),
    {
      enabled: searchQuery.length > 0,
      staleTime: 1000 * 60 * 2,
    }
  );

export {
  getLoggedInUserDetails,
  getLoggedInStudentDetails,
  getUserDetailsByUserId,
  getCounsellorsList,
  getStudentDetailsByUserId,
  getStudentListBySearchQuery,
};
