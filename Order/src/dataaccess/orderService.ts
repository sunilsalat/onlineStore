import { Order } from "../models/Order";

export const createOrder = async (data: any) => {
    const OrderObj = await Order.create(data);
    return OrderObj;
};

export const getOrderByFilter = async (filters: any) => {
    const OrderObj = await Order.findOne(filters);
    return OrderObj;
};

export const findMultipleOrderByFilter = async (filter: any) => {
    const obj = await Order.find(filter);
    return obj;
};
