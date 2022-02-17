const rabbit = require('amqplib');
const QUEUE_NAME = 'square';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'main';
const KEY = 'myKey';
const numbers = ['1', '2', '3', '4', '5'];
const objects = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Jane',
    age: 25,
  },
  {
    name: 'Jack',
    age: 20,
  },
  {
    name: 'Jill',
    age: 15,
  },
  {
    name: 'Joe',
    age: 10,
  },
];
connection = rabbit.connect('amqp://localhost');
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
  await channel.assertQueue(QUEUE_NAME);
  channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
  numbers.forEach((number) => {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(number));
    console.log(`Message sent. number=${number}`);
  });
  // objects.forEach((object) => {
  //   channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(object)));
  // });
});
