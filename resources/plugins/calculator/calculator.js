// Calculator Icon by Freepik (http://www.flaticon.com/free-icon/basic-calculator_62097)

const math = require('mathjs');
module.exports = {
  action: 'copy',
  query: query => {
    try {
      const ans = math.eval(query);
      if (typeof ans === 'function') {
        throw new Error('function returned');
      }
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
      return { items: [] };
    }
  },
};
