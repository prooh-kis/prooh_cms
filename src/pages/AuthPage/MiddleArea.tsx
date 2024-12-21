import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/valueValidate";
import { signin, signup } from "../../actions/userAction";
import {
  ALLY_USER_ROLE,
  MASTER_USER_ROLE,
  USER_SIGNOUT,
  USER_SIGNUP_RESET,
} from "../../constants/userConstants";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";

export function MiddleArea(props: any) {

  const [option, setOption] = useState<string>("signin");
  const navigate = useNavigate();
  const [signInText, setSignInText] = useState<string>("Sign In");
  const dispatch = useDispatch<any>();
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>(
    localStorage.getItem("myapp-email") || ""
  );
  const [password, setPassword] = useState<any>(
    localStorage.getItem("myapp-password") || ""
  );
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [userType, setUserType] = useState<any>(MASTER_USER_ROLE);

  const validateForm = () => {
    if (email.lenght == 0) {
      alert("Enter your email");
      return false;
    } else if (name === "") {
      alert("Enter your name");
      return false;
    } else if (!isValidEmail(email)) {
      alert("Please enter valid email");
      return false;
    } else if (password.length < 8) {
      alert("Password length must be atleast 8");
      return false;
    } else if (password != confirmPassword) {
      alert("Password amd confirm password mismatch");
      setPassword("");
      setConfirmPassword("");
      return false;
    } else if (userType === null) {
      alert("Please select user role");
      return false;
    } else {
      return true;
    }
  };
  const validateSignIn = () => {
    if (email.lenght == 0) {
      alert("Enter your email");
      return false;
    } else if (!isValidEmail(email)) {
      alert("Please enter valid email");
      return false;
    } else if (password.length === 0) {
      alert("Please enter password");
      return false;
    } else {
      return true;
    }
  };
  const handleSignUp = () => {
    if (validateForm()) {
      dispatch(
        signup({
          name,
          email,
          password,
          isBrand: userType === ALLY_USER_ROLE ? true : false,
          isMaster: userType === MASTER_USER_ROLE ? true : false,
          // static primary user data for new planner (secondary user)
          primaryUserId: "669002c8f3a1bdb18da55404",
          primaryUserEmail: "prooh.aiaws@gmail.com",
          userRole: "secondary"
        })
      );
    }
  };

  const handleSignIn = () => {
    setSignInText("Loading....");
    dispatch({ type: USER_SIGNOUT });
    if (validateSignIn()) {
      dispatch(signin(email, password));
    }
  };
  // auth
  const userSignin = useSelector((state: any) => state.userSignin);
  const {
    error: errorSignIn,
    success: successSignin,
    userInfo: userInfo1,
  } = userSignin;

  const userSignup = useSelector((state: any) => state.userSignup);
  const { loading, error, success, userInfo } = userSignup;

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const rememberMe = (e: any) => {
    if (e.target.checked) {
      localStorage.setItem("myapp-email", email);
      localStorage.setItem("myapp-password", password);
    } else {
      localStorage.setItem("myapp-email", "");
      localStorage.setItem("myapp-password", "");
    }
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
      alert(userInfo);
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    if (errorSignIn) {
      alert(errorSignIn);

      console.log("errorSignIn in signup : ", errorSignIn);
      dispatch({ type: USER_SIGNOUT });
    }
    if (userInfo1) {
      console.log("signin success");
      reset();
      navigate("/");
    }
  }, [dispatch, errorSignIn, navigate, userInfo1]);

  return (
    <div className="flex justify-center pt-16 ">
      <div className="border border-solid rounded p-8 gap-2 w-full max-w-[480px] ">
        <div className="flex flex-row justify-between pb-2">
          <button
            className={
              option === "signin"
                ? "flex justify-center text-white text-center p-2 border border-solid rounded-l w-96 bg-primaryButton"
                : "flex justify-center text-center p-2 border border-solid w-96 rounded-l"
            }
            onClick={() => setOption("signin")}
          >
            Sign In
          </button>
          <button
            className={
              option === "signup"
                ? "flex justify-center text-white text-center p-2 border border-solid rounded-r w-96 bg-primaryButton"
                : "flex justify-center text-center p-2 border border-solid w-96 rounded-r"
            }
            onClick={() => setOption("signup")}
          >
            Sign Up
          </button>
        </div>
        {/* signin */}
        {option === "signin" && (
          <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
              <label>Password*</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
                className="border border-solid rounded p-2"
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <input
                  title="q"
                  type="checkbox"
                  onClick={rememberMe}
                  id="rememberMe"
                />
                <label className="text-sm" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <h1
                className="text-sm text-blue-500 cursor-pointer"
                onClick={() => navigate("/forget-password")}
              >
                Forget Password
              </h1>
            </div>
            <div className="flex justify-center pt-4">
              <button
                id=""
                type="submit"
                className="w-full rounded-md bg-primaryButton text-white h-12"
                onClick={handleSignIn}
              >{signInText}</button>
            </div>
          </div>
        )}
        {/* signup form */}
        {option === "signup" && (
          <div>
            {success ? (
              <h1 className="text-[12px] text-blue-500">
                User Registration successfull, please check your email and verify for proceeding further...
              </h1>
            ) : (
              <div className="flex flex-col gap-2">
                <h1 className="flex justify-center py-2">Welcome Planner</h1>
                <div className="flex flex-col gap-2">
                  <label>Name*</label>
                  <input
                    type=""
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Enter name"
                    className="border border-solid rounded p-2"
                  />
                </div>
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
                <div className="flex flex-col gap-2">
                  <label>Password*</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter password"
                    className="border border-solid rounded p-2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Confirm Password*</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    placeholder="Enter confirm password"
                    className="border border-solid rounded p-2"
                  />
                </div>
                <div className="gap-2">
                  <h4 className="text-sm text-red-500 pt-4">
                    {`Note: Once your profile is created, you can't modify it without proper approval`}
                  </h4>
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    id=""
                    type="submit"
                    className="w-full rounded-md border h-12 bg-primaryButton text-white"
                    onClick={handleSignUp}
                    disabled={loading}
                  >{loading ? "Creating user" : "Sign Up"}</button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
