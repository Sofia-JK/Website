import React, { useState } from 'react'
import './index.css'
import info1 from './assets/info1.png'
import info2 from './assets/info2.png'
import Obmen from './component/Obmen'
import Login from './Modal/Login'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Index = () => {

  const [loginActive, setLoginActive] = useState(false)

  const token = useSelector((state) => state.auth.token)

  return (
    <div className='info'>
        <img src={info1}/>
        <p>Каждая открытка имеет своего получателя - обменяйся счастьем сегодня!</p>
        {token ? <button> <Link to={'/'}> Обменяться </Link> </button>: <button onClick={() => setLoginActive(true)}>Обменяться</button>}
        <img className='img2' src={info2}/>
        <div className='obmen'>
          <Obmen/>
        </div>
        <Login  active={loginActive} setActive={setLoginActive}>
        <p className='name-auth'>Для обмена необходимо войти в систему</p>
        </Login>
    </div>
  )
}

export default Index