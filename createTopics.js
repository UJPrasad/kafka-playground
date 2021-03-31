const { Kafka } = require('kafkajs')

const createTopics = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ["localhost:9092"],
    });
    const admin = kafka.admin(); 
    console.log('Connecting...');
    await admin.connect();
    console.log('Connected!');
    await admin.createTopics({
      topics: [
        {
          topic: "TEST",
        }
      ],
    });
    console.log('Creating topics');
    await admin.disconnect();
  } catch (err) {
    console.log('Error', err);
  }
}

createTopics();