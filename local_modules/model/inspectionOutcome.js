/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    asset = require('./asset'),
    mongoose = restful.mongoose,
    common = require('../common');

//Schema
var inspectionOutcomeSchema = new mongoose.Schema({
    isPass: Boolean,
    replacementAsset: {
        type: 'ObjectId',
        ref: 'asset'
    },
    failureReason: String,
    inspectionDate: Date,
    failureDate: Date
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['site']};
    next();
};


var doValidation = function (req, res, next) {
    common.validateChild(req, res, next, req.body.replacementAsset, asset);
};



//Return Model
var returnModel = restful.model('inspectorOutcome', inspectionOutcomeSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;
