// @flow
import './src/assets/css/home.css'
import { throttle } from 'lodash'
// import 'zepto/src/touch'
import Hammer from 'hammerjs'

// import Parallax from 'parallax-js'

// const scene1 = document.querySelector('#J-scene')

// const parallaxInstance = new Parallax(scene1)

// const swiper = new Swiper('.swiper-container', {
//   direction: 'vertical',
//   parallax: true,
//   freeMode: true,
//   mousewheel: true
// })

const bodyHeight =  window.innerHeight
let parllax1 = {}
let parllax2 = {}
let startY = 0
let startX = 0
let transformY = 0
// let transform2Y = 0
let parllaxHisY = 0

let direction = 0 // 未动
let deltaY = 0 // Y轴方向的滚动

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
      result = 1
  } else if (angle > -180 && angle < 0) {
      result = 2
  }
  return result
}

$(document).on('DOMContentLoaded', function(event) {
  parllax1 = $('#J-parallax-1').offset()
  parllax2 = $('#J-parallax-2').offset()
  console.info(parllax1)
  const body = document.querySelector('#app-container')
  const manager = new Hammer.Manager(body)
  const Swipe = new Hammer.Swipe()
  manager.add(Swipe)

  manager.on('swipe', function(event) {
    const direction = event.offsetDirection
    deltaY += event.deltaY

    if (deltaY > 0) {
      deltaY = 0
    }

    $('#J-tip').html(event.deltaY + ',' + direction)
    
    if (direction === 16 || direction === 8) {
      requestAnimationFrame(function(){
        $(body).css({
          'transform': `translate(0, ${deltaY}px)`
        })
      })
    }

    if ((parllax1.height / 2 + parllax1.top - bodyHeight) < Math.abs(deltaY) && Math.abs(deltaY) < parllax1.top) {
      if (direction === 8) {
        parllaxHisY -= 50
      } else {
        parllaxHisY += 50
      }
      // parllaxHisY -= (event.deltaY / 4.5)
      if (parllaxHisY > 0) {
        parllaxHisY = 0
      }
      // $('#J-tip').html(direction + ',' + parllaxHisY)
      $('#J-parallax-1').find('.u-parallax-item').css({
        'transform': `translate(0, ${parllaxHisY}px)`
      })
    }

    if ((parllax2.height / 2 + parllax2.top - bodyHeight) < Math.abs(deltaY) && Math.abs(deltaY) < parllax2.top) {
      parllaxHisY -= (event.deltaY / 4.5)
      if (parllaxHisY > 0) {
        parllaxHisY = 0
      }
      $('#J-parallax-2').find('.u-parallax-item').css({
        'transform': `translate(0, ${parllaxHisY}px)`
      })
    }

  })
  // $('body').on('touchstart', function(event) {
  //   startX = event.touches[0].pageX
  //   startY = event.touches[0].pageY
  // })
  
  // $('body').on('touchmove', function(event) {
  //   let endX = 0
  //   let endY = 0
  //   endX = event.changedTouches[0].pageX
  //   endY = event.changedTouches[0].pageY
  //   direction = getDirection(startX, startY, endX, endY)
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

  //   $('#J-parallax-2').find('.u-parallax-item').forEach(item => {
  //     let cssTransform = $(item).css('transform')
  //     if (cssTransform !== 'none') {
  //       parllaxHis2Y = parseFloat(cssTransform.substring(15, cssTransform.length - 3))
  //     }
  //   })
  // })
  
  $(window).on('scroll', function(event) {
    const limit = window.scrollY + bodyHeight - parllax1.top
    const limit2 = window.scrollY + bodyHeight - parllax2.top
    event.preventDefault()
  })

  $(document).on('mousewheel', function(event) {
    return false
  })
})
