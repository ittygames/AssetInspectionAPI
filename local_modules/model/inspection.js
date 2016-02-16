/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    inspector = require('./inspector'),
    asset = require('./asset'),
    inspectionOutcome = require('./inspectionOutcome'),
    mongoose = restful.mongoose,
    common = require('../common');

//Schema
var inspectionSchema = new mongoose.Schema({
    inspector: {
        type: 'ObjectId',
        ref: 'inspector',
        required: true
    },
    dueDate: Date,
    asset: {
        type: 'ObjectId',
        ref: 'asset',
        required: true
    },
    outcome:  {
        type: 'ObjectId',
        ref: 'inspectionOutcome'
    }
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['inspector', 'asset', 'outcome']};
    next();
};


var doValidation = function (req, res, next) {
    common.validateChild(req, res, next, req.body.inspector, inspector);
    common.validateChild(req, res, next, req.body.asset, asset);
    common.validateChild(req, res, next, req.body.outcome, inspectionOutcome);
};



//Return Model
var returnModel = restful.model('inspection', inspectionSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;
