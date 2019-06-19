import BaseRequest from './base-request';

export default class GithubAPI extends BaseRequest {
  async getUserById(id) {
    return this.get({ url: `/user/${id}` });
  }
}
