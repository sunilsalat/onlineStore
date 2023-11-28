const amqplib = require("amqplib");
const { v4: uuid4 } = require("uuid");

// BROKER
class MQClient {
    private _channel: any;

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
export const RPCObserver = async (RPC_QUEUE_NAME: any) => {
    const channel = mqClient.channel;

    channel.assertQueue(RPC_QUEUE_NAME, {
        durable: false,
    });
    channel.prefetch(1);
    channel.consume(
        RPC_QUEUE_NAME,
        async (msg: any) => {
            if (msg.content) {
                const payload = JSON.parse(msg.content.toString());
                // write switch case and query database accordingly
                //

                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify("response")),
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

const requestData = async (RPC_QUEUE_NAME: any, payload: any, uuid: any) => {
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
            (msg: any) => {
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

export const RPCRequest = async (RPC_QUEUE_NAME: any, payload: any) => {
    const uuid = uuid4(); // correlationId
    return await requestData(RPC_QUEUE_NAME, payload, uuid);
};
