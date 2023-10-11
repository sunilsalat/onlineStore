import { expirationQueue } from "../../queue/expiration_queue";
import { mqClient } from "../mq/rpc";
import { baseListener } from "./baseListener";

const delay = 60000;
// const delay = 60 * 1000;

export const loadOrderListeners = async () => {
    await baseListener(
        mqClient.channel,
        "ORDER_CREATED",
        async (channel: any, msg: any) => {
            const payload = JSON.parse(msg.content.toString());

            console.log(
                "EXPIRATION-SERVICT-RECEVIED-EVENT:",
                "ORDER_CREATED",
                payload
            );

            try {
                await expirationQueue.add(
                    {
                        orderId: payload.orderId,
                        items: payload.items,
                    },
                    { delay: delay }
                );
                console.log("item added in bull queue");
            } catch (error) {
                console.log(error);
            }

            if (payload) {
                console.log(`${msg} acknowlodged`);
                channel.ack(msg);
            }
        }
    );
};
