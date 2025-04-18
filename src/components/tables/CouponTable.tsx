import React from "react";
import type { Coupon } from "../../types/coupon";
import { NoDataView } from "../../components/molecules/NoDataView";

interface CouponTableProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onToggleStatus: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

const CouponTable: React.FC<CouponTableProps> = ({
  coupons,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="bg-[#129BFF30] text-[14px] font-semibold">
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase tracking-wider"
            >
              S.N.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase tracking-wider"
            >
              Code
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase tracking-wider"
            >
              Discount
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left uppercase tracking-wider"
            >
              Expiry Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {coupons?.map((coupon, index) => (
            <tr key={coupon._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{index + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    {coupon.couponCode}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {coupon.discountPercent}%
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {coupon.validityDate === "none"
                  ? "No expiry"
                  : new Date(coupon.validityDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {coupon.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    coupon.visibility
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {coupon.visibility ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(coupon)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    title="Edit"
                  >
                    <i className="fi fi-rr-file-edit"></i>
                  </button>
                  <button
                    onClick={() => onToggleStatus(coupon)}
                    className={`p-1 rounded-full hover:bg-gray-50 ${
                      coupon.visibility
                        ? "text-yellow-600 hover:text-yellow-900"
                        : "text-green-600 hover:text-green-900"
                    }`}
                    title={coupon.visibility ? "Deactivate" : "Activate"}
                  >
                    {coupon.visibility ? (
                      <i className="fi fi-sr-eye-crossed"></i>
                    ) : (
                      <i className="fi fi-sr-eye"></i>
                    )}
                  </button>

                  <button
                    onClick={() => onDelete(coupon._id!)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                    title="Delete"
                  >
                    <i className="fi fi-br-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full">{coupons?.length === 0 && <NoDataView />}</div>
    </div>
  );
};

export default CouponTable;
