import { getOrderByFilter } from "../../dataaccess/orderService";
import { createProduct, updateProduct } from "../../dataaccess/productService";
import { Product } from "../../models/Product";
import { mqClient } from "../mq/rpc";
import { PublishMessage } from "../publisher/basePublisher";
import { baseListener } from "./baseListener";

export const expirationServiceListerns = async () => {
    // this function binds queues as soon as order service connect to rabbitmq
    // handle this when needed
    // await baseListener(
    //     mqClient.channel,
    //     "ORDER_EXPIRED",
    //     async (channel, msg) => {
    //         const payload = JSON.parse(msg.content.toString());
    //         if (payload.orderId) {
    //             const orderObj = await getOrderByFilter({
    //                 _id: payload.orderId,
    //             });
    //             if (orderObj && orderObj?.items) {
    //                 for (var i = 0; i < orderObj.items.length; i++) {
    //                     const { variantId, productId, itemQty } =
    //                         orderObj.items[i];
    //                     //publish msg to inventory to inc qty again
    //                     PublishMessage(
    //                         mqClient.channel,
    //                         process.env.EXCHANGE_NAME!,
    //                         "INC_PRODUCT_QTY",
    //                         {
    //                             variantId,
    //                             productId,
    //                             itemQty,
    //                         }
    //                     );
    //                 }
    //             }
    //         }
    //         if (payload) {
    //             console.log(`${msg} acknowlodged`);
    //             channel.ack(msg);
    //         }
    //     }
    // );
};
