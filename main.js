// * Variables
const interface = document.querySelector('.wrapper')
const cube = document.querySelector('.cube')
const colorInputs = document.querySelectorAll('.controller__bar')

// the rgba for each side
class Rgba {
  red = Math.floor(Math.random() * 256)
  green = Math.floor(Math.random() * 256)
  blue = Math.floor(Math.random() * 256)
  alpha = `${Math.floor(Math.random() * 100)}%`
  constructor(name) {
    this.name = name
    this.sideDom = document.querySelector(`[data-side="${this.name}"]`)
    this.#setInitialColor()
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
    this.sideDom.style.setProperty(`--${color}`, this[color])
  }

  #setInitialColor() {
    this.setColorProperty('red')
    this.setColorProperty('green')
    this.setColorProperty('green')
    this.setColorProperty('alpha')
  }
}

// default data for each cube
const sideData = {
  front: new Rgba('front'),
  right: new Rgba('right'),
  left: new Rgba('left'),
  back: new Rgba('back'),
  top: new Rgba('top'),
  bottom: new Rgba('bottom')
}

let clickedSideName = ''

// variables for rotation
let currentHorizontalDegree = 0
let currentVerticalDegree = 0
let beginningX = 0
let beginningY = 0
let currentX = 0
let currentY = 0
let horizontalUnitDegree = 180 / interface.clientWidth
let verticalUnitDegree = 180 / interface.clientHeight
let isProcessing = false

// * Functions
function handleClickDown(event, gesture = '') {
  if (event.target !== interface) return
  beginningX = event.clientX ?? event.changedTouches[0].clientX
  beginningY = event.clientY ?? event.changedTouches[0].clientY
  interface.style.setProperty('--pointer-style', gesture)
  isProcessing = true
}
function handleCubeMove(event, gesture = '') {
  if (!isProcessing) return
  cube.style.setProperty('--cube-pointer', gesture)
  currentX = event.clientX ?? event.changedTouches[0].clientX
  currentY = event.clientY ?? event.changedTouches[0].clientY
  handleRotateDegree(beginningX, beginningY, currentX, currentY)
}
function handleRotateDegree(x1, y1, x2, y2) {
  if (x2 !== x1) {
    currentHorizontalDegree += (x2 - x1) * horizontalUnitDegree
    cube.style.setProperty('--rotate-horizontal-deg', `${currentHorizontalDegree}deg`)
    beginningX = x2
  }
  if (y2 !== y1) {
    currentVerticalDegree += (y1 - currentY) * verticalUnitDegree
    cube.style.setProperty('--rotate-vertical-deg', `${currentVerticalDegree}deg`)
    beginningY = y2
  }
}
function handleCubeClick() {
  if (clickedSideName === event.target.dataset.side) return
  clickedSideName = event.target.dataset.side
  colorInputs.forEach(input => {
    switch (input.name) {
      case 'red': 
        input.value = sideData[clickedSideName].red
        input.nextElementSibling.textContent = sideData[clickedSideName].red
        break
      case 'green':
        input.value = sideData[clickedSideName].green
        input.nextElementSibling.textContent = sideData[clickedSideName].green
        break
      case 'blue':
        input.value = sideData[clickedSideName].blue
        , input.nextElementSibling.textContent = sideData[clickedSideName].blue
        break
      case 'alpha':
        input.value = Number(sideData[clickedSideName].alpha.slice(0, -1))
        input.nextElementSibling.textContent = sideData[clickedSideName].alpha
        break
    }
    input.addEventListener('input', changeColorAndValueText)
    input.addEventListener('touchstart', changeColorAndValueText)
  })
}
function changeColorAndValueText() {
  const colorName = this.name
  const colorValue = this.name !== 'alpha' ? this.value : `${this.value}%`
  sideData[clickedSideName][colorName] = colorValue
  sideData[clickedSideName].setColorProperty(colorName)
  this.nextElementSibling.textContent = colorValue.toString()
}

// * Actions
// change unit degree based on interface's ratio
window.addEventListener('resize', () => {
  horizontalUnitDegree = 180 / interface.clientWidth
  verticalUnitDegree = 180 / interface.clientHeight
})
// start rotating
interface.addEventListener('mousedown', e => {
  handleClickDown(e, 'grabbing')
})
interface.addEventListener('touchstart', e => {
  handleClickDown(e)
})
// in the progress of rotating
interface.addEventListener('mousemove', e => {
  handleCubeMove(e, 'grabbing')
})
interface.addEventListener('touchmove', e => {
  e.preventDefault()
  handleCubeMove(e, '')
})
// rotation end
interface.addEventListener('mouseup', e => {
  handleMove(e, '')
  isProcessing = false
  interface.style.setProperty('--pointer-style', '')
})
interface.addEventListener('touchend', e => {
  handleMove(e, '')
  isProcessing = false
})

// select specific side and double binding
cube.addEventListener('mousedown', handleCubeClick)
cube.addEventListener('touchstart', handleCubeClick)