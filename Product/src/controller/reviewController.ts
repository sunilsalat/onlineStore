import { Request, Response } from "express";
import * as IDalInventory from "../dataaccess/inventoryService";
import { RPCRequest } from "../events/mq";

export const addProductReview = async (req: Request, res: Response) => {
    const data = req.body;

    // make rpc call to check user product purchase

    const payload: any = await RPCRequest("ORDER_OBSERVER", {
        productVariantId: data.productVariantId,
        event: "get_order_detail",
    });

    if (payload.userId !== data.userId) {
        throw new Error("Purchase to write review");
    }
    const obj: any = await IDalInventory.addProductReview(data);
    res.status(201).json({ data: "", msg: "Review added" });
};
