//Modules
var restful = require('node-restful'),
    mongoose = restful.mongoose;

var validateSingularChild = function (req, res, next, valuePath, model) {
    if (valuePath) {
        model.findById(valuePath, function (err, model) {
            if (!model) {
                return next(restful.objectNotFound());
            }
            next();
        });
    } else {
        next();
    }
};

var validateArrayChild = function (req, res, next, arrayValues, model) {
    arrayValues.forEach(function (entry) {
        validateSingularChild(req, res, next, entry, model);
    });
};

module.exports = {validateChild: validateSingularChild, validateArrayChild: validateArrayChild};