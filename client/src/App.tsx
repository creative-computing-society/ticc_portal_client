import React from "react";
import { ConfigProvider } from "antd";
import Form from "./pages/Form/Form";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#38bdf8",
          colorText: "#444444",
        },
      }}
    >
      <div className="p-6 text-[#333333]">
        <Switch>
          <Route path={"/"} exact>
            <Form />
          </Route>
        </Switch>
      </div>
    </ConfigProvider>
  );
}

export default App;
