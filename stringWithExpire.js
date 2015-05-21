var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err){
	console.log('Error' + err);
});

client.on('connect', runSample);

function runSample(){
	client.set('string key', 'Hello World', redis.print);
	client.expire('string key', 3);

	var myTimer = setInterval(function(){
		client.get('string key', function(err, reply){
			if(reply){
				console.log('I live: ' + reply.toString());
			}else{
				clearInterval(myTimer);
				console.log('I expired');
				client.quit();
			}
		});
	}, 1000);
}