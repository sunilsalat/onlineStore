import {
    findOrderAndUpdate,
    getOrderByFilter,
} from "../../dataaccess/orderService";
import { createProduct, updateProduct } from "../../dataaccess/productService";
import { Product } from "../../models/Product";
import { mqClient } from "../mq";
import { baseListener } from "./baseListener";

export const expirationListeners = async () => {
    // product listeners
    // this function binds queues as soon as order service connect to rabbitmq
    await baseListener(
        mqClient.channel,
        "ORDER_EXPIRED",
        async (channel, msg) => {
            const payload = JSON.parse(msg.content.toString());

            const orderObj: any = await getOrderByFilter({
                _id: payload.orderId,
            });

            if (
                [
                    "APPROVED_BY_SELLER",
                    "DISPATCHED",
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                ].includes(orderObj?.status)
            ) {
                console.log(`${msg} acknowlodged`);
                channel.ack(msg);
                return;
            }

            if (payload) {
                if (orderObj) {
                    orderObj.status = "CANCELLED";
                    await orderObj.save();
                }

                console.log(`${msg} acknowlodged`);
                channel.ack(msg);
            }
        }
    );
};
