const actions = require("../actions");

const holamundo = (_, args, context, info) => {
	return actions.getHolaMundo();
};

module.exports = {
	holamundo,
};
