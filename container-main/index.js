const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const AWSXRay = require('aws-xray-sdk-core');
const XRayExpress = require('aws-xray-sdk-express');

// to capture http calls
AWSXRay.captureHTTPs(require('http'));
const routes = require('./src/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const serviceName = "MAIN_CONTAINER";
const port = 8080;

AWSXRay.middleware.setSamplingRules('./config/sampling-rules.json');
app.use(XRayExpress.openSegment(serviceName));

app.use('/api', routes);
app.use(XRayExpress.closeSegment());
app.listen(port);
console.log(`${serviceName} running on port: ${port}`);