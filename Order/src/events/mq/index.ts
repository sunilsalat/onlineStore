const amqplib = require("amqplib");
const { v4: uuid4 } = require("uuid");
import amqplib from "amqplib";
import { getOrderByFilter } from "../../dataaccess/orderService";

// BROKER
class MQClient {
    private _channel;

    get channel() {
        if (!this._channel) {
            throw new Error("Can not access nats before initialization ...");
        }
        return this._channel;
    }

    async connect(EXCHANGE_NAME: string, MSG_QUEUE_URL: string) {
        const connection = await amqplib.connect(MSG_QUEUE_URL);
        this._channel = await connection.createChannel();
    }
}

export const mqClient = new MQClient();

// RPC
export const RPCObserver = async (RPC_QUEUE_NAME) => {
    const channel = mqClient.channel;

    channel.assertQueue(RPC_QUEUE_NAME, {
        durable: false,
    });

    channel.prefetch(1);
    channel.consume(
        RPC_QUEUE_NAME,
        async (msg) => {
            if (msg.content) {
                const payload = JSON.parse(msg.content.toString());
                // write switch case and query database accordingly
                //

                let res: any;
                switch (payload.event) {
                    case "get_order_detail":
                        const filter = {
                            "items.variantId": payload.productVariantId,
                        };
                        const orderDetail = await getOrderByFilter(filter);
                        res = orderDetail;
                }

                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(res)),
                    { correlationId: msg.properties.correlationId }
                );
                channel.ack(msg);
            }
        },
        {
            noAck: false,
        }
    );
};

const requestData = async (RPC_QUEUE_NAME, payload, uuid) => {
    const channel = mqClient.channel;

    const q = await channel.assertQueue("", { exclusive: true });
    channel.sendToQueue(RPC_QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
        replyTo: q.queue,
        correlationId: uuid,
    });

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            channel.close();
            resolve("API could not fullfil the request ");
        }, 8000);

        channel.consume(
            q.queue,
            (msg) => {
                if (msg.properties.correlationId === uuid) {
                    resolve(JSON.parse(msg.content.toString()));
                    clearTimeout(timeout);
                } else {
                    reject("Data not found!");
                }
            },
            {
                noAck: true,
            }
        );
    });
};

export const RPCRequest = async (RPC_QUEUE_NAME, payload) => {
    const uuid = uuid4(); // correlationId
    return await requestData(RPC_QUEUE_NAME, payload, uuid);
};

// const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
// const USER_SERVICE = process.env.USER_SERVICE;

// export const CreateChannel = async () => {
//   try {
//     const connection = await amqplib.connect(MSG_QUEUE_URL);
//     const channel = await connection.createChannel();
//     await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
//     return channel;
//   } catch (err) {
//     throw err;
//   }
// };

// export const PublishMessage = (channel, service, msg) => {
//   channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
//   console.log("Sent: ", msg);
// };

// export const SubscribeMessage = async (channel, service) => {
//   await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
//   const q = await channel.assertQueue("", { exclusive: true });
//   console.log(` Waiting for messages in queue: ${q.queue}`);

//   channel.bindQueue(q.queue, EXCHANGE_NAME, USER_SERVICE);

//   channel.consume(
//     q.queue,
//     (msg) => {
//       if (msg.content) {
//         console.log("the message is:", msg.content.toString());
//         service.SubscribeEvents(msg.content.toString());
//       }
//       console.log("[X] received");
//     },
//     {
//       noAck: true,
//     }
//   );
// };
