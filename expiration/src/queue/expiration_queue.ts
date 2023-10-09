import Queue from "bull";
import { PublishMessage } from "../events/publisher/basePublisher";
import { mqClient } from "../events/mq/rpc";
require("dotenv").config();

interface Payload {
    orderId: string;
}

const ORDER_EXPIRED = "ORDER_EXPIRED";
const EXCHANGE_NAME = process.env.EXCHANGE_NAME!;

const expirationQueue = new Queue<Payload>("order:expiration", {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

expirationQueue.process(async (job: any) => {
    const ch = mqClient.channel;
    console.log("inside process:bullmq");
    PublishMessage(ch, EXCHANGE_NAME, ORDER_EXPIRED, { orderId: job.orderId });
});

export { expirationQueue };
