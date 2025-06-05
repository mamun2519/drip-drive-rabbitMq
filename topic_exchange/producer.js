import amqplib from "amqplib";

const sendMessage = async (routeKey, message) => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "notification_exchange";
  const exchangeType = "topic";

  await channel.assertExchange(exchange, exchangeType, { durable: true });

  channel.publish(exchange, routeKey, Buffer.from(JSON.stringify(message)));
  console.log("message send success");
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};

await sendMessage("order.placed", { orderId: 12345, status: "placed" });
await sendMessage("payment.processed", {
  paymentId: 6579,
  status: "processed",
});

//Note: When we use topic that time does not need producer bind queue. consumer create bind and queue
