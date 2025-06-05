import amqplib from "amqplib";

const customerConsumer = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  //queue
  const customer_send_mail_queue = "customer_send_mail_queue";

  await channel.assertQueue(customer_send_mail_queue, { durable: false });
  await channel.consume(customer_send_mail_queue, (message) => {
    if (message !== null) {
      const msgContent = JSON.parse(message.content.toString());
      console.log("Received message for customer:", msgContent);
      // Acknowledge the message
      channel.ack(message);
    }
  });
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};

customerConsumer();
