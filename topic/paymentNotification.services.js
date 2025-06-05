import amqplib from "amqplib";

const paymentNotificationServices = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "notification_exchange";
  const exchangeType = "topic";
  const queue = "payment_queue";

  await channel.assertExchange(exchange, exchangeType, { durable: true });
  await channel.assertQueue(queue, { durable: true });

  await channel.bindQueue(queue, exchange, "payment.*");
  channel.consume(queue, (message) => {
    if (message !== null) {
      const msgContent = JSON.parse(message.content.toString());
      console.log("Received message:", msgContent);
      // Acknowledge the message
      channel.ack(message);
    }
  });

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};

paymentNotificationServices();
