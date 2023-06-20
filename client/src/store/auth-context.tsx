import React, { useState } from "react";

export interface User {
  token: string;
  userDetails: object;
}

const AuthContext = React.createContext({
  token: null as string | null,
  user: {},
  login: (user: User) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = localStorage.getItem("userDetails");

  const [token, setToken] = useState<string | null>(
    !!initialToken ? initialToken : null
  );
  const [user, setUser] = useState(
    !!initialUser ? JSON.parse(initialUser) : {}
  );

  const loginHandler = (user: User) => {
    setToken(user.token);
    localStorage.setItem("token", user.token);

    setUser(user.userDetails);
    localStorage.setItem("userDetails", JSON.stringify(user.userDetails));
  };

  const logoutHandler = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    user: user,
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
