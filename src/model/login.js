const moment = require('moment');
const axios = require('axios');
const BASECONFIG = {
  APPID: 1109918821,
  SECRET: 'A4zAbjf52PCKQiUD',
  GRANT_TYPE: 'authorization_code'
};

module.exports = class extends think.Model {
  async loginAction(params) {
    const {nickName, gender, language, city, province, country, avatarUrl, code} = params;
    if (code) {
      // eslint-disable-next-line camelcase
      const {data: {openid, session_key}} = await axios({
        method: 'get',
        url: `https://api.q.qq.com/sns/jscode2session?appid=${BASECONFIG.APPID}&secret=${BASECONFIG.SECRET}&js_code=${code}&grant_type=${BASECONFIG.GRANT_TYPE}`
      });
      const user = this.model('user');
      const auth = this.model('authority');
      const registDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const existUser = await user.where({openId: openid}).find();
      const existAuth = await auth.where({openId: openid}).find();
      const TokenService = think.service('token');
      const token = await TokenService.create({ openid });
      console.log(token);
      // 判断用户是否登录过
      if (think.isEmpty(existAuth)) {
        await auth.add(
          {
            openId: openid,
            session_key: session_key
          });
        if (think.isEmpty(existUser)) {
          await user.add(
            {
              openId: openid,
              nickName: nickName || '',
              gender: gender || '',
              language: language || '',
              city: city || '',
              province: province || '',
              country: country || '',
              avatarUrl: avatarUrl || '',
              registDate: registDate || ''
            });
        }
        return openid;
      } else {
        return openid;
      }
    } else {
      return '登录失败';
    }
  }
};
