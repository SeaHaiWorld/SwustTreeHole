import api from './API'
import { login } from './apiConfig' // 链接注意填写正确 

api.post(login, {
    data: ''
}).then(res => {
    if(''){}
}).catch(err => {
    wx.showToast({
        title: err.message,
        icon: 'none'
    })
})