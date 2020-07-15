import API from '../../utils/API';
import { timeDis, debounce } from "../../utils/util";
const app = getApp();
Page({
    data: {
        remark: {},
        comments: [],
        value: '',
    },
    onLoad: function (option) {
        const {remark} = this.data
        if (remark.imgUrl) {
            if (remark.imgUrl.indexOf(";") === -1) {
              let temp = [];
              temp.push(remark.imgUrl)
              remark.imgUrl = temp
              remark.imgWidth = "654rpx"
              remark.mode = "aspectFit"
            } else {
              remark.imgUrl = remark.imgUrl.split(";");
              if (remark.imgUrl.length === 2) {
                remark.imgWidth = "327rpx"
                remark.imgHeight = "327rpx"
              } else {
                remark.imgWidth = "218rpx",
                  remark.imgHeight = "218rpx"
                console.log(remark.imgHeight)
              }
            }
          }
        this.getRemark(option.remarkId);
    },
    onReady: function () {
    },
    onShow: function () {
    },
    returnIndex() {
        wx.navigateTo({
          url: '../Square/Square'
        });
      },
    getRemark: function (remarkId) {
        const { userInfo } = app.globalData;
        const { applyList } = this.data;
        API.post('/app/getItem', { remarkId })
            .then(res => {
                let now = new Date();
                res.data.data[0].publishDate = timeDis(new Date(res.data.data[0].publishDate), now);
                let s = [];
                if (res.data.data[0].imgUrl) {
                    if (res.data.data[0].imgUrl.indexOf(';') !== -1) {
                        res.data.data[0].imgUrl = res.data.data[0].imgUrl.split(";");
                    } else {
                        s.push(res.data.data[0].imgUrl);
                        res.data.data[0].imgUrl = s;
                    }
                }
                if (res.data.data[0].topic !== 0) {
                    let topic = [];
                    res.data.data[0].topic = res.data.data[0].topic.toString();
                    res.data.data[0].topic = res.data.data[0].topic.split('').reverse().join('');
                    for (let i in res.data.data[0].topic) {
                        if (res.data.data[0].topic[i] === '1') {
                            topic.push(applyList[res.data.data[0].tagId][i].text);
                        }
                    }
                    res.data.data[0].topic = topic;
                }
                this.setData({
                    remarkId,
                    remark: { ...res.data.data[0] }
                })
                console.log(this.data.remark)
                API.post('/app/getComment', { remarkId })
                    .then(res => {
                        this.setData({
                            comments: res.data.data
                        })
                    })
            })
    },
    onPullDownRefresh: function () {
        const { remarkId } = this.data;
        this.getComments(remarkId);
        wx.stopPullDownRefresh();
    },
    onButtonTap: function (e) {
        const { openId } = app.globalData;
        const { remarkId, value } = this.data;
        if (value !== '' || value.trim() !== "") {
            API.post('/app/comment', { remarkId, content: value, openId })
                .then(res => {
                    this.getComments(remarkId);
                })
            this.handleClean();
        }

    },
    handleClean: function () {
        this.setData({
            value: ''
        })
    },
    handleInput: function (e) {
        this.setData({
            value: e.detail
        })
    }
    // openDialog: function () {
    //     this.setData({
    //         istrue: true
    //     })
    // },
    // closeDialog: function () {
    //     this.setData({
    //         istrue: false
    //     })
    // },
    // valueChange: function () {
    //     this.setData({
    //         comment: e.target.value,
    //     })
    // },
})
