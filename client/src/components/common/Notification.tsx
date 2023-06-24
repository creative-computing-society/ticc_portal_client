import { notification } from "antd";

type notifType = "success" | "info" | "warning" | "error";

export const openNotification = (
  type: notifType,
  title: string,
  message: string
) =>
  notification.open({
    message: `${title}`,
    description: message,
    placement: "bottomRight",
    type: type,
  });
