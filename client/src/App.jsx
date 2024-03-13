import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Index from './index.jsx'
import Pravila from './Pravila.jsx'
import Profile from './Profile.jsx'
import MainPage from './MainPage.jsx'

const router = createBrowserRouter([
    {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/',
        element: <Index/>
      },
      {
        path:'/prav',
        element: <Pravila/>
      },
      {
        path:'/glav',
        element: <Navigate to='/'/>
      }
    ]}
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/',
        element: <Profile/>
      },
      {
        path:'/prav',
        element: <Pravila/>
      },
      {
        path:'/glav',
        element: <Index/>
      }

    ]}  
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path:'/',
        element: <Profile/>
      }
    ]}  
])

function App() {

  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)

  console.log(token);


  return (
    token ? role === "ADMIN" ? <RouterProvider router={authRouterAdmin} /> : <RouterProvider router={authRouter} /> :
    <RouterProvider router={router} />
  )
}

export default App
