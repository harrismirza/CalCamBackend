'use strict';

var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://nyuyiemzmlswco:7fdc0f4044583567f588f8283d44b55c6755cfa81ad8ef988013859d49f83cfe@ec2-46-137-97-169.eu-west-1.compute.amazonaws.com:5432/d674efht8ffv86'; // startrek is an example database name
var db = pgp(connectionString);


  exports.getUserDetails = function(req, res, next) {
    console.log("User Details: " + req.body);
    db.one('SELECT * FROM users WHERE id = ${id}', req.body)
    .then(function(data) {
      res.status(200)
      .json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
  }

  exports.getItemDetails = function(req, res, next) {
    console.log("Item Details: " + req.body);
    db.one('SELECT * FROM item WHERE barcode = ${barcode}', req.body)
    .then(function (data) {
      res.status(200)
      .json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
  }
  exports.createNewItem = function(req, res, next) {
    console.log("Create Item: " + req.body);
    db.none('INSERT INTO item(barcode, calories, energy, fat, saturates, carbohydrates, sugars, protein, salt)' +
      ' values(${barcode}, ${calories}, ${energy}, ${fat}, ${saturates}, ${carbohydrates}, ${sugars}, ${protein}, ${salt})',
      req.body)
    .then(function () {
      res.status(200)
      .json({
        status: 'success',
        message: 'Created an item'
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
  }

  exports.createNewUser = function(req, res, next) {
    console.log("Create User: " + req.body);
    db.none('INSERT INTO users(id, email, name, calories_g, energy_g, fat_g, saturates_g, carbohydrates_g, sugars_g, protein_g, salt_g)' +
      ' values (${id}, ${email}, ${name}, ${calories_g}, ${energy_g}, ${fat_g}, ${saturates_g}, ${carbohydrates_g}, ${sugars_g}, ${protein_g}, ${salt_g})',
      req.body)
    .then(function () {
      res.status(200)
      .json({
        status: 'success',
        message: 'Created a user'
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
  }

  exports.consumeItem = function(req, res, next) {
    console.log("Consume Item: " + req.body);
    let date = new Date();
    db.none('INSERT INTO consumed_item(id, barcode, date) ' +
      ' values(${id}, ${barcode}, ' + date.toISOString() + ')',
      req.body)
    .then(function () {
      res.status(200)
      .json({
        status: 'success',
        message: 'Added to user\'s database'
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
  }


  exports.getDailyConsumption = function(req, res, next) {
    console.log("Daily Consumption: " + req.body);
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    let date2 = new Date();
    date2.setHours(23);
    date2.setMinutes(59);
    date2.setSeconds(59);
    db.one('SELECT SUM(calories) AS calories, SUM(energy) AS energy, SUM(fat) AS fat, SUM(saturates) AS saturates, SUM(carbohydrates) AS carbohydrates, SUM(sugars) AS sugars, SUM(protein) AS protein, SUM(salt) AS salt FROM ((consumed_item NATURAL JOIN item) NATURAL JOIN users) WHERE id = ${id} AND date < \'' + date2.toISOString() + '\' AND date > \'' + date.toISOString() + '\';'  ,
      req.body)
    .then(function (data) {
      res.status(200)
      .json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
  }

