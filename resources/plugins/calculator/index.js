// Calculator Icon by Freepik (http://www.flaticon.com/free-icon/basic-calculator_62097)

const math = require('mathjs');

module.exports = {
  action: 'openurl',
  execute: query => {
    try {
      const ans = math.eval(query);
      const items = [];
      items.push({
        title: ans.toString(),
        subtitle: query,
        arg: ans.toString(),
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
