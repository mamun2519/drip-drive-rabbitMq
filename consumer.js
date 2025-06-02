import amqplib from "amqplib";

const receiveMessage = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "message_queue";

  // create a queue
  await channel.assertQueue(queue, { durable: false });

  // consume messages from the queue
  await channel.consume(queue, (message) => {
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

receiveMessage();
