import React, { useState } from "react";

export interface User {
  id: number;
  email: string;
  full_name: string;
  is_ticc_counsellor: boolean;
  is_ticc_manager: boolean;
  phone_number: string;
}

export interface Student {
  id: number;
  roll_number: string | null;
  branch: string | null;
  admission_year: number | null;
  gender: string | null;
  user: User;
}

const AuthContext = React.createContext({
  token: null as string | null,
  user: null as User | null,
  student: null as Student | null,
  login: (user: {
    token: string;
    userDetails: User;
    studentDetails?: Student;
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
  const [user, setUser] = useState<User | null>(
    !!initialUser ? JSON.parse(initialUser) : null
  );
  const [student, setStudent] = useState<Student | null>(
    !!initialStudent ? JSON.parse(initialStudent) : null
  );

  const loginHandler = (newUser: {
    token: string;
    userDetails: User;
    studentDetails?: Student;
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
