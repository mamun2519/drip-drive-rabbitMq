import amqplib from "amqplib";

const producer = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
};

producer();
