var express = require('express');
var router = express.Router();

var controller = require('./controller.js');

router.post('/user', controller.getUserDetails);
router.post('/item', controller.getItemDetails);
router.post('/user/consumeItem', controller.consumeItem);
router.post('/user/consumption', controller.getDailyConsumption);

router.post('/user/create', controller.createNewUser);
router.post('/item/create', controller.createNewItem);


module.exports = router;
