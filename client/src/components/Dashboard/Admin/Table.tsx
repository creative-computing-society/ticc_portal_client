import { Table, TableProps } from "antd";
import { columnsAll } from "../../../pages/Dashboard/Admin/config";

const DashTable: React.FC<{
  columns: TableProps<any>["columns"];
  dataSource: any[];
}> = ({ columns, dataSource }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 240 }}
    />
  );
};

export default DashTable;
