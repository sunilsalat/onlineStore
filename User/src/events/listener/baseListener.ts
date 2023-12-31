const SERVICE_NAME = process.env.SERVICE_NAME;

export const baseListener = async (
  channel: any,
  EXCHANGE_NAME: string,
  TOPIC: string,
  callback: any
) => {
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
  const q = await channel.assertQueue("", { exclusive: true });
  console.log(` Waiting for messages in queue: ${q.queue}`);

  channel.bindQueue(q.queue, EXCHANGE_NAME, TOPIC);

  channel.consume(
    q,
    async (msg) => {
      if (msg.content) {
        const payload = JSON.parse(msg.content.toString());

        callback(channel, msg);
        // channel.ack(msg);
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
