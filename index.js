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
let parallaxArray = [] 

$(document).on('DOMContentLoaded', function(event) {
  parllax1 = $('#J-parallax-1').offset()
  parllax2 = $('#J-parallax-2').offset();

  [1,2].forEach(eleIndex => {
    parallaxArray.push(Object.assign(
      {},
      $(`#J-parallax-${eleIndex}`).offset(),
      {parllaxHisY: 0, id: `#J-parallax-${eleIndex}`, anchorId: `#J-anchor-${eleIndex}`}))
  })
  
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
    
    if (direction === 16 || direction === 8) {
      requestAnimationFrame(function(){
        $(body).css({
          'transform': `translate(0, ${deltaY}px)`
        })
      })

      parallaxArray.forEach(item => {
        if ((item.height / 2 + item.top - bodyHeight) < Math.abs(deltaY) && Math.abs(deltaY) < (item.height * 2 + item.top - bodyHeight)) {
          if (direction === 8) {
            item.parllaxHisY -= Math.abs(event.deltaY) / 4.5
          } else {
            item.parllaxHisY += Math.abs(event.deltaY) / 4.5
          }
          if (item.parllaxHisY > 0) {
            item.parllaxHisY = 0
          }
          setTimeout(() => {
            const anchorY = direction === 8 ? -20 : 20
            $(`${item.anchorId}`).css({
              'transform': `translate(0, ${anchorY}px)`
            })
          }, 1500)
          
          $(`${item.id}`).find('.u-parallax-item').forEach((childItem, index) => {
            $(childItem).css({
              'transform': `translate(0, ${item.parllaxHisY}px)`
            })
          })
        }
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
