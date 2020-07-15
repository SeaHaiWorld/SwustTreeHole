var API = require('../../utils/API.js');
const app = getApp();
Page({
    data: {
        url: app.globalData.url,
        userInfo: ''
    },
    onLoad: function () {
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            //用户已经授权过
                            wx.showLoading({
                                title: '正在登陆...',
                            })
                            app.globalData.userInfo = res.userInfo
                            wx.login({
                                success: res => {
                                    if (res.code) {
                                        wx.request({
                                            url: 'http://127.0.0.1:8361/login',
                                            method: "POST",
                                            data: {
                                                code: res.code,
                                                ...app.globalData.userInfo
                                            },
                                            success(res1) {
                                                app.globalData.token = res.code;
                                                app.globalData.openId = res1.data.data;
                                                console.log(res, res1)
                                                wx.redirectTo({
                                                    url: '../Homeg/Home'
                                                })
                                            }

                                        })
                                        wx.hideLoading();
                                    }
                                }
                            })
                        }
                    });
                }
            }
        })
        console.log(app.globalData)
    },
    onGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            wx.showLoading({
                title: '正在登陆...',
            })
            app.globalData.userInfo = e.detail.userInfo;
            wx.login({
                success: res => {
                    if (res.code) {
                        wx.request({
                            url: 'http://127.0.0.1:8361/login',
                            method: "POST",
                            data: {
                                code: res.code,
                                ...e.detail.userInfo
                            },
                            success(res1) {
                                app.globalData.token = res.code;
                                app.globalData.openId = res1.data.data;
                                wx.redirectTo({
                                    url: '../Home/Home'
                                })
                            }
                        })
                        wx.hideLoading();
                    } else {
                        wx.showToast({
                            icon: "none",
                            title: '登陆失败,请重试',
                        })
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        } else {
            wx.showToast({
                icon: "none",
                title: '登陆失败,请重试',
            })
        }
    },
    onPagetoSquare() {
        app.globalData.token = '';
        wx.navigateTo({
            url: '../Square/Square'
        })
    }
});
