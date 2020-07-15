//app.js
App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    }),
    wx.showShareMenu({
      // showShareItems:['wx', 'qzone', 'wechatFriends', 'wechatMoment'],
      withShareTicket: true
    })
  },
  globalData: {
    userInfo: null,
    loginCode: null,
    logined: null,
    openId: null,
    version: '1.0.0',
    host: 'http://127.0.0.1:8361',
    // host:'http://192.168.199.168:3000',
    // host:'http://123.207.254.114:4000'，
  }
})