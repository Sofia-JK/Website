import React, { useEffect, useState } from 'react'
import './Need.css'
import { useDispatch, useSelector } from 'react-redux'
import { numberThunk } from '../redux/addrequestSlice'

const Need = () => {

  const [user, setUser] = useState([])
  const dispatch= useDispatch()
  const id = useSelector((state) => state.auth.id)
  const [number, setNumber] = useState('')

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

    const [req, setReq] = useState([])

    useEffect(() => {
      fetch('http://localhost:3000/getadmin', {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(req => req.json())
      .then(req => {
        setReq(req)
      })
    }, [])

    const addrequestState = useSelector((state) => state.addrequest)

    useEffect(() => {

    }, [addrequestState])

  return (
    <>
    {
      req.map((r) => {
        return (r.status == 'Одобрено' && r.sender == id) ? 
        <div className='info-need'>
          {
            user.map((u) => {
              return (u.id == r.receiver) ? 
              <div className='name-need'>
                <p>{u.fio}</p>
                <p>{u.adress}</p>
                <p>{u.namber}</p>
              </div>
              : <></>
            })
          }
        <div className='otpr-need'>
            <input placeholder='Введите трек номер...' type='text' value={number} onChange={e => setNumber(e.target.value)}></input>
            <button className='click' onClick={() => {
              dispatch(numberThunk({
                number: number,
                id: id
              }))
            }}>Отправить</button>
        </div>
    </div>
        : <></>
      })
    }
    </>
  )
}

export default Need