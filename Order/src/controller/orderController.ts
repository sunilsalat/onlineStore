import { Request, Response } from "express";
import * as IDalOrder from "../dataaccess/orderService";
import * as IDalProduct from "../dataaccess/productService";
import { PublishMessage } from "../events/publisher/basePublisher";
import { mqClient } from "../events/mq/rpc";

export const createOrder = async (req: Request, res: Response) => {
    /* this route behave as item added to bag
       item qty will only be reudced in inventory service when payment is done 
    */
    let data = req.body;
    data.date = new Date();
    data.userId = "6523c809af9b16e8765c8042";

    const productVariant: any = await IDalProduct.getProductByfilter({
        _id: data.variantId,
    });

    if (productVariant) {
        const { _id, productId, sku, price, name } = productVariant;

        data.items = [
            {
                variantId: _id,
                productId,
                sku,
                itemPrice: price,
                itemName: name,
                itemQty: data.qty,
            },
        ];
    }

    const obj = await IDalOrder.createOrder(data);

    if (obj) {
        // push msg to expiration service and reserve product for 15 mins
        const ch = mqClient.channel;
        await PublishMessage(ch, process.env.EXCHANGE_NAME!, "ORDER_CREATED", {
            orderId: obj._id,
            items: obj.items,
        });
    }

    res.status(201).json({ data: "", msg: "Order created" });
};

export const getAllOrder = async (req: Request, res: Response) => {
    const {} = req.body;
    const obj = await IDalOrder.findMultipleOrderByFilter({});
    res.status(201).json({ data: obj, msg: "" });
};
