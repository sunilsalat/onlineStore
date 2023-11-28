export const PublishMessage = async (
    channel: any,
    EXCHANGE_NAME: string,
    TOPIC: string,
    msg: any
) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", {
        durable: true,
    });
    channel.publish(EXCHANGE_NAME, TOPIC, Buffer.from(JSON.stringify(msg)));
    console.log(`Sent: EXCHANGE-${EXCHANGE_NAME}: TOPIC-${TOPIC} `, msg);
};
