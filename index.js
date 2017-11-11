import Swiper from 'swiper'
import './src/assets/lib/createjs.js'
import 'normalize.css'
import './src/assets/css/main.css'
import { setTimeout } from 'timers';

// require('html-loader!./index.html')

let queryType  = 1 // 1: 员工, 2: 用户

const queue = new createjs.LoadQueue(true)

const manifest = [
  {id: '#J-slide-1', src: require('./src/assets/images/cover.png')},
  {id: '#J-slide-2', src: require('./src/assets/images/bg.png')},
  {id: '#J-slide-3', src: require('./src/assets/images/bg.png')},
  {id: '#J-slide-4', src: require('./src/assets/images/bg.png')},
  {id: '#J-slide-5', src: require('./src/assets/images/bg.png')},
  {id: '#J-slide-6', src: require('./src/assets/images/step-1.png')},
  {id: '#J-slide-7', src: require('./src/assets/images/step-2-1.png')},
  {id: '#J-slide-7', src: require('./src/assets/images/step-2.png')},
]

const frontManifest = [
  {id: '#J-slide-front-2', src: require('./src/assets/images/front-1.png')},
  {id: '#J-slide-front-3', src: require('./src/assets/images/front-2.png')},
  {id: '#J-slide-front-4', src: require('./src/assets/images/front-3.png')},
  {id: '#J-slide-front-5', src: require('./src/assets/images/front-4.png')}
]


queue.loadManifest(manifest)

const handleProgress = event => {
  $('#J-loading').html('loading...' + parseInt(event.progress * 100) + '%')
}

const handleComplete = () => {
  manifest.forEach(item => {
    $(item.id).css('background-image', `url(${item.src}`)
  })
  frontManifest.forEach(item => {
    $(item.id).css('background-image', `url(${item.src}`)
  })
}

queue.on("progress", handleProgress, this)

queue.on("complete", handleComplete, this)

const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  simulateTouch: false,
  followFinger: false,
  on: {
    slideChangeTransitionStart: function () {
      console.info(this)
      this.allowSlideNext = this.activeIndex !== 6
    }
  }
})

$('.u-role').on('click', function () {
  if ($(this).attr('data-type') !== 'newer') {
    $('#J-slide-7').css('background-image', `url(${require('./src/assets/images/step-2.png')}`)
    $('#J-register-btn').hide();
    $('#J-query-form').show();
    $('#J-info-query').show();
    queryType = $(this).attr('data-type') === 'staff' ? 1 : 2
  } else {
    $('#J-register-btn').show();
    $('#J-query-form').hide();
    $('#J-info-query').hide();
    $('#J-slide-7').css('background-image', `url(${require('./src/assets/images/step-2-1.png')}`)
  }
  swiper.allowSlideNext = true
  swiper.slideNext(300, false)
  setTimeout(() => {
    swiper.allowSlideNext = false
  },0)
})

$('#J-info-query').on('click', function() {
  const userName = $('#J-username')
  const phone = $('#J-phone')
  if (userName.val() === '') {
    alert('请输入您的姓名')
    return
  }
  if (phone.val() === '') {
    alert('请输入您的电话号码')
    return
  }

  $.ajax({
    url: `http://h5.pillele.cn/auth`,
    method: 'post',
    data: {
      username: userName.val(),
      mobile: phone.val(),
      category: queryType
    }
  })
    .then(res => {
      console.info(res)
    })
})


