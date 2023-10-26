import connectToDb from "./config/connectDb";
import { orderListeners } from "./events/listener/orderListeners";
import { userListeners } from "./events/listener/userListeners";
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

        console.log("product app connected to mq");

        orderListeners();
        userListeners();
    }, 15000);

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
};

start();
