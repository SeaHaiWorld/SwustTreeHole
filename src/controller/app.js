const Base = require('./base.js');

module.exports = class extends Base {
  /*
    getList
   */
  async getListAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').getListAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
    search
   */
  async searchAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').searchAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }
  /*
    getItemById
   */
  async getItemAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').getItemByIdAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
    deleteById
   */
  async deleteAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').deleteByIdAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
    editById
   */
  async updateAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').updateByIdAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
    addItem
   */
  async addAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').addItemAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
    feedBack
   */
  async feedAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').feedAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
   star
   */
  async starAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').starItemAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
   comment
   */
  async commentAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').commentItemAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }

  /*
   getComment
   */
  async getCommentAction() {
    const params = await this.ctx.post();
    if (Object.keys(params).length !== 0) {
      const data = await this.model('app').getCommentAction(params);
      return this.success(data);
    } else {
      this.status = 403;
      return this.success('请求失败');
    }
  }
};
