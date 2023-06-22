import React, { useContext } from "react";
import { ConfigProvider } from "antd";
import Form from "./pages/Form/Form";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#38bdf8",
          colorText: "#444444",
          colorBgLayout: "#ffffff",
          colorLinkHover: "#38bdf8",
        },
        components: {
          Menu: {
            colorBgTextActive: "#38bdf8",
            colorItemText: "#444444",
            colorItemTextHover: "#444444",
          },
        },
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            !!authCtx.token ? <Navigate to="/book" /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/login"
          element={!!authCtx.token ? <Navigate to="/book" /> : <Login />}
        ></Route>
        <Route
          path={"/book"}
          element={
            !!authCtx.token ? (
              <div className="p-6 text-[#333333] h-full w-full">
                <Form />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path={"/dashboard/*"}
          element={!!authCtx.token ? <Dashboard /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="*"
          element={
            !!authCtx.token ? <Navigate to="/book" /> : <Navigate to="/login" />
          }
        ></Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
