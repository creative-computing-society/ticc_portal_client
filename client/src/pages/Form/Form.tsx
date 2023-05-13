import { Calendar } from "antd";
import dayjs from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";

const Form: React.FC = () => {
  const onPanelChange = (value: dayjs.Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  // create DayJs object for today and 3 weeks from now
  const startDate = dayjs();
  const endDate = startDate.add(2, "week");

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="flex flex-row items-center justify-between">
        <Calendar
          onPanelChange={onPanelChange}
          fullscreen={true}
          className="w-1/2 max-h-[50%] border-2 box-content border-orange-300 border-opacity-80 rounded-xl"
          headerRender={(header) => {
            return null;
          }}
          validRange={[startDate, endDate]}
          disabledDate={(current) => {
            // return false for Saturdays and Sundays
            return current.day() === 6 || current.day() === 0;
          }}
          fullCellRender={(date) => {
            return (
              <div className="flex flex-col items-center m-2 p-2 hover:bg-orange-400 hover:bg-opacity-10 rounded-md">
                <div className="font-bold">{date.date()}</div>
                <div className="text-sm">{date.format("MMM")}</div>
              </div>
            );
          }}
        />
        <div className="w-1/3"></div>
      </div>
    </div>
  );
};

export default Form;
