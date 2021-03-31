const { Kafka } = require("kafkajs")

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ "groupId": process.argv[2] })
    console.log("Connecting.....")
    await consumer.connect()
    console.log("Connected!")

    await consumer.subscribe({
      fromBeginning: true,
      "topic": "TEST",
    });

    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`RVD Msg ${message.value} on partition ${partition}`);
        await consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }])
      }
    });
    process.on('SIGINT', async () => {
      console.log('Received sigint');
      await consumer.disconnect();
      process.exit(0);
    });
  }
  catch (ex) {
    console.error(`Something bad happened ${ex}`)
  }
  finally {

  }
}