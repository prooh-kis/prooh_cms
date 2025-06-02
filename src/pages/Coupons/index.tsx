import { useDispatch } from "react-redux";
import { ReloadButton, SearchInputField } from "../../components/index";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CouponPopup from "../../components/popup/CouponPopup";
import type { Coupon } from "../../types/coupon";
import {
  createCouponAction,
  deleteCouponAction,
  getCouponList,
  updateCouponAction,
} from "../../actions/couponAction";
import ButtonInput from "../../components/atoms/ButtonInput";
import { notification } from "antd";
import CouponTable from "../../components/tables/CouponTable";
import {
  CREATE_COUPON_RESET,
  DELETE_COUPON_RESET,
  UPDATE_COUPON_RESET,
} from "../../constants/couponConstants";

export const Coupons = () => {
  const dispatch = useDispatch<any>();
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null);

  const handleAddCoupon = () => {
    setCurrentCoupon(null);
    setIsModalVisible(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setCurrentCoupon(coupon);
    setIsModalVisible(true);
  };

  const {
    loading,
    error,
    data: allCoupons,
  } = useSelector((state: any) => state.couponList);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state: any) => state.updateCoupon);

  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
  } = useSelector((state: any) => state.createCoupon);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state: any) => state.deleteCoupon);

  const reLoad = () => {
    dispatch(getCouponList());
  };

  const handleToggleStatus = (coupon: Coupon) => {
    dispatch(updateCouponAction({ ...coupon, visibility: !coupon.visibility }));
  };

  const handleDelete = (id: string) => {
    if (confirm("Do you really want to delete this coupon permanently?"))
      dispatch(deleteCouponAction(id));
  };

  useEffect(() => {
    if (errorDelete) {
      notification.error({
        message: "Error delete",
        description: errorDelete,
      });
      dispatch({ type: DELETE_COUPON_RESET });
    }
    if (successDelete) {
      notification.success({
        message: "Coupon Deleted",
        description: "Coupon has been deleted successfully.",
      });
      dispatch({ type: DELETE_COUPON_RESET });
      reLoad();
    }
  }, [successDelete, errorDelete]);

  useEffect(() => {
    if (errorUpdate) {
      notification.error({
        message: "Error",
        description: errorUpdate,
      });
      dispatch({ type: UPDATE_COUPON_RESET });
    }
    if (successUpdate) {
      notification.success({
        message: "Coupon Updated",
        description: "Coupon has been Updated successfully.",
      });
      dispatch({ type: UPDATE_COUPON_RESET });
      reLoad();
    }
  }, [successUpdate, errorUpdate]);

  useEffect(() => {
    if (errorAdd) {
      notification.error({
        message: "Error Add Coupon",
        description: errorAdd,
      });
      dispatch({ type: CREATE_COUPON_RESET });
    }
    if (successAdd) {
      notification.success({
        message: "Coupon Created",
        description: "New coupon has been created successfully.",
      });
      dispatch({ type: CREATE_COUPON_RESET });
      reLoad();
    }
  }, [successAdd, errorAdd]);

  const handleSubmit = async (values: Coupon) => {
    console.log("values : ", values);
    if (currentCoupon) {
      // Update existing coupon
      dispatch(updateCouponAction({ ...values, _id: currentCoupon?._id }));
    } else {
      dispatch(createCouponAction(values));
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getCouponList());
  }, []);

  const filterCoupons = allCoupons?.filter((coupon: Coupon) =>
    coupon.couponCode?.toLowerCase()?.includes(searchText)
  );

  return (
    <div className="flex flex-col gap-1 h-full">
      <CouponPopup
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={currentCoupon || undefined}
      />
      <div className="flex justify-between pr-8 mr-0 border-b bg-white rounded-[4px]">
        <div className="flex gap-4 items-center p-4">
          <h1 className="text-[16px] font-semibold">
            My Coupons{" "}
            <span className="text-[14px] text-[#68879C] ">
              ({filterCoupons?.length || 0})
            </span>
          </h1>
          <ReloadButton onClick={reLoad} />
        </div>
        <div className="flex items-center mt-1 flex gap-4">
          <SearchInputField
            value={searchText}
            onChange={(value: string) => setSearchText(value?.toLowerCase())}
            placeholder="Search by coupon code  or description"
          />
          <ButtonInput
            icon={<i className="fi fi-br-plus"></i>}
            onClick={handleAddCoupon}
            className="w-full"
          >
            Add New Coupon
          </ButtonInput>
        </div>
      </div>
      <div className="px-1 py-2 h-[80vh]">
        <CouponTable
          coupons={filterCoupons || []}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
