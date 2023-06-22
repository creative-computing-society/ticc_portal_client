import { Button, Checkbox, Col, Image, InputNumber, Row, Select } from "antd";
import dayjs from "dayjs";
import banner from "../../assets/banner.png";
import { useContext, useEffect, useState } from "react";
import Guidlines from "../../components/Form/Guidelines";
import StepTitle from "../../components/common/StepTitle";
import { Label } from "../../components/common/Label";
import Input from "antd/es/input/Input";
import SlotPicker from "../../components/common/SlotPicker";
import AuthContext from "../../store/auth-context";
import { getSlotsByDate } from "../../api/query/slots";
import usersApi from "../../api/users";

const Form: React.FC = () => {
  // create DayJs object for today and 3 weeks from now
  const authCtx = useContext(AuthContext);
  // const slotsQuery = getSlotsByDate("2023-06-24", "2023-06-29");
  // console.log(slotsQuery.data);

  // const userData = getLoggedInUserDetails();
  // console.log(userData.data);

  useEffect(() => {
    usersApi
      .getLoggedInUserDetails()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [selectedSlot, setSelectedSlot] = useState<dayjs.Dayjs | null>(null);
  const [consent, setConsent] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto h-full overflow-y-scroll overflow-x-hidden">
      <Image src={banner} preview={false} className="rounded-lg" />
      <h1 className="text-5xl font-semibold p-2 mt-3">
        Walk-in Session Slot Booking
      </h1>
      <h4 className="text-lg font-normal mb-8">We are listening.</h4>
      <Guidlines />
      <StepTitle number={1}>Select date and time</StepTitle>
      <SlotPicker onSelectSlot={setSelectedSlot} />
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
                value={authCtx.user?.email}
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
              <Checkbox
                className="text-base mt-4"
                checked={consent}
                onChange={() => {
                  setConsent(!consent);
                }}
              >
                I give consent to share my data with TICC for record purposes. I
                am aware that I need to visit G-block Room No. 105-104 for the
                offline session.
              </Checkbox>
            </Col>
            <Col span={24} className="">
              <Button
                type="primary"
                className="bg-sky-400 w-full h-full"
                disabled={!consent}
              >
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
