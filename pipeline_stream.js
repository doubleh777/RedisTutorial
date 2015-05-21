var redis = require('redis-stream'),
	client = new redis(6379, '127.0.0.1');

var stream = client.stream();

for(var record = 0 ; record < 10000 ; record++){
	var command = ['set', 'key' + record, 'value'];

	stream.redis.write(redis.parse(command));
}

stream.on('close', function(){
	console.log('Completed!');
});

stream.end();