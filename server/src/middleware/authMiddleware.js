module.exports = function (req, res, next) {
	// Dummy authentication middleware
	console.log('Auth middleware');
	next();
  };
  