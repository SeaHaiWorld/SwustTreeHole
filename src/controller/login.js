const Base = require('./base.js');

module.exports = class extends Base {
  /*
   auth
  */
  async authAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('login').authAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
   login
  */
  async indexAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('login').loginAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }
};
