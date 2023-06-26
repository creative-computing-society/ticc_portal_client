import React, { useEffect, useState } from "react";
import {
  getLoggedInStudentDetails,
  getLoggedInUserDetails,
} from "../api/query/users";
import { IStudentObject, IUserObject } from "../types";
import { QueryClient } from "react-query";
import { axiosClient } from "../axios";

const AuthContext = React.createContext({
  token: null as string | null,
  user: null as IUserObject | null,
  student: null as IStudentObject | null,
  login: (user: {
    token: string;
    userDetails: IUserObject;
    studentDetails?: IStudentObject;
  }) => {},
  refresh: () => {},
  logout: (queryClient: QueryClient) => {},
});

export const AuthContextProvider = (props: any) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = localStorage.getItem("userDetails");
  const initialStudent = localStorage.getItem("studentDetails");

  const [token, setToken] = useState<string | null>(
    !!initialToken ? initialToken : null
  );
  const [user, setUser] = useState<IUserObject | null>(
    !!initialUser ? JSON.parse(initialUser) : null
  );
  const [student, setStudent] = useState<IStudentObject | null>(
    !!initialStudent ? JSON.parse(initialStudent) : null
  );

  const loginHandler = (newUser: {
    token: string;
    userDetails: IUserObject;
    studentDetails?: IStudentObject;
  }) => {
    setToken(newUser.token);
    localStorage.setItem("token", newUser.token);

    setUser(newUser.userDetails);
    localStorage.setItem("userDetails", JSON.stringify(newUser.userDetails));

    if (newUser.studentDetails) {
      setStudent(newUser.studentDetails);
      localStorage.setItem(
        "studentDetails",
        JSON.stringify(newUser.studentDetails)
      );
    }

    // VVV IMP, else AXIOS Instance uses previous token after re-login in same session. manual reload fixes it.
    axiosClient.defaults.headers.Authorization = `Bearer ${newUser.token}`;
  };

  const refreshHandler = () => {
    const userDetails = localStorage.getItem("userDetails");
    const studentDetails = localStorage.getItem("studentDetails");

    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
    if (studentDetails) {
      setStudent(JSON.parse(studentDetails));
    }
  };

  const logoutHandler = (queryClient: QueryClient) => {
    setToken(null);
    setUser(null);
    setStudent(null);
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    localStorage.removeItem("studentDetails");
    queryClient.clear();
  };

  const contextValue = {
    token: token,
    user: user,
    student: student,
    login: loginHandler,
    refresh: refreshHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
