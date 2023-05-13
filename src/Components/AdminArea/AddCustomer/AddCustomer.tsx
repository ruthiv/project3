import { useNavigate } from "react-router-dom";
import "./AddCustomer.css";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import CustomerModel from "../../../Models/CustomerModel";
import { useForm } from "react-hook-form";
import notify from "../../../Services/NotificationService";
import adminService from "../../../Services/AdminService";
import store from "../../../Redux/Store";
import { addCustomerAction } from "../../../Redux/CustomerState";
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { ImMail4 } from "react-icons/im";

function AddCustomer(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().min(4, "password is minimum 4 characters").required("Password is required")
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CustomerModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })
    const sendCustomer = (customer: CustomerModel): void => {
        adminService.addCustomer(customer).then((res) => {
            store.dispatch(addCustomerAction(customer))
            notify.success("Added customer successfully");
            navigate("/admin/customers");

        }).catch((error) => {
            notify.error(error);
        })
    }

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
  
    const hidePassword=()=>{
        if(type==='password'){
            setIcon(eye);
            setType('text');
        }else{
            setIcon(eyeOff);
            setType('password');
        }
    }

    return (
        <div>
            <h1>Add Customer</h1>
            <form className="AddCustomer" onSubmit={handleSubmit(sendCustomer)}>
            <p className="clientType-icon"><GoPerson/></p> 
                <label htmlFor="firstName">First Name</label>
                <span>{errors.firstName?.message}</span>
                <input {...register("firstName")} id='firstName' type="text" placeholder='Type your firstName' />

                <p className="clientType-icon"><GoPerson/></p> 
                <label htmlFor="lastName">Last Name</label>
                <span>{errors.lastName?.message}</span>
                <input {...register("lastName")} id='lastName' type="text" placeholder='Type your Last Name' />

                <p className="email-icon"><ImMail4/></p> 
                <label htmlFor="email">Email</label>
                <span>{errors.email?.message}</span>
                <input {...register("email")} id='email' type="email" placeholder='Type your email' />

                <p className="password-icon"><FiLock/></p> 
                <label htmlFor="password">Password</label>
                <span>{errors.password?.message}</span>
                <input {...register("password")} id='password' type={type} placeholder='Type your password' />
                <span className='eye-icon' onClick={hidePassword}><Icon icon={icon}/></span>
            

                <div className='vertical-center'>
                <button disabled={!isValid}>Add</button>
                </div>
                
            </form>
        </div>
    );
}

export default AddCustomer;
