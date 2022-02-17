const rabbit = require('amqplib');
const QUEUE_NAME = 'square';
connection = rabbit.connect('amqp://localhost');
console.log('Connected to RabbitMQ');
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  console.log('channel created');
  channel.consume(QUEUE_NAME, (m) => {
    const number = parseInt(m.content.toString());
    const square = number * number;
    console.log(`Message is consumed. square=${square}`);
    channel.ack(m);
  });
});
