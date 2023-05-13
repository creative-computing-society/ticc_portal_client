import React from "react";
import { Calendar } from "antd";
import dayjs from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import Form from "./pages/Form/Form";

function App() {
  return (
    <div className="p-6">
      <Form />
    </div>
  );
}

export default App;
