// Twitter Icon by Freepik <http://www.flaticon.com/free-icon/twitter_168802#term=twitter&page=1&position=31>
// GitHub Icon by Freepik <http://www.flaticon.com/free-icon/github-mascot-logo-variant_38521#term=github&page=1&position=30>

module.exports = {
  action: 'openurl',
  query: query => {
    let items = [];
    if (query === '?' || query === 'help' || query === 'about') {
      items = [
        {
          title: 'Dext',
          subtitle: 'A smart launcher for Mac. Powered by JavaScript.',
          arg: 'https://github.com/DextApp/dext',
          icon: {
            path: './github.png',
          },
        },
        {
          title: 'Created By Vu Tran',
          subtitle: 'Follow @tranvu on Twitter',
          arg: 'https://twitter.com/tranvu',
          icon: {
            path: './twitter.png',
          },
        },
      ];
    }
    return { items };
  },
};
