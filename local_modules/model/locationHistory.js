
/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    asset = require('./asset'),
    locationDetail = require('./locationDetails'),
    locationBuilding = require('./locationBuilding'),
    locationSite = require('./locationSite'),
    common = require('../common'),
    mongoose = restful.mongoose,
    rsvp = require('rsvp');

//Schema
var locationHistorySchema = new mongoose.Schema({
    asset: {
        type: 'ObjectId',
        ref: 'asset'
    },
    detail: {
        type: 'ObjectId',
        ref: 'locationDetail'
    },
    building: {
        type: 'ObjectId',
        ref: 'locationBuilding'
    },
    site: {
        type: 'ObjectId',
        ref: 'locationSite'
    },
    order: Number,
    installDate: Date
});



// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['site']};
    next();
};


var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateChild(req, res, next, req.body.site, locationSite),
        common.validateChild(req, res, next, req.body.building, locationBuilding),
        common.validateChild(req, res, next, req.body.detail, locationDetail),
        common.validateChild(req, res, next, req.body.asset, asset)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        console.log(msg);
        next({ status: 404, err: msg});
    });

};



//Return Model
var returnModel = restful.model('locationHistory', locationHistorySchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;
