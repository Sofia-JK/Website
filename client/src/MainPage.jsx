import './App.css'
import Futer from './component/Futer.jsx'
import Header from './component/Header.jsx'
import { Outlet } from "react-router-dom"

const MainPage = () => {

  return (
    <>
     <Header/>
     <Outlet/>
     <Futer/>
    </>
  )
}

export default MainPage