/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    asset = require('./asset'),
    mongoose = restful.mongoose,
    common = require('../common'),
    rsvp = require('rsvp');

//Schema
var inspectionOutcomeSchema = new mongoose.Schema({
    inspectionCompleted: Boolean,
    isPass: Boolean,
    replacementAsset: {
        type: 'ObjectId',
        ref: 'asset',
        required: false
    },
    failureReason: String,
    inspectionDate: Date,
    type:{
        type: 'ObjectId',
        ref: 'type'
    }
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['replacementAsset']};
    next();
};

var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateChild(req.body.replacementAsset, asset)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        res.send({ status: 404, err: msg});
    });
};


//Set Methods and Return Model
var returnModel = restful.model('inspectionOutcome', inspectionOutcomeSchema);
returnModel.methods([
    {method: 'get', before: setPopulation},
    {method: 'put', before: doValidation},
    'post',
    'delete']);

returnModel.detail = true;
module.exports = returnModel;
