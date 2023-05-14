import { Button, Calendar, Col, Image, Row } from "antd";
import dayjs from "dayjs";
import banner from "../../assets/banner.png";
import { checkDateValidity, getSlots } from "../../components/Form/utils";
import { useState } from "react";
import Guidlines from "../../components/Form/Guidelines";
import StepTitle from "../../components/Form/StepTitle";

const Form: React.FC = () => {
  // create DayJs object for today and 3 weeks from now
  const startDate = dayjs();
  const endDate = startDate.add(2, "week");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    startDate
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const slotStart = dayjs().hour(9).minute(0).second(0);
  const slotEnd = dayjs().hour(17).minute(0).second(0);
  const slots = getSlots(slotStart, slotEnd, 30);

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto">
      <Image src={banner} preview={false} className="rounded-lg" />
      <h1 className="text-5xl font-semibold p-2 mt-3">
        Walk-in Session Slot Booking
      </h1>
      <h4 className="text-lg font-normal mb-8">Your well-being matters.</h4>
      <Guidlines />
      <StepTitle number={1}>Select date and time</StepTitle>
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
              if (checkDateValidity(date, startDate, endDate)) {
                setSelectedDate(date);
              } else {
                setSelectedDate(null);
              }
            }}
          />
        </div>
        <div className="w-1/2 ml-16">
          <Row gutter={[16, 16]}>
            {slots.map((slot) => {
              return (
                <Col span={12}>
                  <Button
                    className="w-full h-full bg-[unset]"
                    type={selectedSlot === slot ? "primary" : "default"}
                    style={{
                      backgroundColor:
                        selectedSlot === slot ? "#38bdf8" : "#fff",
                    }}
                    onClick={() => {
                      setSelectedSlot(slot);
                    }}
                  >
                    <span className="py-1.5 items-center justify-center text-base font-semibold">
                      {slot}
                    </span>
                  </Button>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <StepTitle number={2} className="mt-20">
        Fill Personal Information
      </StepTitle>
    </div>
  );
};

export default Form;
