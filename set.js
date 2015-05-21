var redis = require("redis");
var client = redis.createClient();
var set_size = 20;

client.sadd("smallset", "a member");
client.sadd("smallset", "another member");

while(set_size > 0){
	client.sadd("smallset", "member " + set_size);
	set_size -= 1;
}

client.multi()
	.scard("smallset")
	.smembers("smallset")
	.keys("*", function(err, replies){
		client.mget(replies, redis.print);
	})
	.dbsize()
	.exec(function (err, replies){
		console.log("MULTI got" + replies.length + "replies");
		replies.forEach(function(reply, index){
			console.log("Reply " + index + ": " + reply.toString());
		});
	});