import Swiper from 'swiper'
import 'typeit'
import 'normalize.css'
import './src/assets/css/main.css'

const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  noSwiping: true
})

$('.type-it').typeIt({
  speed: 200,
  cursor: false
})


