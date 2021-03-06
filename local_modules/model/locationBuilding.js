/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    locationSite = require('./locationSite'),
    mongoose = restful.mongoose,
    common = require('../common'),
    rsvp = require('rsvp');

//Schema
var locationBuildingSchema = new mongoose.Schema({
    buildingName: String,
    site: {
        type: 'ObjectId',
        ref: 'locationSite'
    }
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['site']};
    next();
};


var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateChild(req.body.site, locationSite)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        res.send({ status: 404, err: msg});
    });
};



//Return Model
var returnModel = restful.model('locationBuilding', locationBuildingSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;
