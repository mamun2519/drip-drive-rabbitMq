import amqplib from "amqplib";

const sendMessage = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "message_queue";
  const exchange = "message_exchange";
  const routingKey = "message_routing_key";

  // create a exchange
  await channel.assertExchange(exchange, "direct", { durable: false });
  // create a queue
  await channel.assertQueue(queue, { durable: false });
};
