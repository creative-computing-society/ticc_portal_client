import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "../../assets/logo.png";

import { useState } from "react";
import { AdminMenuItems, getMenuItems } from "./config";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          defaultSelectedKeys={["0"]}
          items={getMenuItems(AdminMenuItems)}
          className="mt-12 px-3 h-full flex flex-col bg-transparent items-center"
        />
      </Sider>
      <div className="p-8"></div>
    </Layout>
  );
};

export default Dashboard;
