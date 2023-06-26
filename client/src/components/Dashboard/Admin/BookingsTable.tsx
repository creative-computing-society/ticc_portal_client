import { TableProps } from "antd";
import DashTable from "./Table";

const BookingsTable: React.FC<{
  columns: TableProps<any>["columns"];
  params: {
    userId?: string;
    isActive?: boolean;
    date?: string;
  };
}> = ({ params, columns }) => {
  return <DashTable columns={columns} dataSource={[]} />;
};

export default BookingsTable;
