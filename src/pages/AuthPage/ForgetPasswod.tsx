import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailToResetPassword } from "../../actions/userAction";
import { SEND_EMAIL_TO_RESET_PASSWORD_RESET } from "../../constants/userConstants";
// import { sendEmailToUser } from "../../../Actions/userActions";
// import { SEND_EMAIL_TO_USER_RESET } from "../../../Constants/userConstants";

export function ForgetPassword(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<any>("");

  const userSendEmailToResetPassword = useSelector(
    (state: any) => state.userSendEmailToResetPassword
  );
  const { loading, error, success, data } = userSendEmailToResetPassword;

  useEffect(() => {
    if (success) {
      alert(data);
      dispatch({ type: SEND_EMAIL_TO_RESET_PASSWORD_RESET });
    }
    if (error) {
      alert(error);
      setEmail("");
      dispatch({ type: SEND_EMAIL_TO_RESET_PASSWORD_RESET });
    }
  }, [success, error, dispatch]);

  const handleSendEmail = () => {
    if (email) dispatch(sendEmailToResetPassword(email));
    else alert("Please enter email");
  };

  return (
    <div className="flex justify-center pt-16">
      <div className="border border-solid p-8 gap-2 w-full max-w-96 ">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl py-2 text-blue-600 font-bold">
            Forget Password
          </h1>
          {true && (
            <a
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                )
              }
            >
              click hear to inbox
            </a>
          )}
          <div className="flex flex-col gap-2">
            <label>Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email"
              className="border border-solid rounded p-2"
            />
          </div>
          <div className="flex justify-center ">
            <button
              className="border border-solid px-4 py-2 bg-red-500/75 rounded-md text-white w-96"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </div>
          <div className="flex justify-center ">
            <button
              className="border border-solid px-4 py-2 bg-sky-500/75 rounded-md text-white w-96"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
