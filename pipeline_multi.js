var redis = require("redis"),
	client = redis.createClient(), multi;

client.multi([
	["mget", "multifoo", "multibra", redis.print],
	["incr", "multifoo"],
	["incr", "multibar"]
	]).exec(function(err, replies){
		console.log(replies);
	});