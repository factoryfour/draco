const draco = require('./index.js');

const trial = Date.now();
draco.encode('./test/assaf.obj', `./test/assaf${trial}.drc`, (err) => {
	if (err) {
		console.log('Error encoding');
	} else {
		console.log('Encoded successfully');
		draco.decode(`./test/assaf${trial}.drc`, `./test/assaf${trial}.obj`, (decErr) => {
			if (decErr) {
				console.log('Error decoding');
			} else {
				console.log('Decoded successfully');
			}
		});
	}
});
