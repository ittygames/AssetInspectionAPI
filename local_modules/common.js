//Modules
var restful = require('node-restful'),
    mongoose = restful.mongoose,
    rsvp = require('rsvp');

var validateSingularChild = function (valuePath, model) {
    return new rsvp.Promise(function(resolve, reject) {
        if (valuePath) {
            model.findById(valuePath, function (err, modelreturn) {
                if(!modelreturn) {
                    reject(function(){return "Failed to find child with id of " +  valuePath;});
                }else{
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
};

var validateArrayChild = function (arrayValues, model) {
    arrayValues.forEach(function (entry) {
        validateSingularChild(entry, model);
    });
};

module.exports = {validateChild: validateSingularChild, validateArrayChild: validateArrayChild};