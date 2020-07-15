// default config
module.exports = {
  workers: 1,
  default_module: 'api',
  errnoField:'code', // 配置返回值的字段
  errmsgField:'msg', // 配置返回值的数据字段
  port: 8361,
  host: '127.0.0.1',
  resource_on: true
};
