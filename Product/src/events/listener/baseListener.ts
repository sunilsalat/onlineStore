const SERVICE_NAME = process.env.SERVICE_NAME;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;

export const baseListener = async (
    channel: any,
    TOPIC: string,
    callback: any
) => {
    console.log({ TOPIC });
    await channel.assertExchange("ONLINE_STORE", "direct", { durable: true });
    const q = await channel.assertQueue("");
    console.log(` Waiting for messages in queue: ${q.queue}`);

    channel.bindQueue(q.queue, "ONLINE_STORE", TOPIC);

    channel.consume(
        q.queue,
        async (msg) => {
            if (msg.content) {
                const payload = JSON.parse(msg.content.toString());
                callback(channel, msg);
            }
        },
        {
            noAck: false,
        }
    );
};

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
