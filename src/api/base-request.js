import superagent from 'superagent';

const BaseUrl = 'https://api.github.com';

export default class BaseRequest {
  constructor({ token }) {
    this.baseUrl = BaseUrl;
    this.token = token;
  }

  formatURL(path) {
    const trim = path.replace(/^\//, '');
    return `${this.baseUrl}/${trim}`;
  }

  async get({ url, query }) {
    let res = null;
    try {
      res = await superagent
        .get(this.formatURL(url))
        .query(query);
    } catch (err) {
      console.error(err);
    }
    return res.body;
  }
}
