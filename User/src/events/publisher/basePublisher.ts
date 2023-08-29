export const basePublisher = async (channel, queueName, payload) => {
  channel.assertQueue(queueName, {
    durable: false,
  });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
};
