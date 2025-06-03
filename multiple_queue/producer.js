import amqplib from "amqplib";

const producer = async () => {
  const connection = await amqplib.connect("amqp://localhost");
};

producer();
