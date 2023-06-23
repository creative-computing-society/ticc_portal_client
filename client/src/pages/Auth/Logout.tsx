import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";

const Logout = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.logout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
