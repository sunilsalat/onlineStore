require("dotenv").config();

const variables = {
    exchange_name: process.env.EXCHANGE_NAME,
    msg_queue_url: process.env.MSG_QUEUE_URL,
    redis_url: process.env.REDIS_URL,
};

export { variables };
