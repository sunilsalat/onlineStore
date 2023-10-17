import Queue from "bull";
import { PublishMessage } from "../events/publisher/basePublisher";
import { mqClient } from "../events/mq/rpc";
import { variables } from "../config";

interface Payload {
    orderId: string;
}
const ORDER_EXPIRED = "ORDER_EXPIRED";

const expirationQueue = new Queue("order:expiration", variables.redis_url!);

expirationQueue.process((job: any, done) => {
    console.log("process:bullmq");
    const ch = mqClient.channel;
    PublishMessage(ch, variables.exchange_name!, ORDER_EXPIRED, {
        orderId: job.data.orderId,
        items: job.data.items,
    });
    done();
});

export { expirationQueue };
