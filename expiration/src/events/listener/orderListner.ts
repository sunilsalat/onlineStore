import { mqClient } from "../mq/rpc";
import { baseListener } from "./baseListener";

export const loadOrderListeners = async () => {
    // product listeners
    await baseListener(
        mqClient.channel,
        "ORDER_CREATED",
        async (channel: any, msg: any) => {
            const payload = JSON.parse(msg.content.toString());
            console.log("ORDER_CREATED", payload);

            if (payload) {
            }
        }
    );
};
