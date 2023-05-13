import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutAction } from '../../../Redux/AuthState';
import store from '../../../Redux/Store';
import notify from "../../../Services/NotificationService"
import "./Logout.css"
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    notify.success("Logout Successfully")
    store.dispatch(logoutAction())
    navigate("/home")
  }, [])
  return (
    <>Logout</>
  )
}

export default Logout

//rfce