import API from '../../utils/API';
import { dateCalculate } from "../../utils/util";

Page({
    data: {
        time: "0",
        nickName: "",
        avatarUrl: "",
        aboutHidden: true,
        feedbackHidden: true,
    },
    onLoad: function () {
        API.post('/user/getcurrentuser').then(res => {
            console.log(res);
            let now = new Date();
            // res.data.registdate = res.data.registdate.substr(0,19);
            res.data.registdate = new Date(res.data.registdate);
            const date = dateCalculate(res.data.registdate, now);
            this.setData({
                time: date.day,
                nickName: res.data.nickName,
                avatarUrl: res.data.avatarUrl,
            });
        });
    },
    onShareAppMessage: function(res){
        if(res.from==="menu"){
            console.log(res.target);
        }
        return{
            title:'西科树屋欢迎你的加入',
            path:"pages/auth/auth",
            success(res){
                console.log(res.data);
            },
            fail(res){
                console.log(res.msg);
            }
        }
    },
    handleClickProfile() {
        this.setData({
            aboutHidden: !this.data.aboutHidden
        })
    },
    handleClickAbout(){
        this.setData({
            aboutHidden: !this.data.aboutHidden
        })
    },
    handleClick:function(){
        wx.showShareMenu({
            // showShareItems:['wx', 'qzone', 'wechatFriends', 'wechatMoment'],
            withShareTicket:true
        })
    },
    handleClickPublish: function() {
        const { time, avatarUrl, nickName } = this.data;
        wx.navigateTo({
            url: `../listPage/listPage?type=0&time=${time}&avatarUrl=${avatarUrl}&nickName=${nickName}`
        })
    },
    handleClickComment: function() {
        const { time, avatarUrl,nickName } = this.data;
        wx.navigateTo({
            url: `../listPage/listPage?type=1&time=${time}&avatarUrl=${avatarUrl}&nickName=${nickName}`
        })
    },
    handleClickFeedback(){
        this.setData({
            feedbackHidden: !this.data.feedbackHidden
        })
    },
    handleClickFeedbackSheet(){
        this.setData({
            feedbackHidden: !this.feedbackHidden
        })
    }
});