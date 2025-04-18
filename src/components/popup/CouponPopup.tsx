import React, { useState, useEffect } from "react";
import {
  Modal,
  DatePicker,
  Input,
  InputNumber,
  Switch,
  Button,
  Form,
  Select,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { Coupon, CouponFormValues } from "../../types/coupon";

const { TextArea } = Input;

interface CouponPopupProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Coupon) => Promise<void>;
  initialValues?: Coupon;
}

const CouponPopup: React.FC<CouponPopupProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm<CouponFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [calcValues, setCalcValues] = useState({
    originalPrice: 0.0,
    offerPrice: 0.0,
    discountedPrice: 0.0,
    calculatedDiscount: 0.0,
  });

  useEffect(() => {
    if (initialValues) {
      const values: CouponFormValues = {
        ...initialValues,
        validityDate:
          initialValues.validityDate !== "none"
            ? dayjs(initialValues.validityDate)
            : null,
      };
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const formattedValues: Coupon = {
        ...values,
        validityDate: values.validityDate
          ? values.validityDate.format("YYYY-MM-DD")
          : "none",
      };

      await onSubmit(formattedValues);
      form.resetFields();
      setCalcValues({
        originalPrice: 0,
        discountedPrice: 0,
        calculatedDiscount: 0,
        offerPrice: 0,
      });
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateDiscount = () => {
    const { originalPrice, offerPrice } = calcValues;
    if (originalPrice > 0 && offerPrice > 0 && offerPrice <= originalPrice) {
      const discount = ((originalPrice - offerPrice) / originalPrice) * 100;
      const roundedDiscount = Number(discount?.toFixed(2));
      setCalcValues({
        ...calcValues,
        calculatedDiscount: roundedDiscount,
      });
      form.setFieldsValue({ discountPercent: roundedDiscount });
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Coupon" : "Add New Coupon"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} className="mr-2">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {initialValues ? "Update" : "Create"}
        </Button>,
      ]}
      width={900}
    >
      <Form<CouponFormValues> form={form} layout="vertical" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="couponCode"
            label="Coupon Code"
            rules={[
              { required: true, message: "Please enter coupon code" },
              {
                pattern: /^[A-Z0-9]+$/,
                message: "Only uppercase letters and numbers allowed",
              },
            ]}
          >
            <Input
              placeholder="SUMMER20"
              className="w-full"
              onChange={(e) => {
                form.setFieldsValue({
                  couponCode: e.target.value.toUpperCase(),
                });
              }}
            />
          </Form.Item>

          <Form.Item
            name="discountPercent"
            label="Discount Percentage (%)"
            rules={[
              { required: true, message: "Please enter discount percentage" },
              // {
              //   type: "number",
              //   min: 1,
              //   max: 100,
              //   message: "Discount must be between 1-100%",
              // },
            ]}
          >
            <div className="flex items-center gap-2">
              <InputNumber min={1} max={100} className="w-full" />
              <Button
                type="default"
                onClick={() => setShowCalculator(!showCalculator)}
                className="ml-2"
              >
                {showCalculator ? "Hide Calculator" : "Calculate Discount"}
              </Button>
            </div>
          </Form.Item>
        </div>

        {showCalculator && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
            <h4 className="font-medium mb-3 text-gray-700">
              Discount Calculator
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Form.Item label="Original Price" className="mb-2">
                <InputNumber
                  min={0.01}
                  step={0.01}
                  value={calcValues.originalPrice}
                  onChange={(value) =>
                    setCalcValues({ ...calcValues, originalPrice: value || 0 })
                  }
                  className="w-full"
                  prefix="₹"
                  precision={2}
                />
              </Form.Item>
              <Form.Item label="Offered Price" className="mb-2">
                <InputNumber
                  min={0.01}
                  step={0.01}
                  value={calcValues.offerPrice}
                  onChange={(value) =>
                    setCalcValues({
                      ...calcValues,
                      offerPrice: value || 0,
                      discountedPrice: calcValues.originalPrice - (value || 0),
                    })
                  }
                  className="w-full"
                  prefix="₹"
                  precision={2}
                />
              </Form.Item>
              <Form.Item label="Discounted Price" className="mb-2">
                <InputNumber
                  min={0.01}
                  step={0.01}
                  value={calcValues.discountedPrice}
                  onChange={(value) =>
                    setCalcValues({
                      ...calcValues,
                      discountedPrice: value || 0,
                    })
                  }
                  className="w-full"
                  prefix="₹"
                  precision={2}
                />
              </Form.Item>
              <Form.Item label="Calculated Discount" className="mb-2">
                <InputNumber
                  value={calcValues.calculatedDiscount}
                  className="w-full"
                  disabled
                  suffix="%"
                />
              </Form.Item>
            </div>
            <Button
              type="primary"
              onClick={handleCalculateDiscount}
              className="mt-2"
              disabled={
                !calcValues.originalPrice || !calcValues.discountedPrice
              }
            >
              Calculate Discount
            </Button>
            {calcValues.calculatedDiscount > 0 && (
              <p className="mt-2 text-sm text-green-600">
                {calcValues.calculatedDiscount}% discount will be applied
              </p>
            )}
            {calcValues.discountedPrice > calcValues.originalPrice && (
              <p className="mt-2 text-sm text-red-600">
                Discounted price cannot be higher than original price
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="validityDate" label="Expiry Date">
            <DatePicker
              className="w-full"
              disabledDate={(current) =>
                current ? current < dayjs().startOf("day") : false
              }
            />
          </Form.Item>

          <Form.Item
            name="visibility"
            label="Visibility"
            valuePropName="checked"
          >
            <Switch checkedChildren="Visible" unCheckedChildren="Hidden" />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { max: 200, message: "Description cannot exceed 200 characters" },
          ]}
        >
          <TextArea
            rows={3}
            placeholder="Enter coupon description (optional)"
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item label="Terms & Conditions">
          <Form.List name="tnc">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex items-center mb-2">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter T&C or remove this field",
                        },
                        {
                          max: 100,
                          message: "T&C cannot exceed 100 characters",
                        },
                      ]}
                      className="flex-grow mb-0"
                    >
                      <Input placeholder="Enter term & condition" />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  className="mt-2"
                >
                  Add Term
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CouponPopup;
