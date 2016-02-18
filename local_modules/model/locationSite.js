/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose,
    inspector = require('./inspector'),
    common = require('../common'),
    rsvp = require('rsvp');

//Schema
var locationSiteSchema = new mongoose.Schema({
    siteName: String,
    siteInspectors : [{
        type: 'ObjectId',
        ref: 'inspector'
    }]
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['site']};
    next();
};


var doValidation = function (req, res, next) {
    rsvp.all([
        common.validateArrayChild(req, res, next, req.body.siteInspectors, inspector)
    ]).then(function (comments) {
        next();
    }).catch(function (error) {
        var msg = error();
        console.log(msg);
        next({ status: 404, err: msg});
    });
};


//Return Model
var returnModel = restful.model('locationSite', locationSiteSchema);
returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);


returnModel.detail = true;
module.exports = returnModel;
