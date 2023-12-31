import connectToDb from "./config/connectDb";
import { expirationListeners } from "./events/listener/expirationListeners";
import { loadProductListeners } from "./events/listener/productListeners";
import { RPCObserver, mqClient } from "./events/mq";
import { app } from "./server";
require("dotenv").config();

const start = async () => {
    await connectToDb(process.env.MONGO_URI!);

    setTimeout(async () => {
        await mqClient.connect(
            process.env.EXCHANGE_NAME!,
            process.env.MSG_QUEUE_URL!
        );

        loadProductListeners();
        expirationListeners();
        RPCObserver("ORDER_OBSERVER");
    }, 15000);

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
};

start();
