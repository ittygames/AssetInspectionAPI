//Modules
var restful = require('node-restful'),
    mongoose = restful.mongoose,
    rsvp = require('rsvp');

var validateSingularChild = function (valuePath, model) {
    return new rsvp.Promise(function(resolve, reject) {
        model.findById(valuePath, function (err, modelreturn) {
                if(!modelreturn) {
                    console.log('here');
                    reject(function(){return "Failed to find child with id of " +  valuePath;});
                }else{
                    resolve();
                }
            });
    });
};

var validateUniqueArrayChildren = function (inputArray, typeName) {
    console.log(inputArray);
    var rejectStatement = function(){return typeName + " children must be unique";};

    return new rsvp.Promise(function(resolve, reject) {
        var valueStore = [],
            passed = true;

        for (var i = 0; i < inputArray.length; i+=1){

            if (valueStore.indexOf(inputArray[i]) > -1){
                passed = false;
            }else{
                console.log('detected dupe');
                valueStore.push(inputArray[i]);
            }
        }

        if(passed) {
            resolve();
        }else{
            reject(rejectStatement);
        }
    });
};

module.exports = {validateChild: validateSingularChild, validateUniqueChildren: validateUniqueArrayChildren};