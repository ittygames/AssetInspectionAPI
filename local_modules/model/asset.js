/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    assetType = require('./assetType'),
    mongoose = restful.mongoose,
    common = require('../common');


//Schema
var assetSchema = new mongoose.Schema({
    age: Number,
    type: {
        type: 'ObjectId',
        ref: 'assetType'
    }
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['type']};
    next();
};

var doValidation = function (req, res, next) {
    common.validateChild(req, res, next, req.body.type, assetType);
    //next(); // Required, so error later
};


//Return Model
var returnModel = restful.model('asset', assetSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;

