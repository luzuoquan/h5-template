import Swiper from 'swiper'
import './src/assets/lib/createjs.js'
import 'normalize.css'
import './src/assets/css/main.css'

// require('html-loader!./index.html')

const queue = new createjs.LoadQueue(true)

const manifest = [
  {id: '#J-slide-1', origin: 'bg.png', src: require('./src/assets/images/bg.png')},
  {id: '#J-slide-2', origin: 'cover.png',  src: require('./src/assets/images/cover.png')},
  {id: '#J-slide-3', origin: 'data-1.png', src: require('./src/assets/images/data-1.png')},
  {id: '#J-slide-4', origin: 'step-1.png', src: require('./src/assets/images/step-1.png')},
  {id: '#J-slide-5', origin: 'step-2.png', src: require('./src/assets/images/step-2.png')},
  {id: '#J-slide-6', origin: 'step-3.png', src: require('./src/assets/images/step-3.png')},
  {id: '#J-slide-7', origin: 'step-4.png', src: require('./src/assets/images/step-4.png')}
]


queue.loadManifest(manifest)

const handleProgress = event => {
  $('#J-loading').html(parseInt(event.progress * 100))
}

const handleComplete = () => {
  manifest.forEach(item => {
    console.info(item.origin)
    $(item.id).attr('src', item.origin)
  })
}

queue.on("progress", handleProgress, this)

queue.on("complete", handleComplete, this)



const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  simulateTouch: false,
  followFinger: false
})


