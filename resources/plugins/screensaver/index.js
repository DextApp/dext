// Icon by Freepik (http://www.flaticon.com/free-icon/computer-screen_63337)

module.exports = {
  keyword: 'screensaver',
  action: 'exec',
  execute: {
    items: [
      {
        title: 'Screen Saver',
        arg: './start.js',
        icon: {
          path: './icon.png',
        },
      },
    ],
  },
};
