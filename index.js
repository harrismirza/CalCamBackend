var express = require('express'),
	app = express();
	port = process.env.PORT || 3000,
	router = express.Router();

app.listen(port);

var controller = require('./controller.js');

router.get('/user/:userId', controller.getUserDetails);
router.post('/user/:userId', controller.createNewUser)
	.get()
	.post(userController.createNewUser);

app.route('/user/:userId/consume/:food')
	.get(userController.addItem);


console.log('REST API started on: ' + port)