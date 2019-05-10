const authActions = require('./authActions');
const userActions = require('./userActions');
const restaurantActions = require('./restaurantActions');
const dishActions = require('./dishActions');
module.exports = {
	...authActions,
	...userActions,
	...restaurantActions,
	...dishActions
};