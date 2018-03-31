
var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');

/*
	ESTABLISH DATABASE CONNECTION
*/

var dbName = process.env.DB_NAME || 'node-login';
var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
	if (e) {
		console.log(e);
	} else {
		if (process.env.NODE_ENV == 'live') {
			db.authenticate(process.env.DB_USER, process.env.DB_PASS, function(e, res) {
				if (e) {
					console.log('mongo :: error: not authenticated', e);
				}
				else {
					console.log('mongo :: authenticated and connected to database :: "'+dbName+'"');
				}
			});
		}	else{
			console.log('mongo :: connected to database :: "'+dbName+'" "'+e+'"');
		}
	}
});

var accounts = db.collection('accounts');

/* login validation methods */

exports.autoLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) 
	{
		if (o){

			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

exports.manualLogin = function(addr, timestamp, callback)
{
	accounts.findOne({addr:addr}, function(e, o) {
		if (o == null){
			callback('address-not-registered');
		}	else{
			authenticeTimeStamp(addr, timestamp, function(tsAuthenticated) {
				if(tsAuthenticated) {
					callback(null, o);
								
				} else {
					callback('invalid-timestamp');
				}
			});
			
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, timestamp, callback)
{

	// find an object o in DB with address, if not taken continue
	accounts.findOne({addr:newData.addr}, function(e, o) {
		if (o){
			callback('address-taken');
		}
		else {
			accounts.findOne({user:newData.user}, function(e, o) {
				if (o){
					callback('username-taken');
				}	else{
					accounts.findOne({email:newData.email}, function(e, o) {
						if (o){
							callback('email-taken');
						}	else{
							authenticeTimeStamp(newData.addr, timestamp, function(tsAuthenticated) {
								if(tsAuthenticated) {
									newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
									accounts.insert(newData, {safe: true}, callback);

								}
							});
						}
					});
				}
			})
		}
	});
}

exports.updateAccount = function(newData, callback)
{
	accounts.findOne({_id:getObjectId(newData.id)}, function(e, o){
		o.name 		= newData.name;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
			accounts.save(o, {safe: true}, function(e) {
				if (e) callback(e);
				else callback(null, o);
			});
		}	else{
			saltAndHash(newData.pass, function(hash){
				o.pass = hash;
				accounts.save(o, {safe: true}, function(e) {
					if (e) callback(e);
					else callback(null, o);
				});
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
	accounts.remove({_id: getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
	accounts.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateResetLink = function(email, passHash, callback)
{
	accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

exports.delAllRecords = function(callback)
{
	accounts.remove({}, callback); // reset accounts collection for testing //
}

exports.getEthereumAddress = function(addr) 
{
	return "foobar";
}

exports.getTimeStamp = function(addr) {
	return "this-is-an-encrypted-timestamp";
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
	accounts.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}

// gets and authenticates timestamp 
var authenticeTimeStamp = function(addr, timestamp, callback) {

	// given timestamp and address, authenticate timeliness

	callback(true);
}

