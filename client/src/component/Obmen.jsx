import React, { useEffect, useState } from 'react'
import './Obmen.css'
import prof from '../assets/prof.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { adminThunk } from '../redux/addrequestSlice'

const Obmen = () => {

  const dispatch = useDispatch()

  const id = useSelector((state) => state.auth.id)

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
    <button onClick={() => {
      dispatch(adminThunk({
        id: id,
        receiver: elem.id
      }))
    }}>Отправить</button>
</div> :<></>
      })
    }
    </>
  )
}

export default Obmen