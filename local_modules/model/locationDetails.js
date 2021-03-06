/**
 * Created by Carl on 14/02/2016.
 */
/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    locationBuilding = require('./locationBuilding'),
    locationSite = require('./locationSite'),
    mongoose = restful.mongoose,
    common = require('../common'),
    rsvp = require('rsvp');

//Schema
var locationDetailsSchema = new mongoose.Schema({
    building: {
        type: 'ObjectId',
        ref: 'locationBuilding'
    },
    site: {
        type: 'ObjectId',
        ref: 'locationSite'
    },
    room: [String],
    floor: [Number],
    description: String
});



// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['site', 'building']};
    next();
};


var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateChild(req.body.site, locationSite),
        common.validateChild(req.body.building, locationBuilding)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        res.send({ status: 404, err: msg});
    });

};



//Return Model
var returnModel = restful.model('locationDetails', locationDetailsSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;
