const moment = require('moment');

module.exports = class extends think.Model {
  async getListAction(params) {
    if (params) {
      const remark = this.model('remark');
      remark._pk = 'remarkId';
      const {tagid, pagination: {currentPage, pageSize}} = params;
      return remark.join('user ON remark.openId=user.openId').where({tagId: tagid || '', delete: 0}).page(currentPage, pageSize).order('publishDate desc').countSelect();
    } else {
      return '请求失败';
    }
  }

  async searchAction(params) {
    if (params) {
      const {context, pagination: {currentPage, pageSize}} = params;
      const remark = this.model('remark');
      remark._pk = 'remarkId';
      const data = await remark.query(`SELECT * FROM remark ,user WHERE remark.openId = user.openId AND remark.content LIKE '%${context}%'`);
      console.log(data);
      return data;
    } else {
      return '请求失败';
    }
  }

  async getItemByIdAction(params) {
    if (params) {
      const {remarkId} = params;
      const remark = this.model('remark');
      remark._pk = 'remarkId';
      const data = remark.query(`SELECT * FROM remark ,user WHERE remark.openId = user.openId AND remark.remarkId = ${remarkId}`);
      return data;
    } else {
      return '请求失败';
    }
  }

  async deleteByIdAction(params) {
    if (params) {
      const {remarkId} = params;
      const remark = this.model('remark');
      const star = this.model('star');
      const comment = this.model('comment');
      remark._pk = 'remarkId';
      const deleted = await remark.where({remarkId: remarkId}).getField('delete');
      if (Number(deleted) === 0) {
        await star.where({remarkId: remarkId}).update({delete: 1});
        await comment.where({remarkId: remarkId}).update({delete: 1});
        await remark.where({remarkId: remarkId}).update({delete: 1});
        return '删除成功';
      } else {
        await star.where({remarkId: remarkId}).update({delete: 0});
        await comment.where({remarkId: remarkId}).update({delete: 0});
        await remark.where({remarkId: remarkId}).update({delete: 0});
        return '恢复删除';
      }
    }
  }

  async updateByIdAction(params) {
    if (params) {
      const {remarkId, content, imgUrl} = params;
      const remark = this.model('remark');
      remark._pk = 'remarkId';
      const publishDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const exist = await remark.where({remarkId: remarkId}).find();
      if (think.isEmpty(exist)) {
        return '编辑失败';
      } else {
        await remark.where({remarkId: remarkId}).update({remarkId, content: content, imgUrl: imgUrl, publishDate: publishDate});
        return '编辑成功';
      }
    } else {
      return '编辑失败';
    }
  }

  async addItemAction(params) {
    if (params) {
      const {openId, content, imgUrl, tagId, topic} = params;
      const remark = this.model('remark');
      const publishDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      await remark.add(
        {
          openId: openId || '9C862BA6095FADB9F8EAFD49C26C7585',
          content: content,
          tagId: tagId || 0,
          topic: topic || '',
          imgUrl: imgUrl || '',
          publishDate: publishDate});
      return '添加成功';
    } else {
      return '添加失败';
    }
  }

  async feedAction(params) {
    if (params) {
      const {openId, content, imgUrl} = params;
      const feedback = this.model('feedback');
      const publishDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      await feedback.add(
        {
          openId: openId || '9C862BA6095FADB9F8EAFD49C26C7585',
          content: content,
          imgUrl: imgUrl || '',
          publishDate: publishDate});
      return '添加成功';
    } else {
      return '添加失败';
    }
  }

  async starItemAction(params) {
    if (params) {
      const {openId, remarkId} = params;
      const star = this.model('star');
      const remark = this.model('remark');
      const starDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const exist = await star.where({remarkId: remarkId, openId: openId}).find();
      let stars = await remark.where({remarkId: remarkId}).getField('stars');
      if (think.isEmpty(exist)) {
        stars = Number(stars) + 1;
        await remark.where({remarkId: remarkId}).update({
          stars
        });
        await star.add(
          {
            openId: openId,
            remarkId: remarkId,
            starDate: starDate});
        return 'success';
      } else {
        await star.delete({where: {remarkId: remarkId, openId: openId}});
        if (Number(stars) !== 0 || stars) {
          stars = Number(stars) - 1;
        }
        await remark.where({remarkId: remarkId}).update({
          stars
        });
        return 'cancel';
      }
    }
  }

  async commentItemAction(params) {
    if (params) {
      const {openId, remarkId, content} = params;
      const comment = this.model('comment');
      const remark = this.model('remark');
      const commentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let comments = await remark.where({remarkId: remarkId}).getField('comments');
      comments = Number(comments) + 1;
      console.log(comments);
      await remark.where({remarkId: remarkId}).update({
        comments
      });
      await comment.add(
        {
          openId: openId,
          remarkId: remarkId,
          content: content,
          commentDate: commentDate});
      return '评论成功';
    }
  }

  async getCommentAction(params) {
    if (params) {
      const {remarkId} = params;
      const comment = this.model('comment');
      return comment.where({remarkId: remarkId}).select();
    } else {
      return '请求失败';
    }
  }

  // async deleteByIdAction(params) {
  //   if (params) {
  //     const {remarkId} = params;
  //     const remark = this.model('remark');
  //     const star = this.model('star');
  //     const comment = this.model('comment');
  //     remark._pk = 'remarkId';
  //     const deleted = await remark.where({remarkId: remarkId}).getField('delete');
  //     if (Number(deleted) === 0) {
  //       await star.delete({where: ({remarkId: remarkId})});
  //       await comment.delete({where: ({remarkId: remarkId})});
  //       await remark.delete({where: ({remarkId: remarkId})});
  //       return '删除成功';
  //     } else {
  //       await star.where({remarkId: remarkId}).update({delete: 0});
  //       await comment.where({remarkId: remarkId}).update({delete: 0});
  //       await remark.where({remarkId: remarkId}).update({delete: 0});
  //       return '恢复删除';
  //     }
  //   }
  // }
};
