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
  // bind the queue to the exchange
  await channel.bindQueue(queue, exchange, routingKey);

  //message to send
  const message = {
    text: "Hello, this is a message from the producer!",
    timestamp: new Date().toISOString(),
  };
  // send the message
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

  console.log("Message sent");
};
