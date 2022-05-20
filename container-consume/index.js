const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const https = require('https');

const app = Consumer.create({
  queueUrl: process.env.MAIN_SQS_QUEUE_URL,
  handleMessage: async (message) => {
    console.log('message =>', message);
    // dynamodb
  },
  sqs: new AWS.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true
      })
    }
  })
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();