import amqplib from "amqplib";

const paymentNotificationServices = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
};

paymentNotificationServices();
