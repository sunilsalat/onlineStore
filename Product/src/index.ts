import connectToDb from "./config/connectDb";
import { baseListener } from "./events/listener/baseListener";
import { mqClient } from "./events/mq/rpc";
import { User } from "./models/User";
import { app } from "./server";
require("dotenv").config();

const start = async () => {
  await connectToDb("mongodb://mongo-user:27017/product");

  await mqClient.connect(
    process.env.EXCHANGE_NAME!,
    process.env.MSG_QUEUE_URL!
  );

  await baseListener(mqClient.channel, "USER_CREATED", async (channel, msg) => {
    const payload = JSON.parse(msg.content.toString());
    if (payload) {
      const userObj = await User.create(payload);
      if (userObj) {
        channel.ack(msg);
      }
    }
  });

  app.listen(6000, () => {
    console.log(`Server running on port ${6000}`);
  });
};

start();
