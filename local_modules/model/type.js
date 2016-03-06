/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose;

//Schema
var typeSchema = new mongoose.Schema({
    name: String
});


//Return Model
var returnModel = restful.model('type', typeSchema);
returnModel.methods(['get', 'put', 'post', 'delete']);


module.exports = returnModel;
