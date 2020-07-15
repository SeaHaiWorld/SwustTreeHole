Page({
    data: {
        moodList: [
            {
                value: '情绪',
                total: 12,
                tagid:0,
            },
            {
                value: '吐槽',
                total: 12,
                tagid: 1,
            },  // 暗恋
            {
                value: '安利',
                total: 12,
                tagid: 2,
            },  // 愤怒
            {
                value: '求助',
                total: 12,
                tagid: 3,
            },  // 羞耻
            {
                value: '我的',
                total: 12,
                tagid: 123,
            },
        ],
        sun: 'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/sun.jpg',
        cloud: 'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/cloud.png',
        poTag: 'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/po.png',
        square: 'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/3.png',
        leaf: 'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/leaf.png',
        weather: ['sun', 'cloud', 'rain']
    },
    onLoad: function () {
        this.start();
    },
    start: function () {
        let aniA = wx.createAnimation({
            duration: 1500,
            timingFunction: 'ease',
        });
        let aniB = wx.createAnimation({
            duration: 1500,
            timingFunction: 'ease',
        });
        let aniC = wx.createAnimation({
            duration: 1500,
            timingFunction: 'ease',
        });
        let aniD = wx.createAnimation({
            duration: 1500,
            timingFunction: 'ease',
        });
        let aniE = wx.createAnimation({
            duration: 1500,
            timingFunction: 'ease',
        });
        let sunAnimation = wx.createAnimation({
            duration: 1500,
            timingFunction: 'ease',
        });
        let next = true;
        setInterval(() => {
            if (next) {
                aniA.translateX(5).step();
                aniB.translateX(-4).step();
                aniC.translateY(4).step();
                aniD.translateX(6).step();
                aniD.translateY(-6).step();
                aniE.translateX(-4).step();
                aniE.translateY(-6).step();
                sunAnimation.translateY(-4).step();
                next = !next
            } else {
                aniA.translateX(-5).step();
                aniB.translateX(4).step();
                aniC.translateY(-4).step();
                aniD.translateX(-6).step();
                aniD.translateY(6).step();
                aniE.translateX(4).step();
                aniE.translateY(6).step();
                sunAnimation.translateY(4).step();
                next = !next;
            }
            this.setData({
                aniA: aniA.export(),
                aniB: aniB.export(),
                aniC: aniC.export(),
                aniD: aniD.export(),
                aniE: aniE.export(),
                sunAnimation: sunAnimation.export()
            })
        }, 1500);
    },
    squareClick: function () {
        wx.navigateTo({ url: '../square/square' })
    },
    leafClick: function () {
        wx.navigateTo({ url: '../user/user' })
        // wx.navigateTo({ url: '../treeHole/treeHole' })
    },
    handleClick: function (e) {
        console.log(e.target.id)
        if(e.target.id==123){
            wx.redirectTo({ url: `../listPage/listPage?type=0` })
        }else
        wx.navigateTo({ url: `../square/square?tagid=${e.target.id}` })
    },
})
