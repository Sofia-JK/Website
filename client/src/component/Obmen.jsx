import React, { useEffect, useState } from 'react'
import './Obmen.css'
import prof from '../assets/prof.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { adminThunk } from '../redux/addrequestSlice'
import Login from '../Modal/Login'

const Obmen = () => {

  const [loginActive, setLoginActive] = useState(false)

  const dispatch = useDispatch()

  const id = useSelector((state) => state.auth.id)
  const token = useSelector((state) => state.auth.token)

  const [user, setUser] = useState([])

    useEffect(() => {
      fetch('http://localhost:3000/getavailable', {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(user => user.json())
      .then(user => {
        setUser(user)
      })
    }, [])

    const addrequestState = useSelector((state) => state.addrequest)

    useEffect(() => {

    }, [addrequestState])

  return (
    <>
    {
      user.map((elem) => {
        return (elem.id != id) ? <div className='cont-obmen'>
        <img src={elem.image}/>
    <p>{elem.nickname}</p>
    {
      token ? 
      <button onClick={() => {
        dispatch(adminThunk({
          id: id,
          receiver: elem.id
        }))
      }}>Отправить</button>
      :
      <button onClick={() => setLoginActive(true)}>Отправить</button>
    }
    </div> 
    :<></>
      })
    }
    <Login  active={loginActive} setActive={setLoginActive}>
        <p className='name-auth'>Для обмена необходимо войти в систему</p>
        </Login>
    </>
  )
}

export default Obmen