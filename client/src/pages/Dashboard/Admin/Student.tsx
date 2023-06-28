import { useParams } from "react-router-dom";
import { getStudentDetailsByUserId } from "../../../api/query/users";

const Student: React.FC = () => {
  const { id } = useParams();
  const { data } = getStudentDetailsByUserId(Number(id));
  console.log(data);
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex">
        {/* Create table with 2 columns, for displaying info of student */}
        <table className="w-full text-lg">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Name:</td>
              <td className="border px-4 py-2">{data?.user.full_name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Email:</td>
              <td className="border px-4 py-2">{data?.user.email}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Phone:</td>
              <td className="border px-4 py-2">{data?.user.phone_number}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Roll Number:</td>
              <td className="border px-4 py-2">{data?.roll_number}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Branch:</td>
              <td className="border px-4 py-2">{data?.branch}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">
                Admission Year:
              </td>
              <td className="border px-4 py-2">{data?.admission_year}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Gender:</td>
              <td className="border px-4 py-2">{data?.gender}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
