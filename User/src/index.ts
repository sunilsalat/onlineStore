import connectToDb from "./config/connectDb";
import { mqClient } from "./events/mq/rpc";
import { app } from "./server";
require("dotenv").config();

const start = async () => {
  await connectToDb(process.env.MONGO_URI!);

  await mqClient.connect(
    process.env.EXCHANGE_NAME!,
    process.env.MSG_QUEUE_URL!
  );

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

start();
