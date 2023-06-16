import { MenuItemType } from "antd/es/menu/hooks/useItems";
import {
  DesktopOutlined,
  SettingOutlined,
  FolderOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const AdminMenuItems: MenuItemArgs[] = [
  {
    title: "Home",
    icon: <DesktopOutlined style={{ fontSize: "20px" }} />,
    route: "",
  },
  {
    title: "Manage Slots",
    icon: <SettingOutlined style={{ fontSize: "20px" }} />,
    route: "manage/slots",
  },
  // {
  //   title: "Manage Resources",
  //   icon: <FolderOutlined style={{ fontSize: "20px" }} />,
  //   route: "manage/resources",
  // },
  {
    title: "Manage Admins",
    icon: <TeamOutlined style={{ fontSize: "20px" }} />,
    route: "manage/admins",
  },
  {
    title: "Logout",
    icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
    route: "logout",
  },
];

export const getMenuItems = (items: MenuItemArgs[]): MenuItemType[] => {
  let menuItems: MenuItemType[] = [];
  items.forEach((item, idx) => {
    menuItems.push({
      key: idx.toString(),
      label: <Link to={item.route}>{item.title}</Link>,
      icon: item.icon,
      className: "text-xl flex flex-row gap-2 font-semibold",
      style: { margin: "12px 0" },
    });
  });
  return menuItems;
};

export interface MenuItemArgs {
  title: string;
  icon: MenuItemType["icon"];
  route: string;
}
