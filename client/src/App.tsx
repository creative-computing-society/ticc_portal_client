import React from "react";
import { ConfigProvider } from "antd";
import Form from "./pages/Form/Form";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
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
          path={"/"}
          element={
            <div className="p-6 text-[#333333] h-full w-full">
              <Form />
            </div>
          }
        ></Route>
        <Route path={"/dashboard/*"} element={<Dashboard />}></Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
