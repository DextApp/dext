import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
	const result = await alfyTest('gimme cats');

	t.deepEqual(result[0], {
		title: '🐱',
		arg: '🐱',
		icon: {
			path: ' '
		}
	});
});
