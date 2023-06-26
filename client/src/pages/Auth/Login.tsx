import { Button, Col, Input, Row } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Label } from "../../components/common/Label";
import { useContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    axios
      .post(`${API_BASE_URL}auth/login/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        authCtx.login({
          token: res.data.token,
          userDetails: res.data.user,
          studentDetails: res.data.student,
        });
      })
      .then(() => {
        setTimeout(() => {
          authCtx.user?.is_ticc_counsellor
            ? navigate("/dashboard")
            : navigate("/book");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center p-3">
      <form className="w-full max-w-lg" onSubmit={handleSubmit} method="post">
        <Row gutter={[48, 24]} className="mb-4">
          <Col span={24} className="flex flex-col gap-2 items-start">
            <Label htmlFor="email">Email: </Label>
            <Input
              name="email"
              id="email"
              size="large"
              value={email}
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>

          <Col span={24} className="flex flex-col gap-2 items-start">
            <Label htmlFor="password">Password: </Label>
            <Input
              name="password"
              id="password"
              size="large"
              value={password}
              required
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              addonAfter={
                !showPassword ? (
                  <EyeOutlined
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )
              }
            />
          </Col>
          <Col span={24} className="">
            <Button
              type="primary"
              className="bg-sky-400 w-full h-full"
              htmlType="submit"
            >
              <span className="py-1.5 items-center justify-center text-base font-semibold">
                Login
              </span>
            </Button>
          </Col>
          <span className="px-6 text-center w-full">
            Login valid only through thapar.edu emails.{" "}
          </span>
        </Row>
      </form>
    </div>
  );
};

export default Login;
