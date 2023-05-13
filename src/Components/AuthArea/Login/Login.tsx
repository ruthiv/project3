import "./Login.css"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import notify from "../../../Services/NotificationService"
import UserCredentialsModel from '../../../Models/UserCredentialsModel'
import loginService from '../../../Services/LoginService'
import { useNavigate } from 'react-router-dom'
import store from '../../../Redux/Store'
import { loginAction, rememberAction } from '../../../Redux/AuthState'
import { FiLock } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { ImMail4 } from "react-icons/im";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { useState } from "react"

function Login() {

    const [remeberMe, setRemeberMe] = useState<boolean>(true);

    const navigate = useNavigate();
    // Step 1 schema for forms
    const schema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().min(4, "Minimum 4 characters").required("Password is required"),
        clientType: yup.string().required("ClientType is required")
    })

    // Step 2 userForm with Yup aka valid the form and register it
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<UserCredentialsModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })

    const loginFromServer = (userCredential: UserCredentialsModel): void => {
        loginService.login(userCredential).then((res) => {
            notify.success("Loggedin Successfully");
            store.dispatch(loginAction(res.data));
            navigate("/home");

        }).catch((error) => {
            notify.error(error);

        })
    }

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const hidePassword = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }

    function handleChange1(ev: any) {
        const isRememberMe: boolean = ev.target.checked
        setRemeberMe(isRememberMe);
        store.dispatch(rememberAction(isRememberMe))
    }

    return (
        <div>
            <h1>Login</h1>
            <form className='login' onSubmit={handleSubmit(loginFromServer)}>
                <p className="email-icon"><ImMail4 /></p>
                <label htmlFor="email">Email</label>
                <span>{errors.email?.message}</span>
                <input {...register("email")} id='email' type="email" placeholder='Type your email ' />

                <p className="password-icon"><FiLock /></p>
                <label htmlFor="password">Password</label>
                <span>{errors.password?.message}</span>
                <input {...register("password")} id='password' type={type} placeholder='Type your password' />
                <span className='eye-icon' onClick={hidePassword}><Icon icon={icon} /></span>

                <p className="clientType-icon"><GoPerson /></p>
                <label htmlFor="clientType">ClientType</label>
                <select {...register("clientType")} name="clientType" id="clientType">
                    <option disabled value="">Select client Type </option>
                    <option value="ADMIN">Admin</option>
                    <option value="COMPANY">Company</option>
                    <option value="CUSTOMER">Customer</option>
                </select>

                <div className='dropdownCheck'>
                    <label htmlFor="dropdownCheck">Remember me</label>
                    <input type="checkbox" checked={remeberMe} onChange={handleChange1} id="dropdownCheck" />
                </div>


                <span>{errors.clientType?.message}</span>
                <div className='vertical-center'>
                    <button disabled={!isValid}>Login</button>
                </div>
            </form>

        </div>
    )
}

export default Login