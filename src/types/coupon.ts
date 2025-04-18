import dayjs from "dayjs";

export interface Coupon {
    _id?: string;
    couponCode: string;
    discountPercent: number;
    visibility: boolean;
    validityDate: string; // "none" or ISO date string
    description: string;
    tnc: string[];
}

export interface CouponFormValues extends Omit<Coupon, 'validityDate'> {
    validityDate: dayjs.Dayjs | null;
}