import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import store from '../../../Redux/Store';
import "./AuthMenu.css"
import { BsPersonFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { ImCart } from "react-icons/im";

function AuthMenu() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(store.getState().authReducer?.user?.token?.length > 0);
    const [email, setEmail] = useState<string>(store.getState().authReducer.user.email);
    const [counter, setCounter] = useState<number>(store.getState().customerReducer.myCoupons.length);
    const [clientType, setClientType] = useState<string>(store.getState().authReducer?.user?.clientType);

    useEffect(() => {
        store.subscribe(() => {
            setIsLoggedIn(store.getState().authReducer?.user?.token?.length > 0)
            setEmail(store.getState().authReducer.user.email);
            setCounter(store.getState().customerReducer.myCoupons.length);
            setClientType(store.getState().authReducer?.user?.clientType);
        })
    }, [])
    return (
        <div className='Login'>

            {isLoggedIn
                ?
                <>Hello {email && email.match(/[^.]+(?=\@)/)} <Link to={'/logout'}><BsPersonCircle style={{ color: 'white', fontSize: '30px', marginInline: '5px' }} /></Link></>
                :
                <><Link to={'/login'}><BsPersonFill style={{ color: 'white', fontSize: '30px', marginInline: '5px' }} /></Link></>
            }
            <p className="person-icon">
                {
                    clientType === "CUSTOMER" &&
                    <>
                        <ImCart /> <span>{counter}</span>
                    </>
                }
            </p>

        </div>

    )
}

export default AuthMenu;
