const amqplib = require("amqplib");
const { v4: uuid4 } = require("uuid");

let amqplibConnection: any = null;

const getChannel = async () => {
  if (amqplibConnection === null) {
    amqplibConnection = await amqplib.connect("amqp://localhost");
  }
  return await amqplibConnection.createChannel();
};

const RPCObserver = async (RPC_QUEUE_NAME, fakeResponse) => {
  const channel = await getChannel();

  channel.assertQueue(RPC_QUEUE_NAME, {
    durable: false,
  });
  channel.prefetch(1);
  channel.consume(
    RPC_QUEUE_NAME,
    async (msg) => {
      if (msg.content) {
        const payload = JSON.parse(msg.content.toString());
        const response = {
          fakeResponse: "",
          payload,
        }; // call fake db query
        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
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
  const channel = await getChannel();
  const q = await channel.assertQueue();

  channel.sendToQueue(RPC_QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
    replyTo: q.queue,
    correlationId: uuid,
  });

  return new Promise((resolve, reject) => {
    channel.consume(
      q.queue,
      (msg) => {
        if (msg.properties.correlationId === uuid) {
          resolve(JSON.parse(msg.content.toString()));
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

const RPCRequest = async (RPC_QUEUE_NAME, payload) => {
  // form builder
  const uuid = uuid4(); // correlationId
  return await requestData(RPC_QUEUE_NAME, payload, uuid);
};

module.exports = { getChannel, RPCObserver, RPCRequest };
