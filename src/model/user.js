module.exports = class extends think.Model {
  async getUserRemarkAction(params) {
    if (params) {
      const {openId} = params;
      const remark = this.model('remark');
      remark._pk = 'remarkId';
      return remark.where({openId: openId}).countSelect();
    } else {
      return '请求失败';
    }
  }
  async getUserCommentAction(params) {
    if (params) {
      const {openId} = params;
      const comment = this.model('comment');
      return comment.where({openId: openId}).countSelect();
    } else {
      return '请求失败';
    }
  }

  async getUserStarAction(params) {
    if (params) {
      const {openId} = params;
      const star = this.model('star');
      star._pk = 'openId';
      return star.query(`SELECT * FROM remark ,star WHERE remark.remarkId = star.remarkId AND star.openId = '${openId}'`);
    } else {
      return '请求失败';
    }
  }
};

