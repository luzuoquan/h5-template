import Swiper from 'swiper'
import './src/assets/lib/createjs.js'
import 'normalize.css'
import './src/assets/css/main.css'

const queue = new createjs.LoadQueue(true)


queue.loadManifest([
  'cover.png',
  'loading.png',
  'data-1.png',
  'step-1.png',
  'step-2.png',
  'step-3.png'
])

const handleProgress = event => {
  $('#J-loading').html(parseInt(event.progress * 100))
}

queue.on("progress", handleProgress, this)



const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  simulateTouch: false,
  followFinger: false
})


