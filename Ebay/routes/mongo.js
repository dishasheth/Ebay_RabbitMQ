var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var ejs= require('ejs');//importing module ejs
var pool = [],free = [], req = [];
var current_connection;
var mongoURL = "mongodb://localhost:27017/myEbay";

/**

* Connects to the MongoDB Database with the provided URL

*/

exports.connect = function(url, callback){
var _db= p.get(url);
db = _db;
connected = true;
console.log(connected +" is connected?");
callback(db);
p.release(db);
};

/**

* Returns the collection on the selected database

*/

exports.collection = function(name){
if (!connected) {
throw new Error('Must connect to Mongo before calling "collection"');
}

var coll=db.collection(name);
return coll;
};

function getConnection(pool){
MongoClient.connect(mongoURL, function(err, _db){
if (err) { throw new Error('Could not connect: '+err); }
db = _db;
connected = true;
pool.push(db);
});

}

function Pool()
{
for(var i=0; i < 500; ++i)
{
getConnection(pool);
free.push(i);
}
}

Pool.prototype.get = function(request_name)
{
if(free.length > 0)
{
var db = pool[free.length-1];
free.pop();
current_db = db;
return current_db;
}
else
{
req.push(request_name);
return null;
}
}

Pool.prototype.release = function(number)
{
free.push(number);
if(req.length > 0)
{
Pool.get(req[0]);
req.slice(0,1);
}
};
var p=new Pool();