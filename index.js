const { spawn } = require('child_process');


function encode(input, output, callback) {
	if (!callback) {
		throw new Error('No function given for callback');
	}
	const ls = spawn('./build/draco_encoder', ['-i', input, '-o', output]);
	const stderr = [];
	const stdout = [];

	ls.stdout.on('data', (data) => {
		stdout.push(data);
	});

	ls.stderr.on('data', (data) => {
		stderr.push(data);
	});

	ls.on('close', ((code) => {
		if (code > 0) {
			return callback(stderr, stdout);
		}
		return callback(null, stdout);
	}));
}


module.exports = {
	encode
};
