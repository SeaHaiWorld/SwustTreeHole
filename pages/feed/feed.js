//index.js
//获取应用实例
const API = require('../../utils/API.js');
const {
  uploadFile,
  deleteFile
} = require("../../utils/util");
const app = getApp()

Page({
  data: {
    userInfo: {},
    iptVal: '',
    files: [],
    location: [],
    nowIndex: 0,
    refresh: true,
  },
  bindKeyInput(e) {
    this.setData({
      iptVal: e.detail.value
    })
  },

  bindChooseImage(e) {
    let page = this;
    wx.chooseImage({
      success: function (res) {
        console.log(res);
        let tempFilePaths = res.tempFilePaths;
        let {
          location,
          files
        } = page.data;
        if (tempFilePaths) {
          files.push(tempFilePaths[0]);
        }
        uploadFile(tempFilePaths[0].substr(tempFilePaths[0].lastIndexOf('/') + 1), tempFilePaths[0], function (e) {
          let h = 'http://';
          e = h.concat(e);
          location.push(e)
        });
        page.setData({
          files,
          location,
          refresh: false
        });
      },
    })
  },

  publish() {
    let {
      iptVal,
      location,
      nowIndex
    } = this.data;
    let url = "";

    if (location.length > 0) {
      for (let i = 0; i < location.length - 1; i++) {
        url = `${url}${location[i]};`;
      }
      url = `${url}${location[location.length - 1]}`;
    }
    console.log(url)
    if (iptVal === "") {
      wx.showToast({
        title: '想想要分享什么吧~',
        icon: 'none'
      })
    } else {
      API.post('/app/feed', {
        content: iptVal,
        imgUrl: url,
      }).then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          wx.showToast({
            icon:'success',
            duration: 1000,
            success(e) {
              app.globalData.refreshHome = true;
              wx.navigateBack();
              wx.redirectTo({
                url: '../treeHome/treeHome',
              })
            }
          })
        }
      })
    }
  },

  removeAttachment(e) {
    let {
      idx
    } = e.currentTarget.dataset;
    let {
      files,
      location
    } = this.data;
    deleteFile(files[idx].substr(files[idx].lastIndexOf('/') + 1), function (e) {
      console.log(e);
    });
    files.splice(idx, 1);
    location.splice(idx, 1);
    this.setData({
      files,
      location
    })
  },
})