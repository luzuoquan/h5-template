import Swiper from 'swiper'
import Wechat from './src/js/wechat.js'
import './src/assets/lib/createjs.js'
// import './src/assets/lib/jweixin-1.2.0.js'
import 'normalize.css'
import './src/assets/css/main.css'

// require('./src/assets/lib/jweixin-1.2.0.js')

// require('html-loader!./index.html')

let queryType  = 1 // 1: 员工, 2: 用户

let wechat // 分享实例

const queue = new createjs.LoadQueue(true)

const manifest = [
  {id: '#J-slide-1',  target: 'bg', src: 'http://img.pillele.cn/cover.png'},
  {id: '#J-slide-2',  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-3',  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-4',  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-5',  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-6',  target: 'bg', src: 'http://img.pillele.cn/step-1.png'},
  {id: '#J-slide-7',  target: 'newer',  src: 'http://img.pillele.cn/step-2-1.png'},
  {id: '#J-slide-7',  target: 'inner', src: 'http://img.pillele.cn/step-2.png'},
  {id: '#J-slide-8',  target: 'staff', src: 'http://img.pillele.cn/staff-1.png'},
  {id: '#J-slide-8',  target: 'staff', src: 'http://img.pillele.cn/staff-2.png'},
  {id: '#J-slide-8',  target: 'staff', src: 'http://img.pillele.cn/staff-3.png'},
  {id: '#J-slide-8',  target: 'user', src: 'http://img.pillele.cn/user-1.png'},
  {id: '#J-slide-8',  target: 'user', src: 'http://img.pillele.cn/user-2.png'},
  {id: '#J-slide-8',  target: 'user', src: 'http://img.pillele.cn/user-3.png'}
]

const frontManifest = [
  {id: '#J-slide-front-2', src: 'http://img.pillele.cn/front-1.png'},
  {id: '#J-slide-front-3', src: 'http://img.pillele.cn/front-2.png'},
  {id: '#J-slide-front-4', src: 'http://img.pillele.cn/front-3.png'},
  {id: '#J-slide-front-5', src: 'http://img.pillele.cn/front-4.png'}
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
  wechat = new Wechat()
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
    const url = manifest.filter(item => item.id === '#J-slide-7' && item.target === 'inner')[0].src
    $('#J-slide-7').css('background-image', `url(${url}`)
    $('#J-register-btn').hide();
    $('#J-query-form').show();
    $('#J-info-query').show();
    queryType = $(this).attr('data-type') === 'staff' ? 1 : 2
  } else {
    const url = manifest.filter(item => item.id === '#J-slide-7' && item.target === 'newer')[0].src
    $('#J-register-btn').show();
    $('#J-query-form').hide();
    $('#J-info-query').hide();
    $('#J-slide-7').css('background-image', `url(${url}`)
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
    .always(() => {
      let url
      const random = Math.floor(Math.random() * 3)
      if (queryType === 1) {
        url = manifest.filter(item => item.id === '#J-slide-8' && item.target === 'staff')[random].src
      } else {
        url = manifest.filter(item => item.id === '#J-slide-8' && item.target === 'user')[random].src
      }
      $('#J-slide-8').attr('src', `${url}`)
      swiper.allowSlideNext = true
      swiper.slideNext(300, false)
      setTimeout(() => {
        swiper.allowSlideNext = false
      },0)
    })
})

$('#J-build').on('click', function() {
  alert(123)
})


