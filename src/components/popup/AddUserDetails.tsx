import { PrimaryInput } from "../atoms/PrimaryInput";
import { message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SuggestionInput } from "../atoms/SuggestionInput";
import { addNewUser } from "../../actions/userAction";
import { USER_ADD_NEW_USER_RESET, USERS_ADD_CMS } from "../../constants/userConstants";
import { useSelector } from "react-redux";

export const AddUserDetails = ({
  onClose,
  open
}: any) => {
  const dispatch = useDispatch<any>();
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const [state, setState] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [pinCode, setPinCode] = useState<any>("");

  const userAddNewUser = useSelector((state: any) => state.userAddNewUser);
  const {
    loading,
    error,
    success,
    data: userAddNewUserData,
  } = userAddNewUser;

  useEffect(() => {
      if (success) {
        alert(userAddNewUserData.message);
        dispatch({ type: USER_ADD_NEW_USER_RESET });
        onClose()
      }
      if (error) {
        alert(error);
        dispatch({ type: USER_ADD_NEW_USER_RESET });
      }
    }, [error , success , userAddNewUserData]);

  const stateList = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const validateEmail = (emailData: any) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailData);
  };

  const validateForm = () => {
    if (name.length < 4) {
      message.error("Please enter Users Full name");
      return false;
    } else if (email.length === 0 || !validateEmail(email)) {
      message.error("Please enter valid email");
      return false;
    } else if (phone.length !== 10) {
      message.error("Please enter valid mobile Number");
      return false;
    } else if (state.length === 0) {
      message.error("Please enter valid State");
      return false;
    } else if (city.length === 0) {
      message.error("Please enter valid City");
      return false;
    } else if (pinCode.length !== 6) {
      message.error("Please enter valid Pin Code");
      return false;
    } else if (address.length === 0) {
      message.error("Please enter valid Address");
      return false;
    } else {
      return true;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const password = name.slice(0, 4) + phone.slice(-4);
      dispatch(
        addNewUser({
        name,
        email,
        password,
        phone,
        state,
        city,
        pinCode,
        address,
        event: USERS_ADD_CMS
      }))
    }
  }

  return (
    <Modal
      closable={true}
      open={open}
      onCancel={onClose}
      footer={[]}
      width={800}
      maskClosable={false}
    >
      <div className="">
        <h1 className="text-[24px] font-semibold">Add User Details</h1>
        <div className="grid grid-cols-2 gap-8 pt-4">
          <div className="col-span-1 py-1">
            <div className="block flex justify-between gap-2 items-center mb-2">
              <label className="block text-secondaryText text-[14px]">
                User Name
              </label>
              <Tooltip title="Enter user's Name">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <PrimaryInput
              inputType="text"
              placeholder="User Name"
              value={name}
              action={setName}
            />
          </div>
          <div className="col-span-1 py-1">
            <div className="block flex justify-between gap-2 items-center mb-2">
              <label className="block text-secondaryText text-[14px]">
                User Email
              </label>
              <Tooltip title="Enter user's email">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>

            <PrimaryInput
              inputType="email"
              placeholder="Email"
              value={email}
              action={setEmail}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <div className="block flex justify-between gap-2 items-center mb-2">
              <label className="block text-secondaryText text-[14px]">
                Phone Number
              </label>
              <Tooltip title="Enter user's Mobile Number">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <PrimaryInput
              inputType="tel"
              placeholder="Phone Number"
              value={phone}
              action={setPhone}
            />
          </div>
          <div className="col-span-1 py-1">
            <div className="block flex justify-between gap-2 items-center mb-2">
              <label className="block text-secondaryText text-[14px]">
                State
              </label>
              <Tooltip title="Enter user's State">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <SuggestionInput
              suggestions={stateList?.map(
                (value: any) => value
              )}
              placeholder="State"
              onChange={setState}
              value={state || ""}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <div className="block flex justify-between gap-2 items-center mb-2">
              <label className="block text-secondaryText text-[14px]">
                City
              </label>
              <Tooltip title="Enter user's city">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <PrimaryInput
              inputType="text"
              placeholder="City"
              action={setCity}
              value={city || ""}
            />
          </div>
          <div className="col-span-1 py-1">
            <div className="flex justify-between">
              <div className="block flex justify-between gap-2 items-center mb-2">
                <label className="block text-secondaryText text-[14px]">
                  PinCode
                </label>
                <Tooltip title="Enter user's pinCode">
                  <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                </Tooltip>
              </div>
            </div>
            <PrimaryInput
              inputType="text"
              placeholder="PinCode"
              action={setPinCode}
              value={pinCode}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <div className="block flex justify-between gap-2 items-center mb-2">
              <label className="block text-secondaryText text-[14px]">
                Address
              </label>
              <Tooltip title="Enter User's Address">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <PrimaryInput
              inputType="text"
              placeholder="Address"
              action={setAddress}
              value={address}
            />
          </div>
        </div>
        <button
          className="px-8 py-2 mt-4 text-[16px] font-semibold bg-[#1297E2] text-[#FFFFFF] rounded-md w-full"
          onClick={() => handleSave()}>
          Add User
        </button>
      </div>
    </Modal>
  );
};
