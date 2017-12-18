var arangojs = require('arangojs');
var db = new arangojs.Database({url:'http://127.0.0.1:8529', databaseName:'nodeArangoWebAppDB'}); 
module.exports = {
    getAllUsers : function(){
        return db.query('FOR x IN User RETURN x')
            .then(function (cursor) {
                return  cursor.all();
            // cursor is a cursor for the query result
        });
    },
    getAllAirportsLAX : function(){
        return db.query('FOR airport IN OUTBOUND \'airports/LAX\' flights RETURN DISTINCT airport')
            .then(function (cursor) {
                return  cursor.all();
            // cursor is a cursor for the query result
        });
    },
    getWayMoreShortBetweenAirports: function(){
        return db.query('FOR v, e, p IN 2 OUTBOUND \'airports/BIS\' flights FILTER v._id == \'airports/JFK\' LIMIT 5 RETURN p')
            .then(function (cursor) {
                return  cursor.all();
        // cursor is a cursor for the query result
        });
    }
}
                 