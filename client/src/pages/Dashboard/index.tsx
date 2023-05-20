import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "../../assets/logo.png";

import { useEffect, useState } from "react";
import { AdminMenuItems, getMenuItems } from "./config";
import AdminHome from "./Admin";
import { Route, Routes, useLocation } from "react-router-dom";

const Dashboard = () => {
  const paths = AdminMenuItems.map((item) => item.route);
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const path = pathname.split("/").slice(2).join("/");
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    paths.indexOf(path).toString()
  );

  useEffect(() => {
    // remove /dashboard from pathname
    const path = pathname.split("/").slice(2).join("/");
    setSelectedMenuItem(paths.indexOf(path).toString());
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }} className="bg-sky-50 bg-opacity-50">
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{
          background: "transparent",
        }}
      >
        <div className="mb-3 py-4 px-6 flex flex-col text-[#444]">
          <img
            src={logo}
            alt="logo"
            className="w-full pb-2 mb-4 border-b border-[#444444] border-opacity-50"
          />
          <span className="text-3xl font-bold mb-1">Hello, Sonam!</span>
          <span className="text-sm font-medium">Have a nice day 🌷</span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedMenuItem]}
          items={getMenuItems(AdminMenuItems)}
          className="mt-12 px-3 h-full flex flex-col bg-transparent items-center"
        />
      </Sider>
      <div className="p-8">
        <Routes>
          <Route path={""} element={<AdminHome />}></Route>
          <Route
            path={"manage/slots"}
            element={<div>Manage Slots</div>}
          ></Route>
          <Route
            path={"manage/resources"}
            element={<div>Manage Resources</div>}
          ></Route>
          <Route
            path={"manage/admins"}
            element={<div>Manage Admins</div>}
          ></Route>
          <Route path={"logout"} element={<div>Logout</div>}></Route>
        </Routes>
      </div>
    </Layout>
  );
};

export default Dashboard;
