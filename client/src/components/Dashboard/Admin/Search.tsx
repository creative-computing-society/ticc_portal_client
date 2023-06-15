import { InputRef } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";

const SearchBar: React.FC<SearchProps & React.RefAttributes<InputRef>> = ({
  placeholder,
  ...rest
}) => {
  return (
    <div className="w-full my-4">
      <Search
        {...rest}
        placeholder={placeholder}
        onSearch={(value) => console.log(value)}
        size="large"
      />
    </div>
  );
};

export default SearchBar;
