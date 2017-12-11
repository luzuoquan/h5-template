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
  if (angle >= -135 && angle <= -45) {
      result = 1
  } else if (angle > 45 && angle < 135) {
      result = 2
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3
  } else if (angle >= -45 && angle <= 45) {
      result = 4
  }
  return result
}

$(document).on('DOMContentLoaded', function(event) {
  parllax1 = $('#J-parallax-1').offset()
  console.info(parllax1)
})

$('body').on('touchstart', function(event) {
  startX = event.touches[0].pageX
  startY = event.touches[0].pageY
  console.info(startX, startY)
  // alert('123')
  // if (window.scrollY + bodyHeight - parllax1.top > 0) {
  //   $('#J-parallax-1').find('.u-parallax-item').css({
  //     'transform': 'translate(0, -100px)'
  //   })
  // }
})

$('body').on('touchmove', function(event) {
  let endX = 0
  let endY = 0
  endX = event.changedTouches[0].pageX
  endY = event.changedTouches[0].pageY
  const direction = getDirection(startX, startY, endX, endY)

  transformY += startY - endY

  if (direction === 1) {
    const limit = window.scrollY + bodyHeight - parllax1.top
    console.info('持续向上',window.scrollY, bodyHeight, limit)
    if ((bodyHeight / 2) < limit && limit < (parllax1.height + bodyHeight / 2) ) {
      $('#J-parallax-1').find('.u-parallax-item').css({
        'transform': `translate(0, -${transformY}px)`
      })
    }
  }

  if (direction === 2) {
    // console.info(window.scrollY)
  }
})

$('body').on('touchend', function(event) {
  let endX = 0
  let endY = 0
  endX = event.changedTouches[0].pageX
  endY = event.changedTouches[0].pageY
  const direction = getDirection(startX, startY, endX, endY)

  transformY = 0 // 重置0
  
  if (direction === 1) {
    console.info('end向上')
  }

  if (direction === 2) {
    console.info('end向下')
  }

  // console.info(`move,${event}`)
})
