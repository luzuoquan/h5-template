import Swiper from 'swiper'
import Wechat from './src/js/wechat.js'
import Draw from './src/js/draw.js'
import './src/assets/lib/createjs.js'
import 'normalize.css'
import './src/assets/css/main.css'

let queryType  = 1 // 1: 员工, 2: 用户

let wechat // 分享实例

let url // 待合成的图片src

const description = '彼此成就，与有荣焉'  // 待合成的祝福语

let title // 待合成的人

let username

  // shape-employee shape-user activity-user activity-staff delete delete-1

const queue = new createjs.LoadQueue(true)

const manifest = [
  {id: '#J-slide-1', isSrc: true,  target: 'bg', src: 'http://img.pillele.cn/cover.jpg'},
  {id: '#J-slide-2', isSrc: true,  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-3', isSrc: true,  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-4', isSrc: true,  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-5', isSrc: true,  target: 'bg', src: 'http://img.pillele.cn/bg.png'},
  {id: '#J-slide-6', isSrc: true,  target: 'bg', src: 'http://img.pillele.cn/step-1.png'},
  {id: '#J-slide-7', isSrc: true,  target: 'newer',  src: 'http://img.pillele.cn/step-2-1.png'},
  {id: '#J-slide-7', isSrc: true,  target: 'inner', src: 'http://img.pillele.cn/step-2.png'},
  {id: '#J-slide-8', isSrc: true,  target: 'staff', src: 'http://img.pillele.cn/staff-1.png'},
  {id: '#J-slide-8', isSrc: true,  target: 'staff', src: 'http://img.pillele.cn/staff-2.png'},
  {id: '#J-slide-8', isSrc: true,  target: 'staff', src: 'http://img.pillele.cn/staff-4.png'},
  {id: '#J-slide-8', isSrc: true,  target: 'user', src: 'http://img.pillele.cn/user-1.png'},
  {id: '#J-slide-8', isSrc: true,  target: 'user', src: 'http://img.pillele.cn/user-2.png'},
  {id: '#J-slide-8', isSrc: true,  target: 'user', src: 'http://img.pillele.cn/user-3.png'},
  {id: '#J-staff-tip', isSrc: false,  target: 'bg', src: 'http://img.pillele.cn/activity-staff.jpg'},
  {id: '#J-user-tip', isSrc: false,  target: 'bg', src: 'http://img.pillele.cn/activity-user.jpg'}
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

const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  simulateTouch: false,
  followFinger: false,
  on: {
    slideChangeTransitionStart: function () {
      
      this.allowSlideNext = this.activeIndex !== 6
      this.allowSlidePrev = this.activeIndex !== 1
    }
  }
})


queue.loadManifest(manifest)

const handleProgress = event => {
  $('#J-loading').html('loading...' + parseInt(event.progress * 100) + '%')
}

const handleComplete = () => {
  manifest.forEach(item => {
    if (item.isSrc) {
      $(item.id).css({
        'background-image': `url("${item.src}")`
      })
    } else {
      $(item.id).attr('src', `${item.src}`)
    }
    
  })
  frontManifest.forEach(item => {
    $(item.id).css('background-image', `url(${item.src}`)
  })
  wechat = new Wechat()

  $('body').height(document.body.clientHeight)

  setTimeout(() => {
    swiper.allowSlidePrev = false
    swiper.slideNext(300, false)
  }, 500)
}

queue.on("progress", handleProgress, this)

