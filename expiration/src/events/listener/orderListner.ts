import { variables } from "../../config";
import { expirationQueue } from "../../queue/expiration_queue";
import { mqClient } from "../mq/rpc";
import { baseListener } from "./baseListener";

// const delay = Number(variables.delay) || 900000;
const delay = 60 * 1000;

export const loadOrderListeners = async () => {
    await baseListener(
        mqClient.channel,
        "ORDER_CREATED",
        async (channel: any, msg: any) => {
            const payload = JSON.parse(msg.content.toString());

            try {
                await expirationQueue.add(
                    {
                        orderId: payload.orderId,
                        items: payload.items,
                    },
                    { delay: delay }
                );
            } catch (error) {
                console.log(error);
            }

            if (payload) {
                channel.ack(msg);
            }
        }
    );
};
