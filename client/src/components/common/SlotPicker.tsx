import { Button, Calendar, Col, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { checkDateValidity, getSlots } from "../Form/utils";
import { ISlotPickerProps } from "./types";

const SlotPicker: React.FC<ISlotPickerProps> = (props) => {
  const { onSelectSlot, onDateChange, isMultiSelect = false } = props;

  const startDate = dayjs().add(-1, "day");
  const endDate = startDate.add(2, "week");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedSlot, setSelectedSlot] = useState<dayjs.Dayjs | null>(null);
  const initialSlotStart = dayjs().hour(9).minute(0).second(0);
  const initialSlotEnd = dayjs().hour(17).minute(0).second(0);
  const [slots, setSlots] = useState<dayjs.Dayjs[]>(
    getSlots(initialSlotStart, initialSlotEnd, 30)
  );

  useEffect(() => {
    let slotStart = selectedDate
      .hour(initialSlotStart.hour())
      .minute(initialSlotStart.minute())
      .second(initialSlotStart.second());
    let slotEnd = selectedDate
      .hour(initialSlotEnd.hour())
      .minute(initialSlotEnd.minute())
      .second(initialSlotEnd.second());
    setSlots(getSlots(slotStart, slotEnd, 30));

    if (onDateChange) {
      onDateChange(selectedDate);
      onSelectSlot(null);
    }
  }, [selectedDate]);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="w-1/2 max-h-[50%] p-1 rounded-xl">
        <Calendar
          fullscreen={true}
          className="bg-transparent"
          rootClassName="bg-transparent"
          headerRender={(header) => {
            return null;
          }}
          validRange={[startDate, endDate]}
          disabledDate={(current) => {
            // return false for Saturdays and Sundays
            return current.day() === 6 || current.day() === 0;
          }}
          fullCellRender={(date) => {
            const isSelected = selectedDate?.isSame(date, "day");
            return (
              <div
                className={`flex flex-col items-center m-2 p-2 ${
                  !isSelected ? "hover:bg-sky-400 hover:bg-opacity-20" : ""
                } rounded-md ${
                  checkDateValidity(date, startDate, endDate)
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                } ${isSelected ? "bg-sky-400 bg-opacity-100 text-white" : ""}`}
              >
                <div className="font-bold">{date.date()}</div>
                <div className="text-sm">{date.format("MMM")}</div>
              </div>
            );
          }}
          onSelect={(date) => {
            if (date.isAfter(dayjs())) {
              setSelectedDate(date.hour(0).minute(0).second(0));
            } else {
              setSelectedDate(dayjs());
            }
          }}
        />
      </div>
      <div className="w-1/2 ml-16">
        <Row gutter={[16, 16]}>
          {slots.map((slot, idx) => {
            return (
              <Col span={12} key={idx}>
                <Button
                  className="w-full h-full bg-[unset]"
                  type={
                    slot.isSame(selectedSlot, "seconds") ? "primary" : "default"
                  }
                  style={{
                    backgroundColor: slot.isSame(selectedSlot, "seconds")
                      ? "#38bdf8"
                      : "#fff",
                  }}
                  onClick={() => {
                    setSelectedSlot(slot);
                    onSelectSlot(slot);
                  }}
                  disabled={slot.isBefore(dayjs())}
                >
                  <span className="py-1.5 items-center justify-center text-base font-semibold">
                    {slot.format("hh:mm A")}
                  </span>
                </Button>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default SlotPicker;
