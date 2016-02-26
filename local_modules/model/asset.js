/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    assetType = require('./assetType'),
    inspector = require('./inspector'),
    mongoose = restful.mongoose,
    common = require('../common'),
    rsvp = require('rsvp');


//Schema
var assetSchema = new mongoose.Schema({
    age: Number,
    type: {
        type: 'ObjectId',
        ref: 'assetType'
    },
    primaryInspector : {
        type: 'ObjectId',
        ref: 'inspector'
    }

});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['type','primaryInspector']};
    next();
};

var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateChild(req.body.type, assetType),
        common.validateChild(req.body.primaryInspector, inspector)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        res.send({ status: 404, err: msg});
    });

};


//Return Model
var returnModel = restful.model('asset', assetSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;

