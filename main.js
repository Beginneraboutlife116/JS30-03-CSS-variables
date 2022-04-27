const wrapper = document.querySelector('.wrapper')
const cube = document.querySelector('.cube')
const cubeSides = document.querySelectorAll('.cube__side')
let x = 0
let y = 0
let horizontalHalfValue = wrapper.offsetWidth / 2
let verticalHalfValue = wrapper.offsetHeight / 2
let isDragging = false

function calculateRotateX(inputY) {
  let rotateXDeg = (verticalHalfValue - inputY) / verticalHalfValue * 90
  return `${rotateXDeg}deg`
}
function calculateRotateY(inputX) {
  let rotateYDeg = (inputX - horizontalHalfValue) / horizontalHalfValue * 90
  return `${rotateYDeg}deg`
}

wrapper.addEventListener('mousedown', (e) => {
  if ([...cubeSides].includes(e.target)) return
  x = e.offsetX
  y = e.offsetY
  cube.style.setProperty('--rotate-x-deg', calculateRotateX(y))
  cube.style.setProperty('--rotate-y-deg', calculateRotateY(x))
  isDragging = true
  wrapper.style.setProperty('--pointer-style', 'grabbing')
})

wrapper.addEventListener('mousemove', (e) => {
  if (isDragging) {
    x = e.offsetX
    y = e.offsetY
    cube.style.setProperty('--rotate-x-deg', calculateRotateX(y))
    cube.style.setProperty('--rotate-y-deg', calculateRotateY(x))
  }
})

wrapper.addEventListener('mouseup', () => {
  isDragging = false
  wrapper.style.setProperty('--pointer-style', '')
})

window.addEventListener('resize', () => {
  horizontalHalfValue = wrapper.offsetWidth / 2
  verticalHalfValue = wrapper.offsetHeight / 2
})
