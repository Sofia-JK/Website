import React, { useEffect, useState } from 'react'
import './Otpravleno.css'
import { useSelector } from 'react-redux'

const Otpravleno = () => {
  const [user, setUser] = useState([])
  const id = useSelector((state) => state.auth.id)

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

  return (
    <>
    {
      req.map((r) => {
        return (r.status == 'Одобрено' && r.receiver == id) ? 
        <div className='cont-otpr'>
          <div className='name-endex'>{r.number}</div>
          <button>Прибыла</button>
        </div>
        : <></>
      })
    }
    </>
  )
}

export default Otpravleno