import amqplib from "amqplib";

const OrderNotificationServices = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const exchange = "notification_exchange";
  const queue = "order_queue";
  const exchangeType = "topic";
  await channel.assertExchange(exchange, exchangeType, { durable: true });
  await channel.assertQueue(queue, { durable: true });

  // added to condition
  await channel.bindQueue(queue, exchange, "order.*");
};
