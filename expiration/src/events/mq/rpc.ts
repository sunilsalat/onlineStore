// //Message Broker
require("dotenv").config();
import amqplib from "amqplib";

const MSG_QUEUE_URL = process.env.MSG_QUEUE_UEL;

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
        // await this._channel.assertQueue(EXCHANGE_NAME, "direct", {
        //     durable: true,
        // });
    }
}

export const mqClient = new MQClient();
