import amqplib from "amqplib";

const connectToRabbitServer = async () => {
  const conn = await amqplib.connect("amqp://localhost");
  const ch = await conn.createChannel();
  return ch;
};
