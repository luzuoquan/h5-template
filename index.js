import Swiper from 'swiper'
import './src/assets/lib/createjs.js'
import 'normalize.css'
import './src/assets/css/main.css'

const queue = new createjs.LoadQueue(true)

const manifest = [
  {id: 'J-slide-1', src: './src/assets/images/bg.png'},
  {id: 'J-slide-2', src: './src/assets/images/cover.png'},
  {id: 'J-slide-3', src: './src/assets/images/data-1.png'},
  {id: 'J-slide-4', src: './src/assets/images/step-1.png'},
  {id: 'J-slide-5', src: './src/assets/images/step-2.png'},
  {id: 'J-slide-6', src: './src/assets/images/step-3.png'},
  {id: 'J-slide-7', src: './src/assets/images/step-4.png'}
]


queue.loadManifest(manifest)

const handleProgress = event => {
  $('#J-loading').html(parseInt(event.progress * 100))
}

const handleComplete = () => {
  manifest.forEach(item => {
    $(item.id).attr('src', item.src)
  })
}

queue.on("progress", handleProgress, this)

// queue.on("complete", handleComplete, this)



const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  simulateTouch: false,
  followFinger: false
})


