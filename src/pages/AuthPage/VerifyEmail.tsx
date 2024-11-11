import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userEmailVerification } from "../../actions/userAction";
import { useSelector } from "react-redux";
import { USER_EMAIL_VERIFICATION_RESET } from "../../constants/userConstants";
import { HOME } from "../../routes/routes";

export const VerifyEmail = (props: any) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const emailVerify = useSelector((state: any) => state.emailVerify);
  const { error, success, data } = emailVerify;

  useEffect(() => {
    if (success && data) {
      console.log("Email verified success");
      alert("Thank you for joining with us....");
      if (data.isMaster) {
        navigate("/screens");
      } else {
        navigate("/");
      }
    }
    if (error) {
      console.log("Email verification error : ", error);
      dispatch({ type: USER_EMAIL_VERIFICATION_RESET });
    }
  }, [error, success, data, navigate, dispatch]);
  console.log("token : ", searchParams.get("token"));

  const verifyUser = useCallback( async(token: string) => {
    dispatch(userEmailVerification(token));
  }, [dispatch]);

  useEffect(() => {
    verifyUser(searchParams.get("token") || "");
  }, [searchParams, verifyUser]);

  return (<div className="flex justify-center">
    <h1 onClick={() => navigate(HOME)}>Your are a verified user now. Click here to proceed...</h1>
  </div>);
};
