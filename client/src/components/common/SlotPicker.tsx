import { Button, Calendar, Col, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { checkDateValidity, getSlots } from "../Form/utils";
import { ISlotPickerProps } from "./types";
import { getSlotsByDate } from "../../api/query/slots";
import { ISlotObject } from "../../types";

const SlotPicker: React.FC<ISlotPickerProps> = (props) => {
  const { onSelectSlot, onDateChange, isMultiSelect = false } = props;

  const startDate = dayjs().add(-1, "day");
  const endDate = startDate.add(2, "week");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedSlot, setSelectedSlot] = useState<ISlotObject | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<ISlotObject[]>([]);

  const { data, isLoading } = getSlotsByDate(
    startDate.format("YYYY-MM-DD"),
    endDate.format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (!data) return;

    const slots = data.filter((slot) => {
      return slot.date === selectedDate.format("YYYY-MM-DD");
    });
    setSelectedSlot(null);
    onSelectSlot(null);

    setFilteredSlots(slots);
  }, [selectedDate, data]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col  lg:flex-row lg:items-center lg:justify-between w-full">
        <div className="lg:w-1/2 w-full max-h-[50%] p-2 lg:p-1 rounded-xl">
          <Calendar
            fullscreen={false}
            className="bg-transparent"
            rootClassName="bg-transparent"
            headerRender={(header) => {
              return null;
            }}
            validRange={[startDate, endDate.add(-1, "day")]}
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
                  } ${
                    isSelected ? "bg-sky-400 bg-opacity-100 text-white" : ""
                  }`}
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
        <div className="lg:w-1/2 lg:ml-16 w-full p-2">
          <Row gutter={[16, 16]}>
            {filteredSlots
              .filter((slot) => {
                return slot.date === selectedDate.format("YYYY-MM-DD");
              })
              .map((slot, idx) => {
                const currentSlot = dayjs(slot.date + " " + slot.start_time);
                const selectedSlotDayjs = dayjs(
                  selectedSlot?.date + " " + selectedSlot?.start_time
                );
                return (
                  <Col span={12} key={idx}>
                    <Button
                      className="w-full h-full bg-[unset] flex flex-row items-center justify-center"
                      type={
                        currentSlot.isSame(selectedSlotDayjs, "seconds")
                          ? "primary"
                          : "default"
                      }
                      style={{
                        backgroundColor: currentSlot.isSame(
                          selectedSlotDayjs,
                          "seconds"
                        )
                          ? "#38bdf8"
                          : "#fff",
                      }}
                      onClick={() => {
                        setSelectedSlot(slot);
                        onSelectSlot(slot);
                      }}
                      disabled={
                        !slot.isAvailable || currentSlot.isBefore(dayjs())
                      }
                    >
                      <span className="py-1.5 text-base font-semibold">
                        {currentSlot.format("hh:mm A")}
                      </span>
                      <span className="text-xs font-normal ml-1">
                        ({slot.slots_booked}/{slot.capacity})
                      </span>
                    </Button>
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      <span className="text-sm text-gray-600 mt-4">
        The quantity in paranthesis denotes number of slots booked out of total
        number of slots. Booking already booked slots are subject to
        availibility of the counsellor. Its recommended to book slots which are
        not booked already for an assured session.
      </span>
    </div>
  );
};

export default SlotPicker;
