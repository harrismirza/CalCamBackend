'use strict';

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/startrek'; // startrek is an example database name
var db = pgp(connectionString);