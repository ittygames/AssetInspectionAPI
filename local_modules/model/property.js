/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose,
    template = require('./template'),
    common = require('../common');


//Schema
var propertiesSchema = new mongoose.Schema({
    name : String,
    type : String,
    template : {
        type:'ObjectId',
        ref:'template'
    },
    order: Number
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['template']};
    next();
};

var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateChild(req.body.template, template)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        res.send({ status: 404, err: msg});
    });

};



//Return Model
var returnModel = restful.model('property', propertiesSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


module.exports = returnModel;
