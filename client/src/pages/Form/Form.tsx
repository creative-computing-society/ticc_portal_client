import {
  Button,
  Checkbox,
  Col,
  Image,
  InputNumber,
  Row,
  Select,
  notification,
} from "antd";
import banner from "../../assets/banner.png";
import { useContext, useEffect, useState } from "react";
import Guidlines from "../../components/Form/Guidelines";
import StepTitle from "../../components/common/StepTitle";
import { Label } from "../../components/common/Label";
import Input from "antd/es/input/Input";
import SlotPicker from "../../components/common/SlotPicker";
import AuthContext from "../../store/auth-context";
import {
  getLoggedInStudentDetails,
  getLoggedInUserDetails,
} from "../../api/query/users";
import { ISlotObject, IStudentObject } from "../../types";
import {
  updatePhoneNumber,
  updateStudentDetails,
} from "../../api/mutations/users";
import { useQueryClient } from "react-query";
import TextArea from "antd/es/input/TextArea";
import { bookSlot } from "../../api/mutations/bookings";

const Form: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Query
  const { data } = getLoggedInStudentDetails(authCtx);
  const { data: userData } = getLoggedInUserDetails(authCtx);

  const [studentData, setStudentData] = useState<IStudentObject>({
    id: data?.id || 0,
    user: {
      id: data?.user?.id || 0,
      email: data?.user?.email || "",
      full_name: data?.user?.full_name || "",
      phone_number: data?.user?.phone_number || "",
      is_ticc_manager: data?.user?.is_ticc_manager || false,
      is_ticc_counsellor: data?.user?.is_ticc_counsellor || false,
    },
    roll_number: data?.roll_number || "",
    branch: data?.branch || "",
    admission_year: data?.admission_year || 0,
    gender: data?.gender || "",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>(
    data?.user?.phone_number || ""
  );
  const [info, setInfo] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<ISlotObject | null>(null);
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;
    setStudentData(data);
    setPhoneNumber(data.user.phone_number);
  }, [data]);

  //mutations
  const { mutate: mutateUpdatePhoneNumber } = updatePhoneNumber(
    queryClient,
    phoneNumber
  );
  const { mutate: mutateUpdateStudentDetails } = updateStudentDetails(
    queryClient,
    {
      roll_number: studentData.roll_number || undefined,
      branch: studentData.branch || undefined,
      admission_year: studentData.admission_year || undefined,
      gender: studentData.gender || undefined,
    }
  );
  const { mutate: mutateBookSlot, data: bookingData } = bookSlot(
    queryClient,
    selectedSlot?.id || 0,
    info
  );

  const studentDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // check if phone number has been changed
    // if yes, then update the phone number
    // if no, then just update the student details
    if (!data) return;
    // check if any field in studentData is empty, if yes, then return
    if (!selectedSlot || !consent) return;
    if (!phoneNumber || !studentData.gender) return;

    if (phoneNumber !== data.user.phone_number) {
      mutateUpdatePhoneNumber();
    }

    if (data.roll_number === null || data.branch !== studentData.branch) {
      mutateUpdateStudentDetails();
    }

    mutateBookSlot();
  };

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
      <StepTitle number={2} className="mt-16">
        Fill Personal Information
      </StepTitle>
      <div className="flex w-full flex-col items-center">
        <form className="w-full" onSubmit={handleSubmit} method="post">
          <Row gutter={[48, 24]} className="mb-4">
            <Col span={12} className="flex flex-row gap-4 items-center">
              <Label htmlFor="email">Email: </Label>
              <Input
                name="email"
                id="email"
                size="large"
                value={authCtx.user?.email}
                disabled
                required
              />
            </Col>
            <Col span={12} className="flex flex-row gap-2">
              <span className="items-center justify-center text-base font-medium py-2 mx-1 text-center flex-grow bg-sky-400 bg-opacity-10 outline outline-sky-400 rounded-md">
                First time users must fill this form correctly
              </span>
            </Col>

            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                size="large"
                placeholder="Joe Smith"
                disabled={!!data?.user.full_name}
                value={data?.user.full_name}
                required
              />
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="roll_number">
                Roll Number | TIET Application No
              </Label>
              <Input
                maxLength={9}
                name="roll_number"
                id="roll_number"
                size="large"
                className="w-full"
                placeholder="XXXXXXXXX"
                disabled={!!data?.roll_number}
                value={studentData?.roll_number || ""}
                onChange={studentDataChangeHandler}
                required
              />
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                name="branch"
                id="branch"
                size="large"
                placeholder="COE, COPC, ENC.."
                value={studentData?.branch || ""}
                onChange={studentDataChangeHandler}
                required
              />
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="admission_year">Year of Admission</Label>
              <InputNumber
                maxLength={4}
                name="admission_year"
                id="admission_year"
                size="large"
                className="w-full"
                placeholder="2021"
                disabled={!!data?.roll_number}
                value={studentData?.admission_year}
                onChange={(value) =>
                  setStudentData((prev) => ({
                    ...prev,
                    admission_year: value,
                  }))
                }
                required
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
                    value: "M",
                    label: "Male",
                  },
                  {
                    value: "F",
                    label: "Female",
                  },
                  {
                    value: "O",
                    label: "Other",
                  },
                ]}
                disabled={!!data?.roll_number}
                value={studentData?.gender}
                onChange={(value) =>
                  setStudentData((prev) => ({
                    ...prev,
                    gender: value,
                  }))
                }
              ></Select>
            </Col>
            <Col span={12} className="flex flex-col gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                addonBefore="+91"
                maxLength={10}
                name="phone_number"
                id="phone_number"
                size="large"
                className="w-full"
                placeholder="XXXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Col>
            <Col span={24} className="flex flex-col gap-2">
              <Label htmlFor="info">Additional Info (optional)</Label>
              <TextArea
                placeholder="Write any additional message for the counsellor here..."
                rows={3}
                id="info"
                name="info"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
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
                htmlType="submit"
                className="bg-sky-400 w-full h-full"
                disabled={!consent || !selectedSlot}
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
