// @flow
import './src/assets/css/home.css'
// import Swiper from 'swiper'
import { throttle } from 'lodash'
import 'zepto/src/touch'
// import $ from 'jquery'

// import Parallax from 'parallax-js'

// const scene1 = document.querySelector('#J-scene')

// const parallaxInstance = new Parallax(scene1)

// const swiper = new Swiper('.swiper-container', {
//   direction: 'vertical',
//   parallax: true,
//   freeMode: true,
//   mousewheel: true
// })

const bodyHeight = $('body').height()
let parllax1 = {}
let startY = 0
let endY = 0

console.info(bodyHeight)

$(document).on('DOMContentLoaded', function(event) {
  parllax1 = $('#J-parallax-1').offset()
})

// $('body').on('touchstart', function(event) {
//   console.info(event)
//   alert('123')
//   if (window.scrollY + bodyHeight - parllax1.top > 0) {
//     $('#J-parallax-1').find('.u-parallax-item').css({
//       'transform': 'translate(0, -100px)'
//     })
//   }
// })

// $('body').on('touchmove', function(event) {
//   console.info(`move,${event}`)
// })

$('body').on('swipe', function(event) {
  console.info(event)
})