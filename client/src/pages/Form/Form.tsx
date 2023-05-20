import {
  Button,
  Calendar,
  Checkbox,
  Col,
  Image,
  InputNumber,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import banner from "../../assets/banner.png";
import { checkDateValidity, getSlots } from "../../components/Form/utils";
import { useEffect, useState } from "react";
import Guidlines from "../../components/Form/Guidelines";
import StepTitle from "../../components/common/StepTitle";
import { Label } from "../../components/common/Label";
import Input from "antd/es/input/Input";
import { Link } from "react-router-dom";

const Form: React.FC = () => {
  // create DayJs object for today and 3 weeks from now
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
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto">
      <Image src={banner} preview={false} className="rounded-lg" />
      <h1 className="text-5xl font-semibold p-2 mt-3">
        Walk-in Session Slot Booking
      </h1>
      <h4 className="text-lg font-normal mb-8">We are listening.</h4>
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
            {slots.map((slot) => {
              return (
                <Col span={12}>
                  <Button
                    className="w-full h-full bg-[unset]"
                    type={
                      slot.isSame(selectedSlot, "seconds")
                        ? "primary"
                        : "default"
                    }
                    style={{
                      backgroundColor: slot.isSame(selectedSlot, "seconds")
                        ? "#38bdf8"
                        : "#fff",
                    }}
                    onClick={() => {
                      console.log(slot);
                      setSelectedSlot(slot);
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
      <StepTitle number={2} className="mt-20">
        Fill Personal Information
      </StepTitle>
      <div className="flex w-full flex-col items-center">
        <form className="w-full">
          <Row gutter={[48, 24]} className="mb-4">
            <Col span={12} className="flex flex-row gap-4 items-center">
              <Label htmlFor="name">Email: </Label>
              <Input
                name="email"
                id="email"
                size="large"
                value={"yarora_be20@thapar.edu"}
                disabled
              />
            </Col>
            <Col span={12} className="flex flex-row gap-2">
              <Button type="primary" className="bg-sky-400 w-full h-full">
                <span className="items-center justify-center text-base font-semibold">
                  Autofill form based on last record
                </span>
              </Button>
            </Col>

            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                size="large"
                placeholder="Joe Smith"
              />
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="rollno">Roll Number | TIET Application No</Label>
              <InputNumber
                max={999999999}
                maxLength={9}
                name="rollno"
                id="rollno"
                size="large"
                className="w-full"
                placeholder="XXXXXXXXX"
              />
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                name="branch"
                id="branch"
                size="large"
                placeholder="COE, COPC, ENC.."
              />
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="year">Year of Study</Label>
              <InputNumber
                max={4}
                maxLength={1}
                name="year"
                id="year"
                size="large"
                className="w-full"
                placeholder="2"
              />
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                id="gender"
                size="large"
                placeholder="Select Gender"
                options={[
                  {
                    value: "Male",
                    label: "Male",
                  },
                  {
                    value: "Female",
                    label: "Female",
                  },
                  {
                    value: "Other",
                    label: "Other",
                  },
                ]}
              ></Select>
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <InputNumber
                addonBefore="+91"
                max={9999999999}
                maxLength={10}
                name="phone"
                id="phone"
                size="large"
                className="w-full"
                placeholder="XXXXXXXXXX"
              />
            </Col>
            <Col span={24} className="">
              <Checkbox className="text-base mt-4">
                I give consent to share my data with TICC for record purposes. I
                am aware that I need to visit G-block Room No. 105-104 for the
                offline session.
              </Checkbox>
            </Col>
            <Col span={24} className="">
              <Button type="primary" className="bg-sky-400 w-full h-full">
                <span className="py-1.5 items-center justify-center text-base font-semibold">
                  Book Appointment
                </span>
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default Form;
