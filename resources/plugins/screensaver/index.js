// Icon by Freepik (http://www.flaticon.com/free-icon/computer-screen_63337)

module.exports = {
  action: 'exec',
  keyword: 'screensaver',
  query: {
    items: [
      {
        title: 'Screen Saver',
        arg: {
          script: './start.js',
        },
        icon: {
          path: './icon.png',
        },
      },
    ],
  },
};
