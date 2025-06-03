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

  const UserMessage = {
    to: "juborajislam46@gmail.com",
    form: "programmingHero@gmail.com",
    subject: "Thank You",
    bodyL: "Hello world",
  };

  const CustomerMessage = {
    to: "mamun@gmail.com",
    form: "programmingHero@gmail.com",
    subject: "Thank You",
    bodyL: "Hello world",
  };

  // create exchange
  await channel.assertExchange(exchange, "direct", { durable: false });
  // create queue
  await channel.assertQueue(user_send_mail_queue, { durable: false });
  await channel.assertQueue(customer_send_mail_queue, { durable: false });

  // find queue between exchange
  await channel.bindQueue(user_send_mail_queue, exchange, routing_key_for_user);
  await channel.bindQueue(
    customer_send_mail_queue,
    exchange,
    routing_key_for_customer
  );

  // publish message
  channel.publish(
    exchange,
    routing_key_for_user,
    Buffer.from(JSON.stringify(UserMessage))
  );

  channel.publish(
    exchange,
    routing_key_for_customer,
    Buffer.from(JSON.stringify(UserMessage))
  );

  console.log("Message sent");

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};

producer();
