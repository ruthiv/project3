import { Outlet } from 'react-router-dom'
import Routing from '../Routing/Routing'
import "./Main.css"
function Main() {
  return (
    <div className='Main'>
      <Routing />
      <Outlet />
    </div>
  )
}

export default Main