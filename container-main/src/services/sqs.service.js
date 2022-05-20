const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk-core');
const sqs = AWSXRay.captureAWSClient(new AWS.SQS());

class SQSService {
  sendMessage(messageGroupId, messageDeduplicationId, messageBody, queueUrl) {
    const params = {
      MessageGroupId: messageGroupId,
      MessageDeduplicationId: messageDeduplicationId,
      MessageBody: messageBody,
      QueueUrl: queueUrl,
    };
    return sqs.sendMessage(params).promise();
  }
}

module.exports = new SQSService();