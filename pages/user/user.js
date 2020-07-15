var API = require('../../utils/API.js');
import { dateCalculate } from "../../utils/util";
const app = getApp();
Page({
    data: {
        userInfo: {},
        autoShare: "0",
        feedbackHidden: true,
        aboutHidden: true
    },

    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },

    onLoad() {
        console.log(getCurrentPages());
        let { autoShare } = this.data
        autoShare = (autoShare === '' || autoShare === undefined) ? '1' : '0'
        this.setData({
            autoShare: autoShare,
        });
        API.post('/user/getcurrentuser').then(res => {
            let now = new Date();
            // res.data.registdate = res.data.registdate.substr(0,19);
            res.data.registdate = new Date(res.data.registdate);
            const date = dateCalculate(res.data.registdate, now);
            this.setData({
                userInfo: res.data,
            });
        });

    },

    autoShare(e) {
        let page = this;
        let openOrNot = e.detail.value;
        let autoShare = "1";
        let webId = page.data.userInfo.webId
        if (!openOrNot) {
            autoShare = "0";
        }
        page.setData({
            autoShare: autoShare
        })
    },

    onTap() {
        const { tagid } = this.data;
        // wx.navigateTo({ url: '../annualRing/annualRing' });
        wx.redirectTo({ url: '../annualRing/annualRing' });
    },

    uploadBgImg() {
    },
    onShareAppMessage: function (res) {
        if (res.from === "menu") {
            console.log(res.target);
        }
        return {
            title: '西科树屋欢迎你的加入',
            path: '/pages/auth/auth',
            success(res) {
                console.log(res.data);
            },
            fail(res) {
                console.log(res.msg);
            }
        }
    },

    handleClickFeedback() {
        wx.navigateTo({
            url: '../feed/feed'
        });
    },
    blogList() {
        wx.navigateTo({
            url: `../listPage/listPage?type=0`
        })
    },
    commentList() {
        wx.navigateTo({
            url: `../listPage/listPage?type=1`
        })
    },
    likeList() {
        const { time } = this.data;
        wx.navigateTo({
            url: `../listPage/listPage?type=2`
        })
    },

});