import { createProduct, updateProduct } from "../../dataaccess/productService";
import { Product } from "../../models/Product";
import { mqClient } from "../mq/rpc";
import { baseListener } from "./baseListener";

export const expirationServiceListerns = async () => {
    // this function binds queues as soon as order service connect to rabbitmq
    await baseListener(
        mqClient.channel,
        "ORDER_EXPIRED",
        async (channel, msg) => {
            const payload = JSON.parse(msg.content.toString());
            console.log("ORDER_EXPIRED", payload);

            if (payload) {
                console.log(`${msg} acknowlodged`);
                channel.ack(msg);
            }
        }
    );
};
