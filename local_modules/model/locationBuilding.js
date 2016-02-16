/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    locationSite = require('./locationSite'),
    mongoose = restful.mongoose,
    common = require('../common');

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
    common.validateChild(req, res, next, req.body.site, locationSite);

};



//Return Model
var returnModel = restful.model('locationBuilding', locationBuildingSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;
