
//Dependencies
var restful = require('node-restful'),
    mongoose = restful.mongoose;

//Schema
var inspectorSchema = new mongoose.Schema({
    name: String,
    employeeID: Number

});

//Return Model
module.exports = restful.model("Inspectors", inspectorSchema);

