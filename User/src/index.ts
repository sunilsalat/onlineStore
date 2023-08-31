import connectToDb from "./config/connectDb";
import { mqClient } from "./events/mq/rpc";
import { app } from "./server";
require("dotenv").config();

const start = async () => {
  await connectToDb("mongodb://mongo-user:27017/users");

  await mqClient.connect(
    process.env.EXCHANGE_NAME!,
    process.env.MSG_QUEUE_URL!
  );

  app.listen(5000, () => {
    console.log(`Server running on port ${5000}`);
  });
};

start();
