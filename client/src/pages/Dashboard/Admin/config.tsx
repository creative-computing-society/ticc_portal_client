import { TabsProps } from "antd";

export const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: `All Sessions`,
    children: `All requests`,
  },
  {
    key: "2",
    label: `Pending Sessions`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Completed Sessions`,
    children: `Content of Tab Pane 3`,
  },
];
