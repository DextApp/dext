import m from './browser';

describe('browser', () => {
  it('should return google.com', () => {
    const results = m.query('google.com');
    expect(results.items).toContainEqual({
      title: 'Open google.com in the browser.',
      subtitle: 'Open in browser',
      arg: 'https://google.com',
      icon: {
        type: 'text',
        letter: 'G',
      },
    });
  });

  it('should return github.com', () => {
    const results = m.query('https://github.com');
    expect(results.items).toContainEqual({
      title: 'Open https://github.com in the browser.',
      subtitle: 'Open in browser',
      arg: 'https://github.com',
      icon: {
        type: 'text',
        letter: 'G',
      },
    });
  });

  it('should return http://insecure-site.com', () => {
    const results = m.query('http://insecure-site.com');
    expect(results.items).toContainEqual({
      title: 'Open http://insecure-site.com in the browser.',
      subtitle: 'Open in browser',
      arg: 'http://insecure-site.com',
      icon: {
        type: 'text',
        letter: 'I',
      },
    });
  });

  it("should support URL's with paths", () => {
    const results = m.query('https://github.com/DextApp/dext/');
    expect(results.items).toContainEqual({
      title: 'Open https://github.com/DextApp/dext/ in the browser.',
      subtitle: 'Open in browser',
      arg: 'https://github.com/DextApp/dext/',
      icon: {
        type: 'text',
        letter: 'G',
      },
    });
  });

  it('should use the top-level domain for the letter icon in subdomains', () => {
    const results = m.query('https://www.github.com/DextApp/dext/');
    expect(results.items).toContainEqual({
      title: 'Open https://www.github.com/DextApp/dext/ in the browser.',
      subtitle: 'Open in browser',
      arg: 'https://www.github.com/DextApp/dext/',
      icon: {
        type: 'text',
        letter: 'G',
      },
    });
  });
});
