import { InputRef, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const SearchBar: React.FC<SelectProps<any>> = ({ placeholder, ...rest }) => {
  const [showResults, setShowResults] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([
    "Result 1",
    "Result 2",
    "Result 3",
    "Result 4",
    "Result 5",
    "Result 6",
  ]);

  useEffect(() => {
    if (searchWord.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchWord]);

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
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
        suffixIcon={<SearchOutlined />}
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;
