import "./index.css";
// import userImage from "../../assets/userImage.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../actions/userAction";
import { AUTH, CAMPAIGNS_DETAILS, CAMPAIGNS_LIST, MY_CREATIVES, SCREEN_CAMPAIGN_MONITORING, SCREENS_LIST } from "../../routes/routes";

export const Menu = (props: any) => {
  const { userInfo } = props;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const signOutHandler = () => {
    dispatch(signout());

    navigate(AUTH);
  };

  return (
    <div className="dropdown">
      <i className="fi fi-ss-angle-down flex items-center"></i>
      <div className="dropdown-content">
        <div
          onClick={() => navigate(SCREENS_LIST)}
          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdOutlinePermMedia className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">Screens</h1>
        </div>
        <div
          onClick={() => navigate(CAMPAIGNS_LIST)}

          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdOutlinePermMedia className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">Campaigns</h1>
        </div>
        <div
          onClick={() => navigate(MY_CREATIVES)}
          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdOutlinePermMedia className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">Creatives</h1>
        </div>
        <div
          onClick={() => navigate(SCREEN_CAMPAIGN_MONITORING)}
          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdOutlinePermMedia className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">Monitoring</h1>
        </div>
        <div
          onClick={signOutHandler}
          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <IoMdPower className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">Log out</h1>
        </div>
      </div>
    </div>
  );
};
