// @flow
import './src/assets/css/home.css'
// import Swiper from 'swiper'
import { throttle } from 'lodash'
import 'zepto/src/touch'

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
let startX = 0
let transformY = 0
let parllaxHisY = 0

function getAngle (angx, angy) {  
  return Math.atan2(angy, angx) * 180 / Math.PI 
}

function getDirection (startx, starty, endx, endy) {  
  let angx = endx - startx
  let angy = endy - starty
  let result = 0
  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result
  }
  let angle = getAngle(angx, angy)
  if (angle >= 0 && angle <= 180) {
      result = 2
  } else if (angle > -180 && angle < 0) {
      result = 1
  }
  return result
}

$(document).on('DOMContentLoaded', function(event) {
  parllax1 = $('#J-parallax-1').offset()
  console.info(parllax1)
})

// $('body').on('touchstart', function(event) {
//   startX = event.touches[0].pageX
//   startY = event.touches[0].pageY
//   console.info(startX, startY)
//   alert('123')
//   if (window.scrollY + bodyHeight - parllax1.top > 0) {
//     $('#J-parallax-1').find('.u-parallax-item').css({
//       'transform': 'translate(0, -100px)'
//     })
//   }
// })

// $('body').on('touchmove', function(event) {
//   let endX = 0
//   let endY = 0
//   endX = event.changedTouches[0].pageX
//   endY = event.changedTouches[0].pageY
//   const direction = getDirection(startX, startY, endX, endY)

//   console.info('move', event.changedTouches)
//   console.info(startY - endY)
  
//   if (direction === 1) {
//     const limit = window.scrollY + bodyHeight - parllax1.top
//     window.scrollTo(0, startY - endY)
//     console.info(limit, endY, startY, parllaxHisY)
//     transformY = endY - startY - parllaxHisY - 55
//     if ((parllax1.height / 2) < limit && limit < (parllax1.height + bodyHeight.height / 2) ) {
//       $('#J-parallax-1').find('.u-parallax-item').css({
//         'transform': `translate(0, -${transformY}px)`
//       })
//     }
//   }

//   if (direction === 2) {
//     const limit = window.scrollY + bodyHeight - parllax1.top
//     window.scrollTo(0, endY - startY)
//     transformY = endY - startY + parllaxHisY + 55
//     if ((parllax1.height / 2) < limit && limit < (parllax1.height + parllax1.height / 2) ) {
//       $('#J-parallax-1').find('.u-parallax-item').css({
//         'transform': `translate(0, -${transformY}px)`
//       })
//     }
//     console.info(window.scrollY)
//   }
// })

// $('body').on('touchend', function(event) {
//   let endX = 0
//   let endY = 0
//   endX = event.changedTouches[0].pageX
//   endY = event.changedTouches[0].pageY
//   const direction = getDirection(startX, startY, endX, endY)

//   transformY = 0 // 重置0
//   $('#J-parallax-1').find('.u-parallax-item').forEach(item => {
//     let cssTransform = $(item).css('transform')
//     if (cssTransform !== 'none') {
//       parllaxHisY = parseFloat(cssTransform.substring(15, cssTransform.length - 3))
//     }
//   })
//   console.info('end', parllaxHisY)
//   if (direction === 1) {
//     console.info('end向上')
//   }

//   if (direction === 2) {
//     console.info('end向下')
//   }

//   console.info(`move,${event}`)
// })

$(window).on('scroll', function(event) {
  console.info(event)
})
