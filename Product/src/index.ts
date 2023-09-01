import connectToDb from "./config/connectDb";
import { baseListener } from "./events/listener/baseListener";
import { mqClient } from "./events/mq/rpc";
import { User } from "./models/User";
import { app } from "./server";
require("dotenv").config();

const start = async () => {
  await connectToDb(process.env.MONGO_URI!);

  await mqClient.connect(
    process.env.EXCHANGE_NAME!,
    process.env.MSG_QUEUE_URL!
  );

  await baseListener(mqClient.channel, "USER_CREATED", async (channel, msg) => {
    const payload = JSON.parse(msg.content.toString());
    if (payload) {
      const userObj = await User.create(payload);
      if (userObj) {
        console.log(`${msg} acknowlodged`);
        channel.ack(msg);
      }
    }
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

start();
