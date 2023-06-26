import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { useQueryClient } from "react-query";

const Logout = () => {
  const authCtx = useContext(AuthContext);
  const queryClient = useQueryClient();
  useEffect(() => {
    authCtx.logout(queryClient);
  }, []);
  return <div>Logout</div>;
};

export default Logout;
