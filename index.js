import Swiper from 'swiper'
import 'typeit'
import 'normalize.css'
import './src/assets/css/main.css'

console.info($)

new Swiper('.swiper-container', {
  direction: 'vertical'
})

$('.type-it').typeIt({
  speed: 200,
  cursor: false
})


