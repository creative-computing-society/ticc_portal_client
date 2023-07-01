import { Table, TableProps } from "antd";

const DashTable: React.FC<{
  columns: TableProps<any>["columns"];
  dataSource: any[];
}> = ({ columns, dataSource }) => {
  return (
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 8 }}
      scroll={{ y: 240 }}
    />
  );
};

export default DashTable;
