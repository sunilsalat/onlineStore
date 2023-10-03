import connectToDb from "./config/connectDb";
import { baseListener } from "./events/listener/baseListener";
import { loadProductListeners } from "./events/listener/productListeners";
import { mqClient } from "./events/mq/rpc";
import { Product } from "./models/Product";
import { app } from "./server";
require("dotenv").config();

const start = async () => {
    await connectToDb(process.env.MONGO_URI!);

    setTimeout(async () => {
        await mqClient.connect(
            process.env.EXCHANGE_NAME!,
            process.env.MSG_QUEUE_URL!
        );

        console.log("Order app connected to MQ");

        loadProductListeners();
    }, 15000);

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
};

start();
