/*
 *
 * Asset Insertion Tracking API
 * Created By Carl Wright
 * Server.js
 * Last Modified 14/02/16
 *
 */

//dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Mongoose
mongoose.connect('mongodb://localhost/asset_inspection');

//Express
var port = 8080;
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//routes
app.use('/api', require('./local_modules/routes/api'));

//Start Server
app.set('domain', '202.0.51.105')
app.listen(port, "0.0.0.0");
console.log('Asset Inspection Tracking API running on port: ' + port);