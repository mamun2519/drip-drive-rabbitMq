import amqplib from "amqplib";

const sendMessage = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "notification_exchange";
  const exchangeType = "topic";

  await channel.assertExchange(exchange, exchangeType, { durable: true });
};

sendMessage();
