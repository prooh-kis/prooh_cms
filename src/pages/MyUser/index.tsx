import { useNavigate } from "react-router-dom";
import { ADD_NEW_USER, SIGN_IN } from "../../routes/routes";
import {
  SCREEN_ADMIN,
  SCREEN_OWNER,
  USER_DELETE_RESET,
  USERS_GET_CMS,
} from "../../constants/userConstants";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getUserList } from "../../actions/userAction";
import { AddUserDetails } from "../../components/popup/AddUserDetails";
import { PrimaryButton } from "../../components/index";

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

  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setOpen((pre: boolean) => !pre);
  }, [open]);

  useEffect(() => {
    if (success) {
      alert(userDeleteMessage);
      dispatch({ type: USER_DELETE_RESET });
      dispatch(getUserList({ event: USERS_GET_CMS }));
    }
    if (errorUserDelete) {
      alert(errorUserDelete);
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [errorUserDelete, errorUserDelete, success]);

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } else {
      if (userInfo?.userRole != SCREEN_ADMIN && userInfo?.userRole != SCREEN_OWNER) {
        alert("You have no access to this page");
        navigate(-1);
      } else {
        dispatch(getUserList({ event: USERS_GET_CMS }));
      }
    }
  }, [userInfo]);

  return (
    <div className="w-full h-full ">
      {open && <AddUserDetails open={open} onClose={toggleOpen} />}
      <div className="flex flex-row justify-between border rounded p-4 w-full bg-white">
        <h1 className="text-[16px] font-semibold">Users</h1>
        <div className="flex items-center w-50">
          <PrimaryButton
            action={toggleOpen}
            title="+ Add User"
            rounded="rounded-lg"
            height="h-8"
            width="w-32"
            textSize="text-[12px] font-semibold"
            reverse={true}
            loading={false}
            loadingText="Saving..."
          />
        </div>
      </div>

      <div className="w-full mt-1">
        <table className="auto w-full">
          <thead>
            <tr className="bg-sky-200">
              <th className="border py-2">Sl. No</th>
              <th className="border ">Name</th>
              <th className="border ">Email</th>
              <th className="border ">User Role</th>
              {userInfo?.userRole != SCREEN_ADMIN ? null : <th className="border ">Actions</th>}
            </tr>
          </thead>
          <tbody className="overflow-auto mt-4">
            {users?.map((user: any, i: any) => (
              <tr className="bg-white hover:bg-gray-200" key={i}>
                <td className="border  pl-4 py-1">{i + 1}</td>
                <td className="border  pl-4">{user?.name}</td>
                <td className="border pl-4">{user.email}</td>
                <td className="border  pl-4">{user?.userRole}</td>
                {userInfo?.userRole != SCREEN_ADMIN ? null :
                  <td className="border  flex justify-center">
                    {user.userRole === SCREEN_ADMIN ? null : (
                      <i
                        className="fi fi-rs-trash text-red-500"
                        title="delete user"
                        onClick={() => handleDeleteUser(user?._id)}
                      ></i>
                    )}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
