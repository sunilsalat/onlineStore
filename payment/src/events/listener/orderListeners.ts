import { addPayment } from "../../dataaccess/paymentService";
import { mqClient } from "../mq";
import { baseListener } from "./baseListener";

export const orderListeners = async () => {
    // product listeners
    // this function binds queues as soon as order service connect to rabbitmq
    await baseListener(
        mqClient.channel,
        "ORDER_CREATED",
        async (channel: any, msg: any) => {
            const payload = JSON.parse(msg.content.toString());

            if (payload) {
                const { orderId, orderAmount, userId, currency } = payload;
                await addPayment({
                    customerId: userId,
                    amount: orderAmount,
                    orderId,
                });
            }
        },
        "payment.order_created"
    );
};