queue.on("complete", handleComplete, this)

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
    $('#J-info-text').html('请输入您的姓名')
    $('#J-info-modal').show()
    return
  }
  if (phone.val() === '') {
    $('#J-info-text').html('请输入您的电话号码')
    $('#J-info-modal').show()
    return
  }

  if (phone.val() !== '' && !/^1\d{10}$/.test(phone.val())) {
    $('#J-info-text').html('请检查手机号码位数')
    $('#J-info-modal').show()
    return
  }

  $.ajax({
    url: `http://h5.pillele.cn/auth`,
    method: 'post',
    data: {
      usname: userName.val(),
      mobile: phone.val(),
      category: queryType
    }
  })
    .then(res => {
      if (res.code === '0000') {
        username = res.usname
        const joinTime = res['join_time']
        const random = Math.floor(Math.random() * 3)
        let infoTitle = ''
        if (queryType === 1) {
          url = manifest.filter(item => item.id === '#J-slide-8' && item.target === 'staff')[random].src
          title = `${username}在${joinTime}\r加入了惠金所`
          infoTitle = `${username}在${joinTime}<br/>加入了惠金所`
          // description = staffDefaultText[random]
          $('#J-shape-employee').show()
          $('#J-shape-user').hide()
        } else {
          url = manifest.filter(item => item.id === '#J-slide-8' && item.target === 'user')[random].src
          title = `今天是${username}加入惠金所\r第${joinTime}天`
          infoTitle = `今天是${username}加入惠金所<br/>第${joinTime}天`
          // description = userDefaultText[random]
          $('#J-shape-employee').hide()
          $('#J-shape-user').show()
        }
        $('#J-slide-8').attr('src', `${url}`)
        $('#J-role-info').html(infoTitle)
        swiper.allowSlideNext = true
        swiper.slideNext(300, false)
        setTimeout(() => {
          swiper.allowSlideNext = false
        },0)
      } else if (queryType !== 1 && (res.code === '0001' || res.code === '0004')) {
        $('#J-info-text').html('网络异常 请稍后再试')
        $('#J-info-modal').show()
      } else if (queryType !== 1 && res.code === '0003') {
        // 
        $('#J-info-text').html('您可能还未进行实名认证，<br/>请打开惠金所APP，实名认证后再来哦。')
        $('#J-info-modal').show()
      } else if (queryType !== 1 && res.code === '0002') {
        $('#J-info-text').html('您填写的信息可能有误<br/>请核实后重新提交')
        $('#J-info-modal').show()
      } else {
        $('#J-info-text').html('OPPS，您可能遇到了以下情况，<br/>无法继续访问：<br/>1、点错了？请返回上一页，<br/>选择正确身份呢。<br/>2、11月8号后入职的新同事信息这次暂未收录哦~下个节日再见！')
        $('#J-info-modal').show()
      }
    })
})

$('#J-build').on('click', function () {
  let wxTitle
  const customText = $('#J-custom-text').val()

  if (customText && customText.length > 20) {
    $('#J-info-text').html('想说的话不能超过20字喔')
    $('#J-info-modal').show()
    return
  }
  const draw = new Draw({
    title: title,
    description: $('#J-custom-text').val() || description,
    src: url,
    height: $('body').height(),
    width: $('body').width(),
    type: queryType
  })
  if (queryType === 1) {
    wxTitle = `${username}奋斗在惠金所`
  } else {
    wxTitle = `${username}在这升值财富`
  }
  wechat.wx.onMenuShareTimeline({
    title: wxTitle,
    link: 'http://h5.pillele.cn/thanksgiving',
    imgUrl: 'http://img.pillele.cn/1.png',
    success() {
    }
  })
  wechat.wx.onMenuShareAppMessage({
    title: wxTitle,
    desc: '彼此成就，与有荣焉',
    link: 'http://h5.pillele.cn/thanksgiving',
    imgUrl: 'http://img.pillele.cn/1.png',
    success() {
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

$('#J-gift').on('click', function () {
  $('#J-modal').show()
  if (queryType === 1) {
    $('#J-staff-tip').show()
    $('#J-user-tip').hide()
  } else {
    $('#J-staff-tip').hide()
    $('#J-user-tip').show()
  }
})

$('#J-delete-modal').on('click', function () {
  $('#J-modal').hide()
})

$('#J-info-delete').on('click', function () {
  $('#J-info-text').html()
  $('#J-info-modal').hide()
})

$('#J-custom-text').on('input', function (event) {
  const value = $(this).val()
  if(value.length > 20) {
    $('#J-info-text').html('想说的话不可以超过20个字喔')
    $('#J-info-modal').show()
    $(this).val(value.substr(0,20))
    event.preventDefault()
  }
})

