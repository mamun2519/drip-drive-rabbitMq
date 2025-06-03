import amqplib from "amqplib";

const customerConsumer = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  //queue
  const customer_send_mail_queue = "customer_send_mail_queue";
};

customerConsumer();
