import amqplib from "amqplib";

const paymentNotificationServices = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "notification_exchange";
  const exchangeType = "topic";
  const queue = "payment_queue";

  await channel.assertExchange(exchange, exchangeType, { durable: true });
};

paymentNotificationServices();
