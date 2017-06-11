export default () => {
  let r = document.getElementById('root')
  let p = document.createElement('p')
  let t = document.createTextNode('.js file loaded')
  p.classList.add('success')
  p.appendChild(t)
  r.appendChild(p)
}
