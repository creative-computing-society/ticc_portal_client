import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { DesktopOutlined, SettingOutlined } from "@ant-design/icons";

export const MenuItems: MenuItemType[] = [
  {
    key: "1",
    label: "Home",
    icon: <DesktopOutlined />,
    className: "text-xl flex flex-row gap-2 font-semibold",
    style: { margin: "12px 0" },
  },
  {
    key: "2",
    label: "Manage Slots",
    icon: <SettingOutlined />,
    className: "text-xl flex flex-row gap-2 font-semibold",
    style: { margin: "12px 0" },
  },
];
