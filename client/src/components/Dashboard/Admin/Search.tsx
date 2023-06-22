import { InputRef, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getStudentListBySearchQuery } from "../../../api/query/users";
import { useQueryClient } from "react-query";
const { Option } = Select;

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
        {data &&
          data.map((result: any, index: number) => (
            <Option value={result} label={result} key={index}>
              {result}
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default SearchBar;
