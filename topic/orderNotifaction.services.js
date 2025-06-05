import amqplib from "amqplib";

const OrderNotificationServices = () => {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
};
