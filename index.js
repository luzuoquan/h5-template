// @flow
import './src/assets/css/home.css'
import Swiper from 'swiper'
// import $ from 'jquery'

// import Parallax from 'parallax-js'

// const scene1 = document.querySelector('#J-scene')

// const parallaxInstance = new Parallax(scene1)

console.info($('body'))

$(document).on('DOMContentLoaded', function(event) {
  
  console.info($('#J-parallax-1').offset())
})

$(window).on('scroll', function(event) {
  console.info(window.scrollY)
})