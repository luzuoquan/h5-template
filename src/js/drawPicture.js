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
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = this.src
    this.canvas.width = this.width * 2
    this.canvas.height = this.height * 2
    this.canvasContext.scale(2,2)
    image.onload = () => {
      this.canvasContext.clearRect(0, 0, 1000, 1000)
      this.canvasContext.drawImage(image, 0, 0, this.width, this.height)
      this.canvasContext.font = 'italic bold 24px PingFangSC-Light,Helvetica'
      this.canvasContext.fillStyle = 'white'
      this.canvasContext.textAlign = 'center'
      const splitIndex = this.title.lastIndexOf(this.type === 1 ? '加' : '第')

      // title
      this.canvasContext.fillText(this.title.substr(0, splitIndex), this.width / 2, 150)
      this.canvasContext.fillText(this.title.substr(splitIndex), this.width / 2, 184)

      // description
      if (this.description.length > 10) {
        this.canvasContext.fillText(this.description.substr(0, 10), this.width / 2, 250)
        this.canvasContext.fillText(this.description.substr(10), this.width / 2, 284)
      } else {
        this.canvasContext.fillText(this.description, this.width / 2, 250)
      }
    }
  }
}