let COS = require('./cos-wx-sdk-v5.js');
const BASECONFIG = {
    APPID: 1109918821,
    SECRET: 'A4zAbjf52PCKQiUD',
    GRANT_TYPE: 'authorization_code',
}

const Cos = {
    SECRETID: 'AKIDLOL9nJzjcLo7GHLpOlyyAFBxZ2OaJNXX',
    SECRETKEY: 'EKI6l3HOOGzYxCzd8SdjkbJZhgYGoEWg',
    BUCKET: 'tree-home-1259219507',
    REGION: 'ap-chengdu',
}
/**
 * 防抖函数
 * @param func 回调函数
 * @param wait 间隔时间
 * @param immediate 是否立即执行
 * @returns {function(): *}
 */
const debounce = function (func, wait, immediate) {
    let timeout, result;
    const debounced = function () {
        const context = this;
        const args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            const callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
        return result;
    };
    // 不用等待，直接执行回调
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
};
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const type = (obj) => {
    let class2type = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function (item) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    });
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
};

const dateCalculate = (earlierDate, Date) => {
    if (type(earlierDate) !== 'date' && type(Date) !== 'date') {
        console.log("参数格式错误");
        return 'xxxx-xx-xx';
    }
    const interval = Date - earlierDate;
    return {
        year: Math.floor(interval / (365 * 24 * 60 * 60 * 1000)),
        day: Math.floor(interval / (24 * 60 * 60 * 1000)),
        hour: Math.floor(interval / (60 * 60 * 1000)),
        minute: Math.floor(interval / (60 * 1000)),
        second: Math.floor(interval / (1000)),
    }
};

const timeFormat = (time, fmt) => {
    const o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3),
        //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

const timeDis = (earlyDate, newDate) => {
    const date = dateCalculate(earlyDate, newDate);
    if (date.day === 0) {
        if (date.hour === 0) {
            if (date.minute < 5) {
                return '刚刚';
            } else if (date.minute === 30) {
                return '半小时前';
            } else {
                return timeFormat(earlyDate, date.minute + '分钟前');
            }
        } else {
            return timeFormat(earlyDate, date.hour + '小时前');
        }
    } else if (date.day < 5) {
        return timeFormat(earlyDate, date.day + '天前');
    } else {
        return timeFormat(earlyDate, 'MM-dd hh:mm');
    }
};


const uploadFile = (filename, file, func) => {
    const cos = new COS({
        SecretId: Cos.SECRETID,
        SecretKey: Cos.SECRETKEY,
    });
    cos.postObject({
        Bucket: Cos.BUCKET,
        Region: Cos.REGION,
        Key: `img/${filename}`,
        FilePath: file,
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
        func(data.Location);
    });
};

const downloadFile = (filename, func) => {
    const cos = new COS({
        SecretId: Cos.SECRETID,
        SecretKey: Cos.SECRETKEY,
    });
    cos.getObject({
        Bucket: Cos.BUCKET,
        Region: Cos.REGION,
        Key: `img/${filename}`,
        Output: path.join(__dirname, '../public', `${rooter}/${filename}`)
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
        func(data);
    });
};

const deleteFile = (filename, func) => {
    const cos = new COS({
        SecretId: Cos.SECRETID,
        SecretKey: Cos.SECRETKEY,
    });
    cos.deleteObject({
        Bucket: Cos.BUCKET,
        Region: Cos.REGION,
        Key: `img/${filename}`,
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
        func(data);
    });
};

const selectFile = (filename, func) => {
    const cos = new COS({
        SecretId: Cos.SECRETID,
        SecretKey: Cos.SECRETKEY,
    });
    cos.getBucket({
        Bucket: Cos.BUCKET,
        Region: Cos.REGION,
        Key: `img/${filename}`,
    }, function (err, data) {
        if (err) {
            func(data);
            return;
        }
        func(data);
    });
};

// const userTextEncode = ($str) => {
//     if (!is_string($str)) return $str;
//     if (!$str || $str == 'undefined') return '';
//     $text = json_encode($str); //暴露出unicode
//     $text = preg_replace_callback('/(\\\u[ed][0-9a-f]{3})/i', function ($str) {
//         return addslashes($str[0]);
//     }, $text); //将emoji的unicode留下，其他不动，这里的正则比原答案增加了d，因为我发现我很多emoji实际上是\ud开头的，反而暂时没发现有\ue开头。
//     return json_decode($text);
// }

module.exports = {
    formatTime,
    dateCalculate,
    timeFormat,
    timeDis,
    debounce,
    type,
    uploadFile,
    downloadFile,
    deleteFile,
    selectFile
}
