import amqplib from "amqplib";

const producer = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // queue
  const user_send_mail_queue = "user_send_mail_queue";
  const customer_send_mail_queue = "customer_send_mail_queue";
  // routing key
  const routing_key_for_user = "user_routing_key";
  const routing_key_for_customer = "customer_routing_key";

  // exchange
  const exchange = "send_mail_exchange";
};

producer();
