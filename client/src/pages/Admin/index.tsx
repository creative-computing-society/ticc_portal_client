import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";

import { useState } from "react";
import { MenuItems } from "./config";

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{
          background: "transparent",
        }}
      >
        <div className="my-3 py-4 px-6 flex flex-col text-[#444]">
          <span className="text-3xl font-bold mb-1">Hello, Sonam!</span>
          <span className="text-sm font-medium">Have a nice day 🌷</span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          items={MenuItems}
          className="mt-16 px-3 h-full flex flex-col bg-transparent items-center"
        />
      </Sider>
      <div className="p-8"></div>
    </Layout>
  );
};

export default AdminPage;
