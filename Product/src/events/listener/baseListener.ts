export const baseListener = async (channel, queueName, payload, callback) => {
  channel.assertQueue(queueName, {
    durable: false,
  });

  channel.consume(
    queueName,
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
