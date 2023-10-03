import { createProduct, updateProduct } from "../../dataaccess/productService";
import { Product } from "../../models/Product";
import { mqClient } from "../mq/rpc";
import { baseListener } from "./baseListener";

export const loadProductListeners = async () => {
    // product listeners
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
                console.log("PRODUCT_UPDATED", payload);
                const productObj = await updateProduct(
                    payload.productId,
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
