import React, { useEffect, useState } from "react";
import {
  getLoggedInStudentDetails,
  getLoggedInUserDetails,
} from "../api/query/users";
import { IStudentObject, IUserObject } from "../types";

const AuthContext = React.createContext({
  token: null as string | null,
  user: null as IUserObject | null,
  student: null as IStudentObject | null,
  login: (user: {
    token: string;
    userDetails: IUserObject;
    studentDetails?: IStudentObject;
  }) => {},
  logout: () => {},
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

  const studentData = getLoggedInStudentDetails();
  const userData = getLoggedInUserDetails();

  useEffect(() => {
    if (studentData.data) {
      setStudent(studentData.data);
      localStorage.setItem("studentDetails", JSON.stringify(studentData.data));
    }
    if (userData.data) {
      setUser(userData.data);
      localStorage.setItem("userDetails", JSON.stringify(userData.data));
    }
  }, [studentData, userData]);

  const loginHandler = (newUser: {
    token: string;
    userDetails: IUserObject;
    studentDetails?: IStudentObject;
  }) => {
    setToken(newUser.token);
    localStorage.setItem("token", newUser.token);

    setUser(newUser.userDetails);
    localStorage.setItem("userDetails", JSON.stringify(newUser.userDetails));

    console.log(newUser.studentDetails);

    if (newUser.studentDetails) {
      setStudent(newUser.studentDetails);
      localStorage.setItem(
        "studentDetails",
        JSON.stringify(newUser.studentDetails)
      );
    }
  };

  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    setStudent(null);
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    localStorage.removeItem("studentDetails");
  };

  const contextValue = {
    token: token,
    user: user,
    student: student,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
