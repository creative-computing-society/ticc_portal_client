import React from "react";
import { Calendar, ConfigProvider } from "antd";
import dayjs from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import Form from "./pages/Form/Form";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fb923c",
          colorText: "#444444",
        },
      }}
    >
      <div className="p-6 text-[#333333]">
        <Form />
      </div>
    </ConfigProvider>
  );
}

export default App;
