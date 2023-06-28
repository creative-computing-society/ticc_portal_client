import { Select, SelectProps, Spin } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getStudentListBySearchQuery } from "../../../api/query/users";
import { debounce } from "lodash";
const { Option } = Select;

const SearchBar: React.FC<SelectProps<any>> = ({
  placeholder,
  onSelect,
  ...rest
}) => {
  const [searchWord, setSearchWord] = useState("");
  const [fetching, setFetching] = useState(false);
  const { data, isLoading } = getStudentListBySearchQuery(searchWord);

  const debouncedSearch = debounce((value) => {
    setSearchWord(value);
  }, 1500);

  const handleSearch = (value: string) => {
    setFetching(true);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (!isLoading) {
      setFetching(false);
    }
  }, [data]);

  return (
    <div className="w-full my-4 relative">
      <Select
        showSearch
        showArrow={false}
        size="large"
        placeholder={placeholder}
        notFoundContent={
          fetching ? (
            <div className="w-full p-4 flex">
              {" "}
              <Spin size="default" className="mx-auto" />{" "}
            </div>
          ) : null
        }
        onSearch={handleSearch}
        filterOption={false}
        onSelect={onSelect}
        suffixIcon={<SearchOutlined />}
        className="w-full"
      >
        {data &&
          data.map((option, index: number) => (
            <Option value={option.user.id} key={index}>
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
