const interface = document.querySelector('.wrapper')
const cube = document.querySelector('.cube')
const cubeSides = document.querySelectorAll('.cube__side')
const cubeSidesColors = []
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
function setSideColor(side, red, green, blue, alpha) {
  if (!side) return
  side.style.setProperty('--red', red)
  side.style.setProperty('--green', green)
  side.style.setProperty('--blue', blue)
  side.style.setProperty('--alpha', `${alpha}%`)
}

cubeSides.forEach(cubeSide => {
  const values = []
  for (let i = 0; i < 4; i++) {
    if (i === 3) {
      values.push(Math.floor(Math.random() * 50) + 50)
    } else {
      values.push(Math.floor(Math.random() * 256))
    }
  }
  setSideColor(cubeSide, ...values)
  cubeSidesColors.push(values)
})
console.log(cubeSidesColors)

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
