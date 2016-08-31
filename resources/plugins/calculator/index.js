const math = require('mathjs');

module.exports = {
  output: q => {
    try {
      const ans = math.eval(q);
      const items = [];
      items.push({
        title: ans.toString(),
        subtitle: q,
        icon: {
          path: './icon.png',
        },
      });
      return { items };
    } catch (err) {
      // do nothing...
      return { items: [] };
    }
  },
};
