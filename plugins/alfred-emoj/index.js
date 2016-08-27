'use strict';
const alfy = require('alfy');

alfy.fetch('emoji.getdango.com/api/emoji', {
	query: {
		q: alfy.input
	}
}).then(data => {
	let all = '';

	const items = data.results
		.map(x => {
			const emoji = x.text;
			all += emoji;

			return {
				title: emoji,
				arg: emoji,
				icon: {
					path: ' ' // hide icon
				}
			};
		});

	items.push({
		title: all,
		arg: all,
		icon: {
			path: ' '
		}
	});

	alfy.output(items);
});
