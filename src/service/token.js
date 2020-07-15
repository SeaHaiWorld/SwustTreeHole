const jwt = require('jsonwebtoken');
const BASECONFIG = {
  APPID: 1109918821,
  SECRET: 'A4zAbjf52PCKQiUD',
  GRANT_TYPE: 'authorization_code'
};
const secret = `${BASECONFIG.APPID}@${BASECONFIG.SECRET}`;

module.exports = class extends think.Service {
  /**
     * 根据header中的X-Nideshop-Token值获取用户id
     */
  async getUserId(token) {
    if (!token) {
      return 0;
    }
    const result = await this.parse(token);
    return result;
  }

  async verify(token) {
    const result = await this.parse(token);
    if (think.isEmpty(result)) {
      return false;
    }

    return true;
  }

  async create(userInfo) {
    const token = jwt.sign(userInfo, secret);
    return token;
  }

  async parse(token) {
    if (token) {
      try {
        return jwt.verify(token, secret);
      } catch (err) {
        return null;
      }
    }
    return null;
  }
};
