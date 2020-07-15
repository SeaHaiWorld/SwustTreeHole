const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  signinAction() {
    const userInfo = this.ctx.post();
    const {name, pw} = userInfo;
    if (name === 'admin' && pw === '123') {
      return this.success('true');
    }
  }
};
