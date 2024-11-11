import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../actions/userAction";
import { USER_UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UpdatePassword = (props: any) => {
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const dispatch = useDispatch<any>();
  const naviaget = useNavigate();
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
      naviaget("/signin");
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
    <div className="flex justify-center pt-16">
      <div className="border border-solid p-8 gap-2 w-full max-w-96 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl py-2 text-blue-600 font-bold">
            Set New Password
          </h1>
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
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
              className="border border-solid px-4 py-2 bg-red-500/75 rounded-md text-white w-96"
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
