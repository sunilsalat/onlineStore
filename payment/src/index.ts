import connectToDb from "./config/connectDb";
import { orderListeners } from "./events/listener/orderListeners";
import { mqClient } from "./events/mq";
import { app } from "./server";
require("dotenv").config();

const start = async () => {
    await connectToDb(process.env.MONGO_URI!);

    setTimeout(async () => {
        await mqClient.connect(
            process.env.EXCHANGE_NAME!,
            process.env.MSG_QUEUE_URL!
        );

        console.log("Payment app connected to MQ");

        orderListeners();
    }, 15000);

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
};

start();
