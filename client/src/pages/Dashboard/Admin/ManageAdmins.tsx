import { Table } from "antd";
import SearchBar from "../../../components/Dashboard/Admin/Search";
import { columnsAdmins } from "./config";
import DashTable from "../../../components/Dashboard/Admin/Table";

const ManageAdmins: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8 ">Manage Admins</h1>
      <SearchBar placeholder="Search student by email or name to add as admin" />
      <div className="my-12">
        <h3 className="text-2xl font-medium my-3">Current Admins</h3>
        <DashTable columns={columnsAdmins} dataSource={[]} />
      </div>
    </div>
  );
};

export default ManageAdmins;
