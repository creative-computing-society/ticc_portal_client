import { Button, DatePicker, DatePickerProps, Table } from "antd";
import SearchBar from "../../../components/Dashboard/Admin/Search";
import { IHolidayItemType, columnsAdmins, columnsHolidays } from "./config";
import SlotPicker from "../../../components/common/SlotPicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ISlotObject } from "../../../types";
import { getAllHolidays } from "../../../api/query/slots";
import { useQueryClient } from "react-query";
import { addHoliday, deleteHoliday } from "../../../api/mutations/slots";

const ManageSlots: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<ISlotObject | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [newHoliday, setNewHoliday] = useState<string | null>(null);
  const [holidayList, setHolidayList] = useState<IHolidayItemType[]>([]);

  const queryClient = useQueryClient();
  const { data: holidayData } = getAllHolidays();
  const { mutate: addHolidayMutate } = addHoliday(queryClient, newHoliday!);
  const { mutate: deleteHolidayMutate } = deleteHoliday(queryClient);

  useEffect(() => {
    console.log(holidayData);
    if (holidayData) {
      const holidayList: IHolidayItemType[] = holidayData.map((holiday) => ({
        id: holiday.id,
        date: holiday.date,
        description: holiday.description,
        onAction: deleteHolidayMutate,
      }));
      setHolidayList(holidayList);
    }
  }, [holidayData]);

  const onPickHoliday: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setNewHoliday(dateString);
  };
  const onAddHoliday = () => {
    if (newHoliday) {
      addHolidayMutate();
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8 ">Manage Slots</h1>
      <SlotPicker
        onSelectSlot={setSelectedSlot}
        onDateChange={setSelectedDate}
      />
      <div className="mt-4 flex flex-row items-center justify-between">
        <span>Select slots to mark as offs.</span>
        <div className="flex flex-row items-center gap-4">
          {selectedDate && (
            <Button
              className="w-full h-full bg-[unset]"
              type={"primary"}
              style={{
                backgroundColor: "#38bdf8",
              }}
              onClick={() => {}}
            >
              <span className="py-1.5 items-center justify-center text-base font-semibold">
                Mark unavailibility on {selectedDate.format("DD MMM, YYYY")}
              </span>
            </Button>
          )}
          {selectedSlot && (
            <Button
              className="w-full h-full bg-[unset]"
              type={"primary"}
              style={{
                backgroundColor: "#38bdf8",
              }}
              onClick={() => {}}
            >
              <span className="py-1.5 items-center justify-center text-base font-semibold">
                Mark unavailibility at{" "}
                {dayjs(
                  selectedSlot.date + " " + selectedSlot.start_time
                ).format("DD MMM, hh:mm A")}
              </span>
            </Button>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-medium mt-12">Create Holiday</h3>
      <div className="flex flex-row items-center w-full justify-between">
        <span className="text-base">Select Date to add as holiday</span>
        <div className="flex flex-row items-center gap-6">
          <DatePicker
            onChange={onPickHoliday}
            size="large"
            className="w-full"
          />
          <Button
            className="w-full h-full bg-[#38bdf8]"
            type={"primary"}
            onClick={onAddHoliday}
            disabled={!newHoliday}
          >
            <span className="py-1 items-center justify-center text-base font-semibold">
              Add Holiday
            </span>
          </Button>
        </div>
      </div>
      <div className="my-8">
        <h3 className="text-2xl font-medium my-3">Current Holidays</h3>
        <Table columns={columnsHolidays} dataSource={holidayList} />
      </div>
    </div>
  );
};

export default ManageSlots;
