export const PublishMessage = (
  channel: any,
  EXCHANGE_NAME: string,
  TOPIC: string,
  msg: any
) => {
  channel.publish(EXCHANGE_NAME, TOPIC, Buffer.from(JSON.stringify(msg)));
  console.log(`Sent: EXCHANGE-${EXCHANGE_NAME}: TOPIC-${TOPIC} `, msg);
};
