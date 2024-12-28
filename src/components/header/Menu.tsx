import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../actions/userAction";
import { SIGN_IN, MY_CREATIVES } from "../../routes/routes";
import { useState } from "react";

export const Menu = (props: any) => {
  const { userInfo } = props;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const signOutHandler = () => {
    toggleDropdown();
    dispatch(signout());
    navigate(SIGN_IN);
  };

  const arr =
    userInfo?.userRole === "secondary"
      ? [
          {
            label: "Screens List",
            path: "/screens-list",
          },
          {
            label: "Campaigns List",
            path: "/campaigns-list",
          },
        ]
      : [
          {
            label: "Creatives",
            path: MY_CREATIVES,
          },
          {
            label: "Create Campaign",
            path: "/create-campaign",
          },
          {
            label: "Campaigns List",
            path: "/campaigns-list",
          },
          {
            label: "Screens List",
            path: "/screens-list",
          },
          {
            label: "Monitoring",
            path: "/screen-campaign-monitoring",
          },
        ];

  return (
    <div className="relative inline-block text-left">
      <i
        className="fi fi-ss-angle-down flex items-center cursor-pointer"
        onClick={toggleDropdown}
      ></i>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)} // Close dropdown on mouse leave
          className="absolute z-10 mt-2 w-[200px] bg-white border border-gray-300 rounded-md shadow-lg right-0 font-normal text-md text-black-1000"
        >
          {arr?.map((data: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                toggleDropdown();
                navigate(data.path);
              }}
              className="px-4 py-2  text-gray-700 hover:bg-sky-600 hover:text-white  hover:font-semibold  hover:text-md cursor-pointer"
            >
              {data?.label}
            </div>
          ))}
          <div
            onClick={signOutHandler}
            className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
};
