// @flow
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
              title: '暖心感恩节，惠金所送福利',
              link: 'http://h5.pillele.cn/thanksgiving',
              imgUrl: 'http://img.pillele.cn/1.png',
              success() {
              }
            })
            this.wx.onMenuShareAppMessage({
              title: '暖心感恩节，惠金所送福利',
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
          title: '暖心感恩节，惠金所送福利',
          link: 'http://h5.pillele.cn/thanksgiving',
          imgUrl: 'http://img.pillele.cn/share.jpeg',
          success() {
          }
        })
        this.wx.onMenuShareAppMessage({
          title: '暖心感恩节，惠金所送福利',
          desc: '彼此成就，与有荣焉',
          link: 'http://h5.pillele.cn/thanksgiving',
          imgUrl: 'http://img.pillele.cn/share.jpeg',
          success() {
          }
        })
      })
    }
  }
}