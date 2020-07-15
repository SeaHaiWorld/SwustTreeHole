Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        nickName: {
            type: String,
            value: '',
        }, avatar: {
            type: String,
            value: '',
        }, context: {
            type: String,
            value: '',
        }, star: {
            type: String,
            value: '',
        }, comment: {
            type: String,
            value: '',
        }, publishDate: {
            type: String,
            value: '',
        }, img: {
            type: Array,
            value: '',
        }, titlefontsize:{
            type: String,
            value: '34',
        }, titleheight:{
            type: String,
            value: '34',
        }, flag:{
            type: Number,
            value:0
        }, labelList:{
            type:Array,
            value:[]
        }
    },
    data: {
        starDot2: 'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/star2.png',
        starDot: 'https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/star.png',
        // value: this.properties.flag?starDot2:starDot
    },
    attached: function () {
        const {starDot,starDot2}=this.data;
        if(this.properties.flag) {
            this.setData({
                value:starDot2
            })
        } else {
            this.setData({
                value:starDot
            })
        }
    },
    moved: function () { },
    detached: function () { },
    methods: {
        handleLike: function (e) {
            const { value, starDot, starDot2 } = this.data;
            if (value===starDot) {
                this.setData({
                    value:starDot2
                })
                // if (hasChange !== undefined) {
                //     var onum = this.list[index].praise;
                //     if (hasChange) {
                //         this.list[index].praise = (onum - 1);
                //         this.list[index].hasChange = false;
                //     } else {
                //         this.list[index].praise = (onum + 1);
                //         this.list[index].hasChange = true;
                //     }
                //     this.setData({
                //         list: this.list
                //     })
                // }
            }else{
                this.setData({
                    value:starDot
                })
            }
            this.triggerEvent('handleLike', value);
        },
        handleClick:function(e){
            this.triggerEvent('handleClick',e);
        }
    }
});