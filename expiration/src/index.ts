import { loadOrderListeners } from "./events/listener/orderListner";
import { mqClient } from "./events/mq/rpc";

const start = async () => {
    try {
        // connect to rabbitmq

        setTimeout(async () => {
            await mqClient.connect(
                process.env.EXCHANGE_NAME!,
                process.env.MSG_QUEUE_URL!
            );

            console.log("expiration app connected to MQ");

            loadOrderListeners();
        }, 15000);
    } catch (error) {}
};

start();
