
var express = require('express');
var router = express.Router();
var service = require('../services/DataServices.js');
/* GET airports listing. */
router.get('/', function(req, res, next) {
   console.log('↓↓↓↓ Getting Airports lists ↓↓↓↓');
  // geting airport list from data Service
  service.getAllAirportsLAX().then(
    function (list) {
      console.log('AirportsList --> ', list);
      //render airportlist view with list if airport
      res.render('airportlist', { 'airportlist': list });
    },
    function (err) {
      console.error('Something went wrong:', err);
      res.send('There was a problem adding the information to the database. ' + err);
    }
  );
  //res.send('respond with a resource');
});
router.get('/graph', function(req, res, next) {
  console.log('Getting Graph');
  service.getWayMoreShortBetweenAirports().then(
    function (data) {
      console.log('Graph Json --> ', data[0].edges[0]._from);
      res.render('airportGraph', { 'airportGraph': data });  
    }
  );
});
module.exports = router;