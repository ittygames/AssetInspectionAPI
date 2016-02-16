/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose;

//Schema
var assetTypeSchema = new mongoose.Schema({
    name: {type: String, index: {unique: true}},
    inspectionFrequency: Number
});


//Return Model
var returnModel = restful.model('assetType', assetTypeSchema);
returnModel.methods(['get', 'put', 'post', 'delete']);


returnModel.detail = true;
module.exports = returnModel;
