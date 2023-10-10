import { loadOrderListeners } from "./events/listener/orderListner";
import { mqClient } from "./events/mq/rpc";
import { variables } from "./config";

const start = async () => {
    try {
        // connect to rabbitmq

        setTimeout(async () => {
            await mqClient.connect(
                variables.exchange_name!,
                variables.msg_queue_url!
            );

            console.log("expiration app connected to MQ");

            loadOrderListeners();
        }, 15000);
    } catch (error) {
        console.log(error);
    }
};

start();
