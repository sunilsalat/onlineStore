import { Request, Response } from "express";
import * as IDalOrder from "../dataaccess/orderService";
import { PublishMessage } from "../events/publisher/basePublisher";
import { mqClient } from "../events/mq/rpc";

export const createOrder = async (req: Request, res: Response) => {
    const { data } = req.body;

    const obj = await IDalOrder.createOrder(data);

    if (obj) {
        // push msg to expiration service and reserve product for 15 mins
        //

        const ch = mqClient.channel;
        PublishMessage(ch, process.env.EXCHANGE_NAME!, "ORDER_CREATED", {
            orderId: obj._id,
        });
    }

    res.status(201).json({ data: obj, msg: "Order created" });
};

export const getAllOrder = async (req: Request, res: Response) => {
    const {} = req.body;
    const obj = await IDalOrder.findMultipleOrderByFilter({});
    res.status(201).json({ data: obj, msg: "" });
};
