/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose,
    property = require('./property');


//Schema
var propertyValuesSchema = new mongoose.Schema({
    value : String,
    property:{
        type:'ObjectId',
        ref:'property'
    },
    objectRef: {
        type :'ObjectId'
    }
});



// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['property','objectRef']};
    next();
};

var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateChild(req.body.property, property)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        res.send({ status: 404, err: msg});
    });

};





//Return Model
var returnModel = restful.model('propertyValues', propertyValuesSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


module.exports = returnModel;
