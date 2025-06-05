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

sendMessage("order.placed", { orderId: 12345, status: "placed" });
sendMessage();
