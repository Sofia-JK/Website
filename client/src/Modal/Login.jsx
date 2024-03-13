import React from 'react'
import './Login.css'

const login = ({active, setActive, children}) => {

  const handleSubmit = event => {
    event.preventDefault();
  }
  
  return (
    <div onSubmit={handleSubmit} className={active ? "login active" : "login"} onClick={() => setActive(false)}>
        <div className={active ?"login_content active":'login_content'} onClick={e => e.stopPropagation()}>
        {children}
        </div>
    </div>
  )
}

export default login