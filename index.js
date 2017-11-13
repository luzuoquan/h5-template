import Swiper from 'swiper'
import Wechat from './src/js/wechat.js'
import Draw from './src/js/drawPicture.js'
import './src/assets/lib/createjs.js'
import 'normalize.css'
import './src/assets/css/main.css'

let queryType  = 1 // 1: 员工, 2: 用户

let wechat // 分享实例

let url // 待合成的图片src

let description  // 待合成的祝福语

let title // 待合成的人

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

const staffDefaultText = [
  '作为惠金所人我感到骄傲，也希望惠金所为我骄傲。',
  '惠金所让我觉得，金融世界比我想象的还要有趣。',
  '来到惠金所，我真正明白了金融人该有怎样的敬畏之心。'
]

const userDefaultText = [
  '你对金融的敬畏我看得到，与你携手，我将无畏。',
  '对你期待很高，你的专业不曾令我失望。',
  '财富升值的路上，有你相伴，我放心。'
]

// const draw = new Draw({
//   title: '测试',
//   description: '财富升值的路上，有你相伴，我放心。',
//   src: 'http://img.pillele.cn/staff-3.png',
//   height: $('body').height(),
//   width: $('body').width()
// })


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
      if (res.code === '0000') {

      } else {
        alert('发生了一些错误')
      }
    })
    .always(() => {
      const random = Math.floor(Math.random() * 3)
      if (queryType === 1) {
        const username = '杨冀川'
        const joinTime = '2015年07月01日'
        url = manifest.filter(item => item.id === '#J-slide-8' && item.target === 'staff')[random].src
        title = `${username}在${joinTime}\r加入了惠金所`
        description = staffDefaultText[random]
      } else {
        const username = '张猛'
        const joinTime = '4'
        url = manifest.filter(item => item.id === '#J-slide-8' && item.target === 'user')[random].src
        title = `今天是${username}加入惠金所\r第${joinTime}天`
        description = userDefaultText[random]
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
  let wxTitle
  const draw = new Draw({
    title: title,
    description: $('#J-custom-text').val() || description,
    src: url,
    height: $('body').height(),
    width: $('body').width()
  })
  if (queryType === 1) {
    wxTitle = '杨冀川奋斗在惠金所'
  } else {
    wxTitle = '张猛在这升值财富'
  }
  wechat.wx.onMenuShareTimeline({
    title: wxTitle,
    link: 'http://h5.pillele.cn/thanksgiving',
    imgUrl: 'http://img.pillele.cn/1.png',
    success() {
      alert('已分享')
    }
  })
  wechat.wx.onMenuShareAppMessage({
    title: wxTitle,
    desc: '彼此成就，与有荣焉',
    link: 'http://h5.pillele.cn/thanksgiving',
    imgUrl: 'http://img.pillele.cn/1.png',
    success() {
      alert('已分享')
    }
  })
  setTimeout(() => {
    const image = draw.canvas.toDataURL('image/png')
    const img = new Image()
    img.src = image 
    img.onload = () => {
      $('#J-slide-9').attr('src', `${image}`)
      swiper.allowSlideNext = true
      swiper.slideNext(300, false)
    }
  },300)
})


