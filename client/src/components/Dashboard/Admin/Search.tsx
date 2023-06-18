import { InputRef, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;

const SearchBar: React.FC<SelectProps<any>> = ({ placeholder, ...rest }) => {
  const [results, setResults] = useState([
    "Result 1",
    "Result 2",
    "Result 3",
    "Result 4",
    "Result 5",
    "Result 6",
  ]);

  const navigate = useNavigate();

  return (
    <div className="w-full my-4 relative">
      <Select
        showSearch
        size="large"
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(e) => console.log(e)}
        onSearch={(e) => console.log(e)}
        // filterOption={(input, option) =>
        //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        // }
        onSelect={(value) => {
          navigate(`/dashboard/students/${value}`);
        }}
        suffixIcon={<SearchOutlined />}
        className="w-full"
      >
        {results.map((result, index) => (
          <Option value={result} label={result}>
            {result}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchBar;
