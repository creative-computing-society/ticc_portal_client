import { Button, Table } from "antd";
import SearchBar from "../../../components/Dashboard/Admin/Search";
import { columnsAdmins } from "./config";
import SlotPicker from "../../../components/common/SlotPicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ManageSlots: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<dayjs.Dayjs | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    console.log(selectedDate, selectedSlot);
  }, [selectedSlot, selectedDate]);
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
                Mark {selectedDate.format("DD MMM, YYYY")} as an off
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
                Mark {selectedSlot.format("DD MMM, hh:mm A")} as an off
              </span>
            </Button>
          )}
        </div>
      </div>
      <div className="my-8">
        <h3 className="text-2xl font-medium my-3">Current Leaves</h3>
        <Table columns={columnsAdmins} dataSource={[]} />
      </div>
    </div>
  );
};

export default ManageSlots;
