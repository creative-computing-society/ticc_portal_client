import { Button, DatePicker, DatePickerProps, Modal } from "antd";
import {
  IHolidayItemType,
  ILeaveItemType,
  columnsHolidays,
  columnsLeaves,
  giveSlotsArray,
} from "./config";
import SlotPicker from "../../../components/common/SlotPicker";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { ISlotObject } from "../../../types";
import {
  getAllHolidays,
  getAllLeavesByCounsellor,
} from "../../../api/query/slots";
import { useQueryClient } from "react-query";
import {
  addHoliday,
  addLeaveByDate,
  deleteHoliday,
  deleteLeave,
} from "../../../api/mutations/slots";
import TextArea from "antd/es/input/TextArea";
import DashTable from "../../../components/Dashboard/Admin/Table";
import AuthContext from "../../../store/auth-context";

const ManageSlots: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const [selectedSlot, setSelectedSlot] = useState<ISlotObject | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [newHoliday, setNewHoliday] = useState<{
    value: dayjs.Dayjs | null;
    dateString: string;
  }>({ value: null, dateString: "" });
  const [holidayDescription, setHolidayDescription] = useState<
    string | undefined
  >(undefined);
  const [holidayModalOpen, setHolidayModalOpen] = useState<boolean>(false);
  const [holidayList, setHolidayList] = useState<IHolidayItemType[]>([]);
  const [leaveModalOpen, setLeaveModalOpen] = useState<boolean>(false);
  const [leaveDescription, setLeaveDescription] = useState<string | undefined>(
    undefined
  );
  const [leaveList, setLeaveList] = useState<ILeaveItemType[]>([]);

  const queryClient = useQueryClient();
  const { data: holidayData } = getAllHolidays();
  const { data: leaveData } = getAllLeavesByCounsellor();
  const { mutate: addHolidayMutate, isLoading } = addHoliday(queryClient);
  const { mutate: deleteHolidayMutate } = deleteHoliday(queryClient);
  const { mutate: addLeaveMutate } = addLeaveByDate(
    queryClient,
    authCtx.user?.id!
  );
  const { mutate: deleteLeaveMutate } = deleteLeave(queryClient);

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
    if (leaveData) {
      const leaveList: ILeaveItemType[] = leaveData.map((leave) => {
        let slots = giveSlotsArray(leave.slots);
        return {
          id: leave.id,
          date: leave.date,
          description: leave.description,
          slots: slots,
          onAction: deleteLeaveMutate,
        };
      });
      setLeaveList(leaveList);
    }
  }, [holidayData, leaveData]);

  const onPickHoliday: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setNewHoliday({ value: date, dateString: dateString });
  };
  const onAddHoliday = () => {
    if (newHoliday) {
      addHolidayMutate({
        date: newHoliday.dateString!,
        description: holidayDescription,
      });
      setHolidayModalOpen(false);
      setNewHoliday({ value: null, dateString: "" });
      setHolidayDescription(undefined);
    }
  };

  const onAddLeave = () => {
    if (selectedDate) {
      addLeaveMutate({
        date: selectedDate.format("YYYY-MM-DD"),
        description: leaveDescription,
      });
      setLeaveModalOpen(false);
      setLeaveDescription(undefined);
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
              onClick={() => {
                setLeaveModalOpen(true);
              }}
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
      <div className="my-8">
        <h3 className="text-2xl font-medium my-3">Current Leaves</h3>
        <DashTable columns={columnsLeaves} dataSource={leaveList} />
      </div>
      <h3 className="text-2xl font-medium mt-12">Create Holiday</h3>
      <div className="flex flex-row items-center w-full justify-between">
        <span className="text-base">Select Date to add as holiday</span>
        <div className="flex flex-row items-center gap-6">
          <DatePicker
            onChange={onPickHoliday}
            size="large"
            className="w-full"
            value={newHoliday.value}
            disabledDate={(current) => {
              // disable all dates before today and saturday and sunday
              return (
                current &&
                (current < dayjs().endOf("day") ||
                  current.day() === 0 ||
                  current.day() === 6)
              );
            }}
          />
          <Button
            className="w-full h-full bg-[#38bdf8]"
            type={"primary"}
            onClick={() => {
              setHolidayModalOpen(true);
            }}
            disabled={!newHoliday.value}
          >
            <span className="py-1 items-center justify-center text-base font-semibold">
              Add Holiday
            </span>
          </Button>
        </div>
      </div>

      <Modal
        title="Confirm adding holiday?"
        open={holidayModalOpen}
        onOk={onAddHoliday}
        confirmLoading={isLoading}
        onCancel={() => {
          setHolidayModalOpen(false);
        }}
        okButtonProps={{
          className: "bg-[#38bdf8]",
        }}
      >
        <TextArea
          placeholder="Enter holiday description (optional)..."
          className="my-2 p-3"
          value={holidayDescription}
          onChange={(e) => {
            setHolidayDescription(e.target.value);
          }}
        />
      </Modal>

      <Modal
        title="Confirm adding leave?"
        open={leaveModalOpen}
        onOk={onAddLeave}
        confirmLoading={isLoading}
        onCancel={() => {
          setLeaveModalOpen(false);
        }}
        okButtonProps={{
          className: "bg-[#38bdf8]",
        }}
      >
        <TextArea
          placeholder="Enter leave description (optional)..."
          className="my-2 p-3"
          value={leaveDescription}
          onChange={(e) => {
            setLeaveDescription(e.target.value);
          }}
        />
      </Modal>

      <div className="my-8">
        <h3 className="text-2xl font-medium my-3">Current Holidays</h3>
        <DashTable columns={columnsHolidays} dataSource={holidayList} />
      </div>
    </div>
  );
};

export default ManageSlots;
