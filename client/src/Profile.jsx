import React, { useEffect, useState } from 'react'
import'./Profile.css'
import prof from './assets/prof.jpg'
import Otpravleno from './component/Otpravleno'
import Need from './component/Need'
import { useDispatch, useSelector } from 'react-redux'
import Request from './component/admin/Request'
import Login from './Modal/Login'
import { addrequestThunk } from './redux/addrequestSlice'

const Profile = () => {

    const dispatch = useDispatch()

    const [loginActive, setLoginActive] = useState(false)

    const [media,setMedia] = useState('')
    const [mediaValue, setMediaValue] = useState()
    const id = useSelector((state) => state.auth.id)

    const role = useSelector((state) => state.auth.role)

    async function add(media,id) {
        const data = new FormData();
    
        data.append('mediaValue', mediaValue[0])
        data.append('id', id)
    
        console.log(data)
        console.log(media)
    
        await fetch('http://localhost:3000/add/', {
          method: 'POST',
          mode: 'cors',
          body: data
        });
        setMedia('')
        setMediaValue()
      }

    const [user, setUser] = useState([])

    useEffect(() => {
      fetch('http://localhost:3000/getuser', {
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
        user.map((us) => {
            return (us.id == id) ?
            <div className='profile'>
            <div className = {role === 'ADMIN' ? 'cont-admin' : 'cont-profile'}>
                <div className='nick-img'>
                    <img onClick={() => setLoginActive(true)} src={us.image}/>
                    <p>{us.nickname}</p>
                </div>
                <div className='details'>
                {role === 'ADMIN' ? <></> : <p>{us.fio}</p>}
                {role === 'ADMIN' ? <></> : <p>{us.adress}</p>}
                {role === 'ADMIN' ? <></> : <p>{us.namber}</p>}
                {role === 'ADMIN' ? <></> : <button className='click' onClick={() => {
                    dispatch(addrequestThunk({
                        id: id
                    }))
                }}>Подать заявку</button>}
                </div>
            </div>
            <div className= {role === 'ADMIN' ? 'request' : 'otpravleno'}>
                {role === 'ADMIN' ? <p className='tit'>Заявки:</p> : <p className='tit'>Вам отправлено:</p>}
                {role === 'ADMIN' ? <Request/> :
                <Otpravleno/>}

            </div>
            <div className='need'>
                {role === 'ADMIN' ? <></> : <p className='tit'>Вам нужно отправить:</p>}
                {role === 'ADMIN' ? <></> :<Need/>}
            </div>
            <Login  active={loginActive} setActive={setLoginActive}>
                <form onSubmit={(e) => {
          e.preventDefault() 
          add(media, id)
          }} encType='multipart/form-data'>
                <input className='inp-auth'  type='file' id='media' name='media' value={media} onChange={(e) => {
              setMedia(e.target.value)
              setMediaValue(e.target.files)  
              }}></input>
              <input type='hidden' id="id" name='id' value={id} />
                <button className='click' type='submit'>Добавить</button>
                </form>
            </Login>
    </div>
            : <></>
        })
    }
    </>
  )
}

export default Profile