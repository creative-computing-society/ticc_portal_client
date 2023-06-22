import { InputRef, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getStudentListBySearchQuery } from "../../../api/query/users";
import { useQueryClient } from "react-query";
const { Option } = Select;

const DUMMY_DATA = [
  {
    id: 1,
    user: {
      id: 2,
      email: "vibhavgod1@test.com",
      full_name: "Yashvardhan Arora",
      phone_number: "9625056985",
      is_ticc_counsellor: true,
      is_ticc_manager: false,
    },
    roll_number: null,
    branch: null,
    admission_year: null,
    gender: null,
  },
  {
    id: 2,
    user: {
      id: 4,
      email: "student@test.com",
      full_name: "Student 1",
      phone_number: "1234567890",
      is_ticc_counsellor: false,
      is_ticc_manager: false,
    },
    roll_number: "102003772",
    branch: "COE",
    admission_year: 2020,
    gender: "M",
  },
];

const SearchBar: React.FC<SelectProps<any>> = ({ placeholder, ...rest }) => {
  const [searchWord, setSearchWord] = useState("");
  const { data, isLoading } = getStudentListBySearchQuery(searchWord);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchWord.length > 2) {
      const timer = setTimeout(() => {
        queryClient.invalidateQueries(["student", "search", searchWord]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [searchWord]);

  const navigate = useNavigate();

  return (
    <div className="w-full my-4 relative">
      <Select
        showSearch
        size="large"
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(e) => console.log(e)}
        onSearch={(e) => setSearchWord(e)}
        // filterOption={(input, option) =>
        //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        // }
        onSelect={(value) => {
          navigate(`/dashboard/students/${value}`);
        }}
        suffixIcon={<SearchOutlined />}
        className="w-full"
      >
        {DUMMY_DATA.map((option, index: number) => (
          <Option value={option.id} key={index}>
            <div className="flex flex-row items-center p-2 ">
              <span className="w-1/3">{option.user.full_name}</span>
              <span className="w-1/3">{option.user.email}</span>
              <span className="w-1/3 text-right">
                {option.user.phone_number}
              </span>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchBar;
