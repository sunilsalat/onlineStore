import connectToDb from "./config/connectDb";
import { mqClient } from "./events/mq/rpc";
import { app } from "./server";

const start = async () => {
  await connectToDb("mongodb://mongo-user:27017/users");

  console.log({ sldf: process.env.EXCHANGE_NAME });

  await mqClient.connect(
    process.env.EXCHANGE_NAME!,
    process.env.MSG_QUEUE_URL!
  );

  app.listen(5000, () => {
    console.log(`Server running on port ${5000}`);
  });
};

start();
