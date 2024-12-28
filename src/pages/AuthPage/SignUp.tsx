import React, { useEffect, useState } from "react";

import { Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signin, signup } from "../../actions/userAction";
import { useSelector } from "react-redux";
import { FORGET_PASSWORD, SIGN_IN } from "../../routes/routes";
import {
  ALLY_USER_ROLE,
  MASTER_USER_ROLE,
  USER_SIGNUP_RESET,
} from "../../constants/userConstants";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [userType, setUserType] = useState<any>(MASTER_USER_ROLE);

  const userSignup = useSelector((state: any) => state.userSignup);
  const { loading, error, success, userInfo } = userSignup;

  console.log("userInfo : ", userInfo);

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (error) {
      console.log("Error in signup : ", error);
      alert(error);
      dispatch({ type: USER_SIGNUP_RESET });
    }
    if (success) {
      reset();
      dispatch({ type: USER_SIGNUP_RESET });
      navigate("/");
    }
  }, [dispatch, error, success]);

  const validateSignUp = () => {
    if (password.length < 8) {
      alert("Password length must be atleast 8");
      return false;
    } else if (password != confirmPassword) {
      alert("Password amd confirm password mismatch");
      setPassword("");
      setConfirmPassword("");
      return false;
    } else {
      return true;
    }
  };

  const onFinish = (values: any) => {
    if (validateSignUp()) {
      dispatch(
        signup({
          name,
          email,
          password,
          isBrand: userType === ALLY_USER_ROLE ? true : false,
          isMaster: userType === MASTER_USER_ROLE ? true : false,
          primaryUserId: "669002c8f3a1bdb18da55404",
          primaryUserEmail: "prooh.aiaws@gmail.com",
          userRole: "secondary",
        })
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[90%] lg:w-[400px] rounded-[15px] shadow-lg bg-white px-5 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col gap-4">
          <h1 className="items-center text-xl font-bold">Welcome Planner</h1>

          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={
                <h1 className="items-center text-[16px] font-bold text-[#555555]">
                  Name
                </h1>
              }
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                // addonBefore={<AiOutlineUser color="#555555" />}
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                size="large"
                style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <h1 className="items-center text-[16px] font-bold text-[#555555]">
                  Email
                </h1>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                // addonBefore={<AiOutlineUser color="#555555" />}
                value={email}
                placeholder="Enter username or email"
                onChange={(e) => setEmail(e.target.value)}
                size="large"
                style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <h1 className="items-center text-[16px] font-bold text-[#555555]">
                  Password
                </h1>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
                style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <h1 className="items-center text-[16px] font-bold text-[#555555]">
                  Confirm Password
                </h1>
              }
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Confirm password"
                value={password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="large"
                style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "0", paddingTop: "20px" }}>
              <div className="pt-2 flex flex-col gap-4">
                <button
                  className="w-full bg-[#6A0572] text-[#ffffff] text-xl py-2 rounded-md"
                  type={"submit"}
                >
                  {loading ? "Please wait..." : "Sign Up"}
                </button>
              </div>
            </Form.Item>
            <div className="flex items-center justify-center gap-2 pt-4">
              <p className="text-sm text-black font-semibold">
                Already have an account?
              </p>
              <p
                className="text-sm font-semibold text-blue-600 cursor-pointer underline"
                onClick={() => navigate(SIGN_IN)}
              >
                Login Now
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
