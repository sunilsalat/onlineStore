import { createProduct, updateProduct } from "../../dataaccess/productService";
import { mqClient } from "../mq";
import { baseListener } from "./baseListener";

export const loadProductListeners = async () => {
    // product listeners
    // this function binds queues as soon as order service connect to rabbitmq
    await baseListener(
        mqClient.channel,
        "PRODUCT_CREATED",
        async (channel, msg) => {
            const payload = JSON.parse(msg.content.toString());
            console.log("PRODUCT_CREATED", payload);

            if (payload) {
                const productObj = await createProduct(payload);
                if (productObj) {
                    console.log(`${msg} acknowlodged`);
                    channel.ack(msg);
                }
            }
        }
    );

    await baseListener(
        mqClient.channel,
        "PRODUCT_UPDATED",
        async (channel, msg) => {
            const payload = JSON.parse(msg.content.toString());
            if (payload) {
                const productObj = await updateProduct(
                    payload.variantId,
                    payload.data
                );
                if (productObj) {
                    console.log(`${msg} acknowlodged`);
                    channel.ack(msg);
                }
            }
        }
    );
};
