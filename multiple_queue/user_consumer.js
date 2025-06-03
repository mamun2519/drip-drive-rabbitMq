import amqplib from "amqplib";

const userConsumer = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  //queue
  const user_send_mail_queue = "user_send_mail_queue";
  await channel.assertQueue(user_send_mail_queue, { durable: false });

  // receive message
  await channel.consume(user_send_mail_queue, (message) => {
    if (message !== null) {
      const msgContent = JSON.parse(message.content.toString());
      console.log("Received message for user:", msgContent);
      // Acknowledge the message
      channel.ack(message);
    }
  });

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};

userConsumer();
