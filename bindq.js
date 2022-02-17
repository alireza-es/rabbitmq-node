const rabbit = require('amqplib');
const QUEUE_NAME = 'square';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'main';
const KEY = 'myKey';
const number = '8';
connection = rabbit.connect('amqp://localhost');
console.log('Connected to RabbitMQ');
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  console.log('channel created');
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
  console.log('exchange created');
  await channel.assertQueue(QUEUE_NAME);
  console.log('queue created');
  channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
  console.log('binding queue');
  channel.sendToQueue(QUEUE_NAME, Buffer.from(number));
  console.log('sent to queue');
});
