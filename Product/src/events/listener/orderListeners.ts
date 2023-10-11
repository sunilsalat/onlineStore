import { updateInventory } from "../../dataaccess/inventoryService";
import { mqClient } from "../mq/rpc";
import { baseListener } from "./baseListener";

export const orderListeners = async () => {
    await baseListener(
        mqClient.channel,
        "ORDER_CREATED",
        async (channel, msg) => {
            // reduce the quantiy from warehouse
            const payload = JSON.parse(msg.content.toString());
            console.log("ORDER_CREATED_LISTENER", payload);
            if (payload && payload.items.length > 0) {
                for (var i = 0; i < payload.items.length; i++) {
                    const { variantId, productId, itemQty } = payload.items[i];

                    await updateInventory(
                        { productId, productVariantId: variantId },
                        { $inc: { availableQty: -Number(itemQty) } }
                    );
                }
            }

            channel.ack(msg);
        }
    );

    await baseListener(
        mqClient.channel,
        "ORDER_EXPIRED",
        async (channel, msg) => {
            // reduce the quantiy from warehouse
            const payload = JSON.parse(msg.content.toString());
            console.log("ORDER_EXPIRED", payload);
            if (payload && payload.items.length > 0) {
                for (var i = 0; i < payload.items.length; i++) {
                    const { variantId, productId, itemQty } = payload.items[i];

                    await updateInventory(
                        { productId, productVariantId: variantId },
                        { $inc: { availableQty: Number(itemQty) } }
                    );
                }
            }

            channel.ack(msg);
        }
    );
};
