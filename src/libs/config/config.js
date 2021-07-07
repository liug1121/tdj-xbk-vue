const webConfig = {
  //  devServer: '  http://192.168.12.138:8080/h5view-test', // 后端本地或者测试
  // devServer: 'http://192.168.18.162:8081/', // 后端本地或者测试
  //  devServer: 'http://192.168.12.17:8086/xuebaka', // 后端本地或者测试
  //  devServer:'http://192.168.12.54:8080/xuebaka',
  //  devServer: 'http://www.xuebaka.cn/xuebaka',

  //  devServer:'http://test.service.xq.mms.yundingdang.com/rp-mms-web-shop/', // 后端本地或者测试
  //  devServer:'http://192.168.16.180:8080/mms-web/', // 后端本地或者测试
  //  server: 'http://test.xuebaka.cn/xuebaka', // 后端本地或者测试
  // server: 'http://192.168.18.162:8081/',
  timeout: 300000,
  successCode: 2000, // 和后端约定的接口正常状态码
  unLoginCode: 4005 // 未登录的接口返回状态码,
}
export default webConfig
