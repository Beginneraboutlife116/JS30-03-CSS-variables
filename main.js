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
let isGrabbing = false

// * Functions
function changeColor() {
  const colorName = this.name
  const colorValue = this.name !== 'alpha' ? this.value : `${this.value}%`
  sideData[clickedSideName][colorName] = colorValue
  sideData[clickedSideName].setColorProperty(colorName)
}

// * Actions
// fill color on the cube
Object.keys(sideData).forEach(sideName => {
  sideData[sideName].setColorProperty('red')
  sideData[sideName].setColorProperty('green')
  sideData[sideName].setColorProperty('blue')
  sideData[sideName].setColorProperty('alpha')
})

// change unit degree based on interface's ratio
window.addEventListener('resize', () => {
  horizontalUnitDegree = 180 / interface.clientWidth
  verticalUnitDegree = 180 / interface.clientHeight
})

// start rotating
interface.addEventListener('mousedown', (e) => {
  if (e.target !== interface) return
  beginningX = e.clientX
  beginningY = e.clientY
  interface.style.setProperty('--pointer-style', 'grabbing')
  isGrabbing = true
})
// in the progress of rotating
interface.addEventListener('mousemove', (e) => {
  if (!isGrabbing) return
  cube.style.setProperty('--cube-pointer', 'grabbing')
  currentX = e.clientX
  currentY = e.clientY
  if (currentX !== beginningX) {
    currentHorizontalDegree += (currentX - beginningX) * horizontalUnitDegree
    cube.style.setProperty('--rotate-x-deg', `${currentVerticalDegree}deg`)
    beginningX = currentX
  }
  if (currentY !== beginningY) {
    currentVerticalDegree += (beginningY - currentY) * verticalUnitDegree
    cube.style.setProperty('--rotate-y-deg', `${currentHorizontalDegree}deg`)
    beginningY = currentY
  }
})
// rotation end
interface.addEventListener('mouseup', (e) => {
  isGrabbing = false
  interface.style.setProperty('--pointer-style', '')
  cube.style.setProperty('--cube-pointer', '')
})

// select specific side and double binding
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