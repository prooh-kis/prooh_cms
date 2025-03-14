import { useNavigate } from "react-router-dom";
import { ADD_NEW_USER, SIGN_IN } from "../../routes/routes";
import {
  SCREEN_ADMIN,
  SCREEN_OWNER,
  USER_DELETE_RESET,
  USERS_GET_CMS,
} from "../../constants/userConstants";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { deleteUser, getUserList } from "../../actions/userAction";
import { AddUserDetails } from "../../components/popup/AddUserDetails";
import { PrimaryButton } from "../../components/index";
import userImage from "../../assets/userImage.png";
import { Tooltip } from "antd";

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

  const roleList = [
    "screenManager",
    "screenMonitoring"
  ]
  if (userInfo?.userRole == SCREEN_ADMIN) {
    roleList.push("screenOwner")
  }

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
    <div className="w-full h-full">
      {open && <AddUserDetails open={open} onClose={toggleOpen} roleList={roleList} />}
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

      <div className="w-full h-[85vh] overflow-scroll mt-1">
        <table className="w-full ">
          <thead className="bg-[#EBF6FF]">
            <tr>
              <th className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                  Sl No.
                </div>
              </th>
              <th className="py-2 px-1">
                <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                  User Name
                </div>
              </th>
              <th className="py-2 px-1">
                <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                  User Role
                </div>
              </th>
              <th className="py-2 px-1">
                <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                  User Email
                </div>
              </th>
              {userInfo?.userRole != SCREEN_ADMIN ? null : 
                <th className="py-2 px-1">
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                    Action
                  </div>
                </th>
              }
            </tr>
          </thead>
          <tbody className="bg-white">
            {users
              ?.map((s: any, i: number) => (
                <tr key={i} className="border-b hover:bg-gray-200">
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                      {i+1}
                    </div>
                  </td>
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                      {s.name}
                    </div>
                  </td>
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                      {s.userRole}
                    </div>
                  </td>
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                      {s.email}
                    </div>
                  </td>
                  {userInfo?.userRole != SCREEN_ADMIN ? null : 
                    <td className="py-2 px-1">
                      <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                        <i
                          className="fi fi-rs-trash text-red-500"
                          title="delete user"
                          onClick={() => handleDeleteUser(s?._id)}
                        ></i>
                      </div>
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
