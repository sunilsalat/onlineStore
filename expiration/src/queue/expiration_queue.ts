import Queue from "bull";
import { PublishMessage } from "../events/publisher/basePublisher";
import { mqClient } from "../events/mq/rpc";

interface Payload {
    orderId: string;
}

const ORDER_EXPIRED = "ORDER_EXPIRED";
const EXCHANGE_NAME = process.env.EXCHANGE_NAME!;
const ch = mqClient.channel;

const expirationQueue = new Queue<Payload>("order:expiration", {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

expirationQueue.process(async (job) => {
    PublishMessage(ch, EXCHANGE_NAME, ORDER_EXPIRED, "");
});

export { expirationQueue };
