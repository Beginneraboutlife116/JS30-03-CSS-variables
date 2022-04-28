const interface = document.querySelector('.wrapper')
const cube = document.querySelector('.cube')
const colorInputs = document.querySelectorAll('.controller__bar')
class Rgba {
  red = Math.floor(Math.random() * 256)
  green = Math.floor(Math.random() * 256)
  blue = Math.floor(Math.random() * 256)
  alpha = `${Math.floor(Math.random() * 100)}%`
  constructor(name) {
    this.name = name
  }

  get red() {
    return this._red
  }

  set red(value) {
    this._red = value
  }

  get green() {
    return this._green
  }

  set green(value) {
    this._green = value
  }

  get blue() {
    return this._blue
  }

  set blue(value) {
    this._blue = value
  }

  get alpha() {
    return this._alpha
  }

  set alpha(value) {
    this._alpha = value
  }

  setColorProperty(color) {
    document.querySelector(`[data-side="${this.name}"]`).style.setProperty(`--${color}`, this[color])
  }
}
const sideData = {
  front: new Rgba('front'),
  right: new Rgba('right'),
  left: new Rgba('left'),
  back: new Rgba('back'),
  top: new Rgba('top'),
  bottom: new Rgba('bottom')
}
Object.keys(sideData).forEach(sideName => {
  sideData[sideName].setColorProperty('red')
  sideData[sideName].setColorProperty('green')
  sideData[sideName].setColorProperty('blue')
  sideData[sideName].setColorProperty('alpha')
})
let clickedSideName = ''
let forRotateX = 0
let forRotateY = 0
let horizontalHalfValue = interface.clientWidth / 2
let verticalHalfValue = interface.clientHeight / 2
let isGrabbing = false

function calculateRotateX(inputY) {
  let rotateXDeg = (verticalHalfValue - inputY) / verticalHalfValue * 90
  return `${rotateXDeg}deg`
}
function calculateRotateY(inputX) {
  let rotateYDeg = (inputX - horizontalHalfValue) / horizontalHalfValue * 90
  return `${rotateYDeg}deg`
}

function changeColor() {
  const colorName = this.name
  const colorValue = this.name !== 'alpha' ? this.value : `${this.value}%`
  sideData[clickedSideName][colorName] = colorValue
  sideData[clickedSideName].setColorProperty(colorName)
}

interface.addEventListener('mousedown', (e) => {
  if (e.target !== interface) return
  forRotateY = e.clientX
  forRotateX = e.clientY
  cube.style.setProperty('--rotate-x-deg', calculateRotateX(forRotateX))
  cube.style.setProperty('--rotate-y-deg', calculateRotateY(forRotateY))
  interface.style.setProperty('--pointer-style', 'grabbing')
  isGrabbing = true
})
interface.addEventListener('mousemove', (e) => {
  if (isGrabbing) {
    forRotateY = e.clientX
    forRotateX = e.clientY
    cube.style.setProperty('--rotate-x-deg', calculateRotateX(forRotateX))
    cube.style.setProperty('--rotate-y-deg', calculateRotateY(forRotateY))
    cube.style.setProperty('--cube-pointer', 'grabbing')
  }
})
interface.addEventListener('mouseup', () => {
  isGrabbing = false
  interface.style.setProperty('--pointer-style', '')
  cube.style.setProperty('--cube-pointer', '')
})
window.addEventListener('resize', () => {
  horizontalHalfValue = interface.clientWidth / 2
  verticalHalfValue = interface.clientHeight / 2
})
cube.addEventListener('click', (e) => {
  if (clickedSideName === e.target.dataset.side) return
  clickedSideName = e.target.dataset.side
  colorInputs.forEach(input => {
    switch (input.name) {
      case 'red': 
        input.value = sideData[clickedSideName].red
        break
      case 'green':
        input.value = sideData[clickedSideName].green
        break
      case 'blue':
        input.value = sideData[clickedSideName].blue
        break
      case 'alpha':
        input.value = Number(sideData[clickedSideName].alpha.slice(0, -1))
        break
    }
    input.addEventListener('input', changeColor)
  })
})