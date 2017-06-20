import axios from 'axios'
import '../styles/index.scss'
import '../styles/module-a.css'
import a from './module-a'
import b from './module-b.jsx'
import small from '../assets/small.jpg'
import big from '../assets/big.jpg'

a()

b()

let r = document.getElementById('root')

let imgSmall = document.createElement('img')
imgSmall.src = small
imgSmall.classList.add('img--small')
r.appendChild(imgSmall)

let imgBig = document.createElement('img')
imgBig.src = big
imgBig.width = 170
imgBig.classList.add('img--big')
r.appendChild(imgBig)

axios.get(`${API_ROOT}/users`)
  .then((data) => {
    console.log(data)
  })
