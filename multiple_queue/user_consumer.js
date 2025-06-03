import amqplib from "amqplib";

const userConsumer = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  //queue
  const user_send_mail_queue = "user_send_mail_queue";
  await channel.assertQueue(user_send_mail_queue, { durable: false });
};

userConsumer();
