import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../actions/userAction";
import { USER_UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UpdatePassword = (props: any) => {
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userUpdatePassword = useSelector(
    (state: any) => state.userUpdatePassword
  );
  const { error, success, data } = userUpdatePassword;

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
    }
    if (success) {
      alert(data);
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
      navigate("/signin");
    }
  }, [error, success]);

  const validateForm = () => {
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

  //   userUpdatePassword

  const handleSavePassword = () => {
    if (validateForm()) {
      dispatch(updateUserPassword(searchParams.get("email") || "", password));
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 h-full">
      <div className="w-[90%] lg:w-[400px] rounded-[15px] bg-white px-5 lg:px-8 py-6 lg:py-10 shadow-lg">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl py-2 text-[#129BFF] font-bold">
            Set New Password
          </h1>
          <div className="flex flex-col gap-1">
            <label>New Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter new password"
              className="border border-solid rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Confirm New Password*</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Enter confirm new password"
              className="border border-solid rounded p-2"
            />
          </div>
          <div className="flex justify-center pt-4">
            <button
              className="border border-solid px-4 py-2 bg-red-500/75  text-white w-96"
              onClick={handleSavePassword}
            >
              Save New Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
