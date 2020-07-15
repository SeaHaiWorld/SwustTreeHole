const app = getApp()

const request = (url, options) => {
  let {
    token
  } = app.globalData;
  return new Promise((resolve, reject) => {
    const {
      method
    } = options;
    wx.request({
      url: `${app.globalData.host}${url}`,
      method: method,
      data: {
        ...options.data,
      },
      success(request) {
        if (request.statusCode === 200) {
          resolve(request)
        } else
          reject(request.data)
      },
      fail(error) {
        reject(error.data)
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options
  })
}

const post = (url, options) => {
  return request(url, {
    method: 'POST',
    data: options
  })
}

const put = (url, options) => {
  return request(url, {
    method: 'PUT',
    data: options
  })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove
}