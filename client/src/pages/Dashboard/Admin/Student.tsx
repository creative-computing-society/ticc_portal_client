import { useParams } from "react-router-dom";
import { getStudentDetailsByUserId } from "../../../api/query/users";

const Student: React.FC = () => {
  const { id } = useParams();
  const { data } = getStudentDetailsByUserId(Number(id));
  console.log(data);
  return <div></div>;
};

export default Student;
