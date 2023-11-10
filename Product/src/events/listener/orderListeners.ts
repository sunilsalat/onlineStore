import { updateInventory } from "../../dataaccess/inventoryService";
import { RPCObserver, mqClient } from "../mq";
import { baseListener } from "./baseListener";

export const orderListeners = async () => {
    await baseListener(
        mqClient.channel,
        "ORDER_CREATED",
        async (channel, msg) => {
            // reduce the quantiy from warehouse
            const payload = JSON.parse(msg.content.toString());
            if (payload && payload.items.length > 0) {
                for (var i = 0; i < payload.items.length; i++) {
                    const { variantId, productId, itemQty } = payload.items[i];

                    await updateInventory(
                        { productId, productVariantId: variantId },
                        { $inc: { availableQty: -Number(itemQty) } }
                    );

                    // TODO - notify seller or store keeper when reorder point reached to replenish stock
                }
            }

            channel.ack(msg);
        }
    );

    await baseListener(
        mqClient.channel,
        "INC_INV_QTY",
        async (channel, msg) => {
            const payload = JSON.parse(msg.content.toString());
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

    // RPC OBSERVER

    await RPCObserver("GET_PRODUCT_DETAIL");
};
