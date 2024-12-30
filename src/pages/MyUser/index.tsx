import { useNavigate } from "react-router-dom";
import { ADD_NEW_USER, SIGN_IN } from "../../routes/routes";
import {
  MASTER_USER_ROLE,
  USER_DELETE_RESET,
  USER_ROLE_PRIMARY,
  USER_ROLE_SECONDARY,
} from "../../constants/userConstants";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getUserList } from "../../actions/userAction";

export const MyUsers = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const userList = useSelector((state: any) => state.userList);
  const { loading, error, data: users } = userList;

  const userDelete = useSelector((state: any) => state.userDelete);
  const {
    loading: loadingUserDelete,
    error: errorUserDelete,
    success,
    data: userDeleteMessage,
  } = userDelete;

  useEffect(() => {
    if (success) {
      alert(userDeleteMessage);
      dispatch({ type: USER_DELETE_RESET });
      dispatch(getUserList());
    }
    if (errorUserDelete) {
      alert(errorUserDelete);
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [errorUserDelete, errorUserDelete]);

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // console.log("user role : ", userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } else {
      if (userInfo?.userRole !== USER_ROLE_PRIMARY) {
        alert("You have no access to this page");
        navigate(-1);
      } else {
        dispatch(getUserList());
      }
    }
  }, [userInfo]);

  return (
    <div className="w-full h-full p-2">
      <div className="my-1 border rounded p-4 bg-white flex justify-between">
        <h1 className="text-[24px] font-bold">User List</h1>
        {/* <button
          title="Create new user"
          className="w-36 h-10 border border-solid px-4 py-2 bg-sky-500/75 rounded-md text-white"
          onClick={() => navigate(ADD_NEW_USER)}
        >
          <div className="flex flex-row justify-center gap-2">
            <h1>+</h1>
            <h1>New User</h1>
          </div>
        </button> */}
      </div>

      <div className="w-full">
        <table className="auto w-full">
          <thead>
            <tr className="bg-sky-200">
              <th className="border py-4">Sl. No</th>
              <th className="border ">Name</th>
              <th className="border ">Email</th>
              <th className="border ">User Role</th>
              <th className="border ">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-auto mt-4">
            {users?.map((user: any, i: any) => (
              <tr className="bg-white hover:bg-gray-200" key={i}>
                <td className="border  pl-4">{i + 1}</td>
                <td className="border  pl-4">{user?.name}</td>
                <td className="border pl-4">{user.email}</td>
                <td className="border  pl-4">{user?.userRole}</td>
                <td className="border  flex justify-center">
                  {user.userRole === USER_ROLE_PRIMARY ? null : (
                    <i
                      className="fi fi-rs-trash text-red-500"
                      title="delete user"
                      onClick={() => handleDeleteUser(user?._id)}
                    ></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
