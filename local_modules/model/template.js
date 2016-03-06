/**
 * Created by Carl on 14/02/2016.
 */

//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose;


//Schema
var templateSchema = new mongoose.Schema({
   name : String
});


//Return Model
var returnModel = restful.model('template', templateSchema);
returnModel.methods(['get', 'put', 'post', 'delete']);


module.exports = returnModel;
