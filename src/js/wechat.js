// wechat
import '../assets/lib/jweixin-1.2.0.js'
export default class Wechat {
  constructor () {
    this.wx = wx
    this.init() 
  }
  init() {
    let config
    if (!window.wxConfig) {
      $.ajax({
        url: 'http://h5.pillele.cn/wxshare'
      })
        .done(json => {
          this.wx.config(JSON.parse(json))
        })
        .then(() => {
          this.wx.ready(() => {
            this.wx.onMenuShareTimeline({
              title: '惠金所，感谢有你',
              link: 'http://h5.pillele.cn/thanksgiving',
              imgUrl: 'http://img.pillele.cn/1.png',
              success() {
              }
            })
            this.wx.onMenuShareAppMessage({
              title: '惠金所，感谢有你',
              desc: '彼此成就，与有荣焉',
              link: 'http://h5.pillele.cn/thanksgiving',
              imgUrl: 'http://img.pillele.cn/1.png',
              success() {
              }
            })
          })
        })
    } else {
      this.wx.config(window.wxConfig)
      this.wx.ready(() => {
        this.wx.onMenuShareTimeline({
          title: '惠金所，感谢有你',
          link: 'http://h5.pillele.cn/thanksgiving',
          imgUrl: 'http://img.pillele.cn/1.png',
          success() {
          }
        })
        this.wx.onMenuShareAppMessage({
          title: '惠金所，感谢有你',
          desc: '彼此成就，与有荣焉',
          link: 'http://h5.pillele.cn/thanksgiving',
          imgUrl: 'http://img.pillele.cn/1.png',
          success() {
          }
        })
      })
    }
  }
}