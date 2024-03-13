import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../Modal/Login.jsx'
import { logOut, loginThunk } from '../redux/authSlice.js'
import { regThunk } from '../redux/regSlice.js'

const Header = () => {
  const [loginActive, setLoginActive] = useState(false)

  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState()

  const [nickname, setNickname] = useState("")
  const [adress, setAdress] = useState("")
  const [fio, setFio] = useState("")
  const [namber, setNamber] = useState("")
  const [password, setPassword] = useState("")

  const setLogin = event => {
    setIsLogin(!isLogin)
  }

  const regState = useSelector((state) => state.reg)
  const authState = useSelector((state) => state.auth)

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (regState.message) {
        nav('/')
    }
}, [regState])


const nav = useNavigate()


  useEffect(() => {
  }, [authState])



  return (
    <>
      <div className='head'>
        <p><Link to={'/prav'}>Правила</Link></p>
        <p><Link to = {token ? '/' : ''}>Профиль</Link></p>
        <Link to = {token ? '/glav' : '/'}><div className='logo-head'>
          <img src={logo}/>
          <p>An unsigned note</p>
        </div></Link>
        {token ? <p onClick={() => {
              dispatch(logOut())
            }}>Выйти</p> : <p onClick={() => setLoginActive(true)}>Вход/Регистрация</p>}
      </div>
      <Login  active={loginActive} setActive={setLoginActive}>
        <p className='name-auth'>{!isLogin ? 'Вход' : 'Регистрация'}</p>
        {!isLogin ? <input value={nickname} onChange={(e) => {setNickname(e.target.value)}} className='inp-auth' placeholder='Введите nickname...' type='text'></input> : <input value={nickname} onChange={(e) => {setNickname(e.target.value)}} className='inp-auth' placeholder='Придумайте nickname...' type='text'></input>}
        {!isLogin ? <></> : <input value={adress} onChange={(e) => {setAdress(e.target.value)}} className='inp-auth' placeholder='Введите адрес...' type='text'></input>}
        {!isLogin ? <></> : <input value={fio} onChange={(e) => {setFio(e.target.value)}} className='inp-auth' placeholder='Введите ФИО...' type='text'></input>}
        {!isLogin ? <></> : <input value={namber} onChange={(e) => {setNamber(e.target.value)}}className='inp-auth' placeholder='Введите номер телефона...' type='text'></input>}
        {!isLogin ? <input value={password} onChange={(e) => {setPassword(e.target.value)}} className='inp-auth' placeholder='Введите пароль...' type='password'></input> : <input value={password} onChange={(e) => {setPassword(e.target.value)}} className='inp-auth' placeholder='Придумайте пароль...' type='password'></input>}
        <p className='help'>Нет аккаунта?<span onClick={setLogin}>{!isLogin ? 'Зарегистрируйтесь...' : 'Войдите...'}</span></p>
        {!isLogin ? <button onClick={() => {
                        dispatch(loginThunk({
                            nickname: nickname,
                            password: password
                        }))
                    }}>Войти</button > 
                    : 
                    <button onClick={() => {
                      dispatch(regThunk({
                          nickname: nickname,
                          adress: adress,
                          fio: fio,
                          namber: namber,
                          password: password
                      }))
                  }}>Зарегистрироваться</button>}
      </Login>
    </>
  )
}

export default Header