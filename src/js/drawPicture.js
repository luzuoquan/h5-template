// canvas
export default class Draw {
  constructor (param) {
    this.canvas = document.createElement('canvas')
    this.canvasContext = this.canvas.getContext('2d')
    this.height = param.height
    this.width = param.width
    this.src = param.src
    this.title = param.title || '测试图片'
    this.description = param.description || '测试描述'
    this.draw()
  }
  draw () {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = this.src
    this.canvas.width = this.width * 2
    this.canvas.height = this.height * 2
    this.canvasContext.scale(2,2)
    image.onload = () => {
      this.canvasContext.clearRect(0, 0, 1000, 1000)
      this.canvasContext.drawImage(image, 0, 0, this.width, this.height)
      this.canvasContext.font = 'PingFangSC-Light,PingFang SC,Helvetica normal 30px arial'
      this.canvasContext.fillStyle = 'white'
      this.canvasContext.fillText(this.title, 50, 150)
      this.canvasContext.fillText(this.description, 50, 200)
    }
  }
}