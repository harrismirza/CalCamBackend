var express = require('express'),
	app = express();
	port = process.env.PORT || 3000,
	router = express.Router();

app.listen(port);

var controller = require('./controller.js');

router.get('/user/:userId', controller.getUserDetails);
router.get('/user/:itemId', controller.getItemDetails);
router.get('/user/:userId/consume/:itemId', controller.consumeItem);
router.get('/user/:userId/consumtion', controller.getDailyConsumpton);

router.post('/user/:userId', controller.createNewUser);
router.post('/user/:itemId', controller.createNewItem);


console.log('REST API started on: ' + port);
