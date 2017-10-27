import Cropper from 'cropperjs'
import './src/assets/css/cropper.min.css'

const image = document.querySelector('#img')

const cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
  crop: function(e) {
    console.log(e.detail)
  }
})