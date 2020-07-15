import API from '../../utils/API';
import { timeDis, dateCalculate } from "../../utils/util";
Page({
    data: {
        type: 0,
        userInfo: {},
        tagid: -1,
        publishList: [],
        commentList: [],
        pagination: { currentPage: 1, total: 9, pageSize: 8 },
        pageName: '',
    },
    onLoad: function (params) {
        let { autoShare } = this.data;
        autoShare = (autoShare === '' || autoShare === undefined) ? '1' : '0';
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
        let pageName;
        switch (params.type) {
            case "0":
                this.listPublishPage();
                pageName = '我的发布';
                break;
            case "1":
                this.listCommentPage();
                pageName = '我的评论';
                break;
            case "2":
                this.listLikePage();
                pageName = '我的点赞';
                break;
            default:
                break;
        }
        this.setData({
            type: params.type,
            pageName: pageName,
        });
    },
    onPullDownRefresh: function () {
        switch (this.data.type) {
            case "0":
                this.refreshPublish();
                break;
            case "1":
                this.refreshComment();
                break;
            case "2":
                this.refreshLike();
                break;
            default:
                break;
        }
    },
    onReachBottom: function () {
        switch (this.data.type) {
            case "0":
                this.bottomPublish();
                break;
            case "1":
                this.bottomComment();
                break;
            case "2":
                this.bottomLike();
                break;
            default:
                break;
        }
    },
    onTap() {
        const { tagid } = this.data;
        wx.navigateBack();
    },

    listPublishPage: function () {
        const { tagid } = this.data;
        API.post('/user/myremark',
            { tagid, pagination: { pageSize: 8, currentPage: 1 }, flag: 1, })
            .then(res => {
                const { list, pagination } = res.data;
                list.forEach((item) => {
                    let now = new Date();
                    // item.publishdate = item.publishdate.substr(0, 19);
                    item.publishdate = new Date(item.publishdate);
                    item.publishdate = timeDis(item.publishdate, now);
                    if (item.imgurl) {
                        item.imgurl = item.imgurl.split(";");
                    }
                });
                console.log(list);
                this.setData({
                    publishList: list,
                    pagination
                })
            })
    },
    refreshPublish: function () {
        const { tagid } = this.data;
        API.post('/user/myremark',
            { tagid, pagination: { pageSize: 8, currentPage: 1 }, flag: 1, })
            .then(res => {
                console.log(res);
                const { list, pagination } = res.data;
                list.forEach((item) => {
                    let now = new Date();
                    // item.publishdate = item.publishdate.substr(0, 19);
                    item.publishdate = new Date(item.publishdate);
                    item.publishdate = timeDis(item.publishdate, now);
                    if (item.imgurl) {
                        item.imgurl = item.imgurl.split(";");
                    }
                });
                wx.stopPullDownRefresh();
                this.setData({
                    publishList: list,
                    pagination
                })
            })
    },
    bottomPublish: function () {
        const { pagination: { currentPage, total, pageSize }, tagid } = this.data;
        if (total / pageSize < currentPage) {
            console.log("已经到达底部");
        } else {
            API.post('/user/myremark',
                { tagid, pagination: { pageSize: 8, currentPage: currentPage + 1 }, flag: 1 })
                .then(res => {
                    const { list, pagination } = res.data;
                    list.forEach((item) => {
                        let now = new Date();
                        // item.publishdate = item.publishdate.substr(0, 19);
                        item.publishdate = new Date(item.publishdate);
                        item.publishdate = timeDis(item.publishdate, now);
                        if (item.imgurl) {
                            item.imgurl = item.imgurl.split(";");
                        }
                    });
                    this.setData({
                        publishList: [...this.data.publishList, ...list],
                        pagination: pagination
                    })
                })
        }
    },

    listCommentPage: function () {
            API.post('/user/mycomment',
            { flag: 1, remarkid: -1, pagination: { pageSize: 8, currentPage: 1 }, })
            .then(res => {
                const { list, pagination } = res.data;
                list.forEach((item) => {
                    let now = new Date();
                    // item.publishdate = item.publishdate.substr(0, 19);
                    item.commentdate = new Date(item.commentdate);
                    item.commentdate = timeDis(item.commentdate, now);
                    if (item.imgurl) {
                        item.imgurl = item.imgurl.split(";");
                    }
                });
                this.setData({
                    commentList: list,
                    pagination
                })
            })
    },
    refreshComment: function () {
        API.post('/user/mycomment',
            { flag: 1, remarkid: -1, pagination: { pageSize: 8, currentPage: 1 }, })
            .then(res => {
                const { list, pagination } = res.data;
                list.forEach((item) => {
                    let now = new Date();
                    // item.publishdate = item.publishdate.substr(0, 19);
                    item.commentdate = new Date(item.commentdate);
                    item.commentdate = timeDis(item.commentdate, now);
                    if (item.imgurl) {
                        item.imgurl = item.imgurl.split(";");
                    }
                });
                wx.stopPullDownRefresh();
                this.setData({
                    commentList: list,
                    pagination
                })
            })
    },
    bottomComment: function () {
        const { pagination: { currentPage, total, pageSize }, tagid } = this.data;
        if (total / pageSize < currentPage) {
            console.log("已经到达底部");
        } else {
            API.post('/user/mycomment',
                { flag: 1, remarkid: -1, pagination: { pageSize: 8, currentPage: currentPage + 1 },  })
                .then(res => {
                    const { list, pagination } = res.data;
                    list.forEach((item) => {
                        let now = new Date();
                        // item.publishdate = item.publishdate.substr(0, 19);
                        item.commentdate = new Date(item.commentdate);
                        item.commentdate = timeDis(item.commentdate, now);
                        if (item.imgurl) {
                            item.imgurl = item.imgurl.split(";");
                        }
                    });
                    this.setData({
                        commentList: [...this.data.commentList, ...list],
                        pagination: pagination
                    })
                })
        }
    },

    listLikePage: function () {
        const { tagid } = this.data;
        API.post('/user/mystar',
            { pagination: { pageSize: 8, currentPage: 1 } })
            .then(res => {
                const { list, pagination } = res.data;
                list.forEach((item) => {
                    let now = new Date();
                    // item.publishdate = item.publishdate.substr(0, 19);
                    item.stardate = new Date(item.stardate);
                    item.stardate = timeDis(item.stardate, now);
                    if (item.imgurl) {
                        item.imgurl = item.imgurl.split(";");
                    }
                });
                this.setData({
                    publishList: list,
                    pagination
                })
            })
    },
    refreshLike: function () {
        const { tagid } = this.data;
        API.post('/user/mystar',
            { pagination: { pageSize: 8, currentPage: 1 } })
            .then(res => {
                const { list, pagination } = res.data;
                list.forEach((item) => {
                    let now = new Date();
                    // item.publishdate = item.publishdate.substr(0, 19);
                    item.stardate = new Date(item.stardate);
                    item.stardate = timeDis(item.stardate, now);
                    if (item.imgurl) {
                        item.imgurl = item.imgurl.split(";");
                    }
                });
                this.setData({
                    publishList: []
                });
                wx.stopPullDownRefresh();
                this.setData({
                    publishList: list,
                    pagination
                })
            })
    },
    bottomLike: function () {
        const { pagination: { currentPage, total, pageSize }, tagid } = this.data;
        if (total / pageSize < currentPage) {
            console.log("已经到达底部");
        } else {
            API.post('/user/mystar',
                { pagination: { pageSize: 8, currentPage: currentPage + 1 } })
                .then(res => {
                    const { list, pagination } = res.data;
                    list.forEach((item) => {
                        let now = new Date();
                        // item.publishdate = item.publishdate.substr(0, 19);
                        item.stardate = new Date(item.stardate);
                        item.stardate = timeDis(item.stardate, now);
                        if (item.imgurl) {
                            item.imgurl = item.imgurl.split(";");
                        }
                    });
                    this.setData({
                        publishList: [...this.data.publishList, ...list],
                        pagination: pagination
                    })
                })
        }
    },
    handleClick: function (e) {
        wx.navigateTo({
            url: '../itemDetail/itemDetail?remarkid='+ e.target.id
        });
    },
    handleLike: function (e) {
        const { publishList } = this.data;
        if (e.detail === "https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/star.png") {
            publishList.forEach(item => {
                if (item.remarkid == e.target.id) {
                    item.star += 1;
                    item.flag = 1;
                }
            });
            this.setData({
                publishList
            });
            API.post('/mood/star', { remarkid: e.target.id }).then(res => {
                console.log(res.data);
            });
        } else {
            publishList.forEach(item => {
                if (item.remarkid == e.target.id) {
                    item.star -= 1;
                    item.flag = null;
                }
            });
            this.setData({
                publishList
            });
            API.post('/mood/unstar', { remarkid: e.target.id }).then(res => {
                console.log(res.data);
            });
        }
    }
});