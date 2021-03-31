const { Kafka } = require('kafkajs');

const sendMessage = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ["localhost:9092"],
    });
    const producer = kafka.producer();
    console.log('Connecting...');
    await producer.connect();
    console.log('Connected!');
    const res = await producer.send({
      topic: "TEST",
      messages: [{
        value: JSON.stringify({ admin_id: 9999999, user_name: 'jp_new', phone_number: '9177882006', department: 'Tech Team Newww', reports_to: null }),
      }]
    });
    console.log(res, 'got this after sending');
    producer.disconnect();
  } catch (err) {
    console.log(err);
  }
}

const run = async () => {
  for(let i = 0; i < 10; i++) {
    await sendMessage();
  }
}

run()
