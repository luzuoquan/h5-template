import Swiper from 'swiper'
import 'typeit'
import 'normalize.css'
import './src/assets/css/main.css'

new Swiper('.swiper-container', {
  direction: 'vertical',
  allowTouchMove: false
})

$('.type-it').typeIt({
  speed: 200,
  cursor: false
})


