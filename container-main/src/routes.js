const { Router } = require('express');
const TestController = require('./controllers/test.controller');
const router = Router();

router.get('/path-one', TestController.get);
router.get('/path-two', TestController.add);
router.post('/send-message', TestController.send);

module.exports = router;