import React, { useEffect, useState } from 'react'
import './Request.css'
import { useDispatch, useSelector } from 'react-redux'
import { noThunk, yesThunk } from '../../redux/addrequestSlice'

const Request = () => {

  const [user, setUser] = useState([])
  const dispatch= useDispatch()

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
        req.map((e) => {
        return (e.status == 'Ожидает') ? <div className='info-request'>
        <div className='what'>
            <p>Отправитель:</p>
            <p>Получатель:</p>
        </div>
        <div className='name-what'>
          {
            user.map((elem) => {
              return (e.sender == elem.id) ? <p>{elem.nickname}</p> : <></>
            })
          }
          {
            user.map((elem) => {
              return (e.receiver == elem.id) ? <p>{elem.nickname}</p> : <></>
            })
          }
        </div>
        <div className='but-request'>
            <button className='yes' onClick={() =>{
              dispatch(yesThunk({
                id: e.id
              }))
            }}>Принять</button>
            <button className='no' onClick={() =>{
              dispatch(noThunk({
                id: e.id
              }))
            }}>Отклонить</button>
        </div>
    </div>
    :
    <></>
        })
      }
      </>
  )
}

export default Request