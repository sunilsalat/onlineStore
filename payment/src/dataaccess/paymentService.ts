import { Payment } from "../models/payment";

export const addPayment = async (data: any) => {
    const pyamentObj = await Payment.create(data);
    return pyamentObj;
};
