const { spawn } = require('child_process');


function encode(input, output, callback) {
	if (!callback) {
		throw new Error('No function given for callback');
	}
	const spawnedEncoder = spawn('./build/draco_encoder', ['-i', input, '-o', output]);
	const stderr = [];
	const stdout = [];

	spawnedEncoder.stdout.on('data', (data) => {
		stdout.push(data);
	});

	spawnedEncoder.stderr.on('data', (data) => {
		stderr.push(data);
	});

	spawnedEncoder.on('close', ((code) => {
		if (code > 0) {
			return callback(stderr, stdout);
		}
		return callback(null, stdout);
	}));
}


function decode(input, output, callback) {
	if (!callback) {
		throw new Error('No function given for callback');
	}
	const spawnedDecoder = spawn('./build/draco_decoder', ['-i', input, '-o', output]);
	const stderr = [];
	const stdout = [];

	spawnedDecoder.stdout.on('data', (data) => {
		stdout.push(data);
	});

	spawnedDecoder.stderr.on('data', (data) => {
		stderr.push(data);
	});

	spawnedDecoder.on('close', ((code) => {
		if (code > 0) {
			return callback(stderr, stdout);
		}
		return callback(null, stdout);
	}));
}

module.exports = {
	encode,
	decode
};
