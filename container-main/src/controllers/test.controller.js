const AWSXRay = require('aws-xray-sdk-core');
const sleep = require('../utils/sleep');
const SQSService = require('../services/sqs.service');
const APIervice = require('../services/api.service');

class TestController {
  async get(req, res) {
    try {
      const seg = AWSXRay.getSegment();
      seg.addAnnotation('controller', 'get');
      seg.addMetadata("mymetadata ", "some text here");
      await sleep(2000);

      res.json({
        data: 'This is test'
      });
      seg.close();
    } catch (error) {
      console.log('error =>', error);
      res.json({ error: error.message });
    }
  }

  async add(req, res) {
    try {
      const seg = AWSXRay.getSegment();
      seg.addAnnotation('controller', 'add');
      seg.addMetadata("metadata ", "some text here");

      const apiResult = await APIervice.getContainerProcess('/api/process');
      res.json({
        data: apiResult.data
      });

      seg.close();
    } catch (error) {
      console.log('error =>', error);
      res.json({ error: error.message });
    }
  }

  async send(req, res) {
    try {
      const seg = AWSXRay.getSegment();
      seg.addAnnotation('controller', 'send');

      const sub = seg.addNewSubsegment('send message to sqs');
      const sendResult = await SQSService.sendMessage('1234', '1234', req.body.message, process.env.MAIN_SQS_QUEUE_URL);
      console.log('sendResult =>', sendResult);
      sub.addAnnotation('sendResult', JSON.stringify(sendResult));
      sub.close();

      res.json({
        data: `[${req.body.message}] message sent`
      });
    } catch (error) {
      console.log('error =>', error);
      res.json({ error: error.message });
    }
  }
}

module.exports = new TestController();