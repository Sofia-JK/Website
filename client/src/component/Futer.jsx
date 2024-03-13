import React from 'react'
import './Futer.css'
import logo2 from '../assets/logo2.svg'
import { Link } from 'react-router-dom'

const Futer = () => {
  return (
    <div className='fut'>
        <Link to={'/'}><div className='logo-fut'>
            <img src={logo2}/>
            <p>An unsigned note</p>
        </div></Link>
        <div className='info-fut'>
            <p><Link to={'/prav'}>Правила</Link></p>
            <p>Профиль</p>
            <p>Авторизация</p>
        </div>
    </div>
  )
}

export default Futer