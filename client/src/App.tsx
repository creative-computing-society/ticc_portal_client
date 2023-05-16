import React from "react";
import { ConfigProvider } from "antd";
import Form from "./pages/Form/Form";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import AdminPage from "./pages/Admin";

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
      <Switch>
        <Route path={"/"} exact>
          <div className="p-6 text-[#333333]">
            <Form />
          </div>
        </Route>
        <Route path={"/admin"}>
          <AdminPage />
        </Route>
      </Switch>
    </ConfigProvider>
  );
}

export default App;
