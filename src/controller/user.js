const Base = require('./base.js');

module.exports = class extends Base {
  /*
     获取个人发布内容
    */
  async getUserRemarkAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('user').getUserRemarkAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
     获取个人评论内容
    */
  async getUserCommentAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('user').getUserCommentAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
    获取个人点赞
  */
  async getUserStarAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('user').getUserStarAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }
};
