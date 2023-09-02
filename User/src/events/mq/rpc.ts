// //Message Broker
import amqplib from 'amqplib'

const MSG_QUEUE_URL = process.env.MSG_QUEUE_URL

class MQClient {
  private _channel

  get channel () {
    if (!this._channel) {
      throw new Error('Can not access nats before initialization ...')
    }

    return this._channel
  }

  async connect (EXCHANGE_NAME: string, MSG_QUEUE_URL: string) {
    const connection = await amqplib.connect(MSG_QUEUE_URL)
    this._channel = await connection.createChannel()
    await this._channel.assertQueue(EXCHANGE_NAME, 'direct', { durable: true })
  }
}

export const mqClient = new MQClient()

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
