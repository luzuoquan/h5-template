// wechat
import '../assets/lib/jweixin-1.2.0.js'
export default class Wechat {
  constructor () {
    this.wx = wx
    this.init() 
  }
  init() {
    $.ajax({
      url: 'http://h5.pillele.cn/wxshare'
    })
      .done(json => {
        this.wx.config(JSON.parse(json))
      })
      .done(() => {
        this.wx.ready(() => {
          this.wx.onMenuShareTimeline({
            title: '惠金所，感谢有你e',
            link: 'http://www.163yun.com',
            imgUrl: 'http://img.pillele.cn/1.png',
            success() {
              alert('已分享')
            }
          })
          this.wx.onMenuShareAppMessage({
            title: '惠金所，感谢有你e',
            desc: '呵呵哒',
            link: 'http://www.163yun.com',
            imgUrl: 'http://img.pillele.cn/1.png',
            success() {
              alert('已分享')
            }
          })
        })
      })
  }
}