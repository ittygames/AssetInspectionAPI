/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose,
    type = require('./type'),
    template = require('./template'),
    common = require('../common');


//Schema
var typeTemplateSchema = new mongoose.Schema({
    type: {
        type: 'ObjectId',
        ref: 'type'
    },
    templates:[{
        type: 'ObjectId',
        ref: 'template'}]
});


// population / validation handlers
var setPopulation = function (req, res, next) {
    req.query = {populate: ['type','templates']};
    next();
};


var doValidation = function (req, res, next) {
    rsvp.all( [common.validateUniqueChildren(req.body.templates, 'Templates')].concat(
            req.body.templates.map(function(i) {return common.validateChild(i, template);})).concat(
                [common.validateChild(req.body.type, type)])
    ).then(function() {
            next();
        }).catch(function(error) {
            var msg = error();
            res.send({ status: 404, err: msg});
        });
};


//Return Model
var returnModel = restful.model('typeTemplate', typeTemplateSchema);

returnModel.methods([ {method: 'get', before: setPopulation}, {method: 'put', before: doValidation}, {method: 'post', before: doValidation}, 'delete']);

module.exports = returnModel;
