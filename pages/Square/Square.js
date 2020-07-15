import API from '../../utils/API';
import {
  timeDis
} from "../../utils/util";
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    current: 0,
    tagid: 0,
    list:'',
    pagination: {
      currentPage: 1,
      pageSize: 8
    },
    swiper: {
      circular: true,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 4500,
      duration: 1500,
      inputShowed: false
    },
    backClass: [
      'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/lidong.png',
      'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/timg.jpg',
      'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/timg.jpg'
    ],
    currentItemId: 2,
    inputVal: "",
    searchBarValue: '',
  },
  onLoad: function(option) {
    let list = [{
      avatarUrl: "https://thirdqq.qlogo.cn/qqapp/1109918821/9C862BA6095FADB9F8EAFD49C26C7585/100",
      city: "",
      comments: null,
      content: "沉浸在万花筒的黑暗之中吧...",
      country: null,
      delete: "0",
      gender: 1,
      imgUrl: "http://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/img/wxf2d8896e20719491.o6zAJs44QqEA31Eom-gqqUFsyfTg.K8GuuDuVmceHd436f3a320f5df692659c6016457b360.png;http://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/img/wxf2d8896e20719491.o6zAJs44QqEA31Eom-gqqUFsyfTg.9V7Y58gD9zHo515b088d32b911cf80b6f07aaa92906e.png",
      language: "zh_CN",
      nickName: "棕旨",
      openId: "9C862BA6095FADB9F8EAFD49C26C7585",
      province: "",
      publishDate: "2020-02-21 03:23:10",
      registDate: "2019-11-24 16:59:31",
      remarkId: 314,
      stars: null,
      tagId: 0,
      topic: 0,
    }, {
      avatarUrl: "https://thirdqq.qlogo.cn/qqapp/1109918821/9C862BA6095FADB9F8EAFD49C26C7585/100",
      city: "",
      comments: null,
      content: "沉浸在万花筒的黑暗之中吧...",
      country: null,
      delete: "0",
      gender: 1,
      imgUrl: "http://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/img/wxf2d8896e20719491.o6zAJs44QqEA31Eom-gqqUFsyfTg.o2a8VcfqcdeYd436f3a320f5df692659c6016457b360.png",
      language: "zh_CN",
      nickName: "棕旨",
      openId: "9C862BA6095FADB9F8EAFD49C26C7585",
      province: "",
      publishDate: "2020-02-21 03:13:34",
      registDate: "2019-11-24 16:59:31",
      remarkId: 313,
      stars: null,
      tagId: 0,
      topic: 0,
    }, {
      avatarUrl: "https://thirdqq.qlogo.cn/qqapp/1109918821/9B271E3EB53E6311AED062541689957F/100",
      city: "成都",
      comments: null,
      content: "斋藤飞鸟！！！！！！！！！！",
      country: null,
      delete: "0",
      gender: 1,
      imgUrl: "http://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/img/tmp_B456B51753B9216C5848FC8AD9AD55C1.gif",
      language: "zh_CN",
      nickName: "Sisyphe",
      openId: "9B271E3EB53E6311AED062541689957F",
      province: "四川",
      publishDate: "2019-11-27 11:29:27",
      registDate: "2019-11-23 15:41:31",
      remarkId: 163,
      stars: null,
      tagId: 0,
      topic: 1
    }, {
        avatarUrl: "https://thirdqq.qlogo.cn/qqapp/1109918821/9B271E3EB53E6311AED062541689957F/100",
        city: "成都",
        comments: null,
        content: "斋藤飞鸟！！！！！！！！！！",
        country: null,
        delete: "0",
        gender: 1,
        imgUrl: "http://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/img/tmp_B456B51753B9216C5848FC8AD9AD55C1.gif",
        language: "zh_CN",
        nickName: "Sisyphe",
        openId: "9B271E3EB53E6311AED062541689957F",
        province: "四川",
        publishDate: "2019-11-27 11:29:27",
        registDate: "2019-11-23 15:41:31",
        remarkId: 163,
        stars: null,
        tagId: 0,
        topic: 1
    }]
    this.infoChange(list)
    this.setData({
      list
    })
    this.listPage();
  },
  onReady: function() {

  },
  infoChange: function(list) {
    list.forEach((item) => {
      let now = new Date();
      item.publishdate = new Date(item.publishdate);
      item.publishdate = timeDis(item.publishdate, now);
      console.log(item.stars)
      if (item.imgUrl) {
        if (item.imgUrl.indexOf(";") === -1) {
          let temp = [];
          temp.push(item.imgUrl)
          item.imgUrl = temp
          item.imgWidth = "654rpx"
          item.mode = "aspectFit"
        } else {
          item.imgUrl = item.imgUrl.split(";");
          if (item.imgUrl.length === 2) {
            item.imgWidth = "327rpx"
            item.imgHeight = "327rpx"
          } else {
            item.imgWidth = "218rpx",
              item.imgHeight = "218rpx"
            console.log(item.imgHeight)
          }
        }
      }
    })
  },
  listPage: function(params = {}) {
    const {
      list,
      searchBarValue
    } = this.data;
    API.post('/app/getList', {
        // status: current,
        pagination: {
          pageSize: 4,
          currentPage: 1
        }
      })
      .then(res => {
        const {
          data,
          pageSize,
          currentPage,
          totalPages
        } = res.data.data;
        this.infoChange(data);
        this.setData({
          list: data,
          pagination: {
            pageSize,
            currentPage,
            totalPages
          }
        })
      })
  },
  handleSearch: function(e) {
    const {
      pagination,
      searchBarValue
    } = this.data;
    API.post('/app/search', {
        pagination: {
          pageSize: 8,
          currentPage: 1
        },
        context: searchBarValue
      })
      .then(res => {
        console.log(res.data.data)
        const {
          data,
          pageSize,
          currentPage,
          totalPages
        } = res.data;
        this.infoChange(data);
        this.setData({
          list: data,
          pagination: {
            pageSize,
            currentPage,
            totalPages
          }
        })
      })
  },

  returnIndex() {
    wx.navigateTo({
      url: '../home/home'
    });
  },

  onFeedTap() {
    wx.navigateTo({
      url: '../feed/feed'
    });
  },

  onSetTap() {
    wx.navigateTo({
      url: '../user/user'
    });
  },


  onShareAppMessage: function(res) {
    if (res.from === "menu") {
      console.log(res.target);
    }
    return {
      title: '西科树屋欢迎你的加入',
      path: "pages/auth/auth",
      success(res) {
        console.log(res.data);
      },
      fail(res) {
        console.log(res.msg);
      }
    }
  },
  onReachBottom: function() {
    const {
      list,
      pagination: {
        currentPage,
        totalPages,
        pageSize
      },
      tagid,
      current
    } = this.data;
    if (currentPage < totalPages) {
      API.post('/app/getList', {
          pagination: {
            pageSize: 8,
            currentPage: currentPage + 1
          }
        })
        .then(res => {
          const {
            data,
            pageSize,
            currentPage,
            totalPages
          } = res.data.data;
          this.infoChange(data);
          this.setData({
            list: [...this.data.list, ...data],
            pagination: {
              pageSize,
              currentPage,
              totalPages
            }
          })
        })
    } else {
      console.log("已经到达底部");
    }
  },
  handleLike: function(e) {
    const {
      list
    } = this.data;
    const {
      openId
    } = app.globalData;
    console.log( openId)
    if (e.detail === "https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/star.png") {
      list.forEach(item => {
        if (item.remarkId == e.target.id) {
          item.stars += 1;
        }
      })
      this.setData({
        list
      })
      API.post('/app/star', {
        remarkId: e.target.id,
        openId
      }).then(res => {})
    } else {
      list.forEach(item => {
        if (item.remarkId == e.target.id) {
          item.stars -= 1;
        }
      })
      this.setData({
        list
      })
      API.post('/app/star', {
        remarkId: e.target.id,
        openId
      }).then(res => {
        console.log(res.data);
      })
    }
  },
  
  handleClick: function(e) {
    const {
      tagid
    } = this.data;
    wx.navigateTo({
      url: `../itemDetail/itemDetail?remarkId=${e.target.id}`
    });
  },
  handleInput: function(e) {
    this.setData({
      searchBarValue: e.detail
    })
  },
  onTap() {
    wx.navigateTo({
      url: '../publish/publish'
    });
  },
  swiperChange: function(e) {
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },
  clickChange: function(e) {
    var itemId = e.currentTarget.dataset.itemId;
    this.setData({
      currentItemId: itemId
    })
  }
})