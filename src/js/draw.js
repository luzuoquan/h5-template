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
    this.type = param.type
    this.draw()
  }
  draw () {
    const devicePixelRatio = window.devicePixelRatio || 1
    const image = new Image()
    const textTop = this.height / 2
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = this.src
    this.canvas.width = this.width * devicePixelRatio
    this.canvas.height = this.height * devicePixelRatio
    this.canvasContext.scale(devicePixelRatio, devicePixelRatio)
    
    image.onload = () => {
      this.canvasContext.clearRect(0, 0, 1000, 1000)
      this.canvasContext.drawImage(image, 0, 0, this.width, this.height)
      this.canvasContext.font = 'italic normal 24px PingFangSC-Light,Helvetica'
      this.canvasContext.fillStyle = 'white'
      this.canvasContext.textAlign = 'center'
      const splitIndex = this.title.lastIndexOf(this.type === 1 ? '加' : '第')

      // title
      this.canvasContext.fillText(this.title.substr(0, splitIndex), this.width / 2, 150)
      this.canvasContext.fillText(this.title.substr(splitIndex), this.width / 2, 184)

      // description
      this.canvasContext.font = 'normal normal 20px PingFangSC-Light,Helvetica'
      if (this.description.length > 10) {
        this.canvasContext.fillText(this.description.substr(0, 10), this.width / 2, textTop - 20)
        this.canvasContext.fillText(this.description.substr(10), this.width / 2, textTop + 10)
      } else {
        this.canvasContext.fillText(this.description, this.width / 2, textTop -20)
      }
    }
  }
}