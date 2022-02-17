const rabbit = require('amqplib');
const QUEUE_NAME = 'square';
connection = rabbit.connect('amqp://localhost');
console.log('Connected to RabbitMQ');
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  console.log('channel created');
  channel.consume(QUEUE_NAME, (m) => {
    const content = m.content.toString();
    console.log(`Message received. content=${content}`);
    if (!isNaN(parseInt(content))) {
      const number = parseInt(content);
      const square = number * number;
      console.log(`Message is consumed.Number: ${number}, square=${square}`);
      channel.ack(m);
    } else {
      const object = JSON.parse(content);
      console.log(`Message is consumed. object=${JSON.stringify(object)}`);
      channel.ack(m);
    }
  });
});
