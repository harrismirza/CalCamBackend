'use strict';

var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://nyuyiemzmlswco:7fdc0f4044583567f588f8283d44b55c6755cfa81ad8ef988013859d49f83cfe@ec2-46-137-97-169.eu-west-1.compute.amazonaws.com:5432/d674efht8ffv86'; // startrek is an example database name
var db = pgp(connectionString);

function getUserDetails(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM app_user WHERE id = $1', id)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recieved all of the user\'s details'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getUserDetails(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM item WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recieved all of the details for the item'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createNewItem(req, res, next) {
  db.none('INSERT INTO item(barcode, calories, energy, fat, saturates, carbohydrates, sugars, protein, salt)' +
      'values(${barcode}, ${calories}, ${energy}, ${fat}, ${saturates}, ${carbohydrates}, ${sugars}, ${protein}, ${salt})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Created an item'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createNewUser(req, res, next) {
  db.none('INSERT INTO app_user(id, email, name, calories_g, energy_g, fat_g, saturates_g, carbs_g, sugars_g, protein_g, salt_g)' +
      'values(${id}, ${email}, ${name}, ${calories_g}, ${energy_g}, ${fat_g}, ${saturates_g}, ${carbs_g}, ${sugars_g}, ${protein_g}, ${salt_g})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Created a user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function consumeItem(req, res, next) {
  db.none('INSERT INTO consumed_item(id, barcode, date)' +
      'values(${id}, ${barcode}, ${date})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Added to user\'s database'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// TODO join tables

// function getDailyConsumpton(req, res, next) {
//   db.an('SELECT * FROM consumed_item()',
//     req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Added to user\'s database'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
