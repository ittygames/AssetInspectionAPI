
//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose;

//Schema
var inspectorSchema = new mongoose.Schema({
    name: String,
    employeeID: Number,
    loginName: String
});


//Return Model
var returnModel = restful.model('inspector', inspectorSchema);
returnModel.methods(['get', 'put', 'post', 'delete']);


returnModel.detail = true;
module.exports = returnModel;
