import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCustomer.css";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import CustomerModel from "../../../Models/CustomerModel";
import { useState } from "react";
import store from "../../../Redux/Store";
import adminService from "../../../Services/AdminService";
import { updateCustomerAction } from "../../../Redux/CustomerState";
import notify from "../../../Services/NotificationService";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { FiLock } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { ImMail4 } from "react-icons/im";

function UpdateCustomer(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const customerId: number = Number(params.id);
    const [customer, setCustomer] = useState<CustomerModel>(store.getState().customerReducer.customers.filter(c => c.id === customerId)[0]);


    const schema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().min(4, "password is minimum 4 characters").required("Password is required")
    })

    let defaultValueObj = { ...customer }

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<CustomerModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendUpdateCustomer = (customer: CustomerModel): void => {
        adminService.updateCustomer(customer).then((res) => {
            notify.success("Updated customer successfully");
            store.dispatch(updateCustomerAction(customer))
            navigate("/admin/customers");

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


    return (
        <div>
            <h1>Update Customer</h1>
            <form className='UpdateCustomer' onSubmit={handleSubmit(sendUpdateCustomer)}>
                <p className="clientType-icon"><GoPerson /></p>
                <label htmlFor="firstName">Name</label>
                <span>{errors.firstName?.message}</span>
                <input {...register("firstName")} id='firstName' type="text" />


                <p className="clientType-icon"><GoPerson /></p>
                <label htmlFor="lastName">Name</label>
                <span>{errors.lastName?.message}</span>
                <input {...register("lastName")} id='lastName' type="text" />

                <p className="email-icon"><ImMail4 /></p>
                <label htmlFor="email">Email</label>
                <span>{errors.email?.message}</span>
                <input {...register("email")} id='email' type="email" />

                <p className="password-icon"><FiLock /></p>
                <label htmlFor="password">Password</label>
                <span>{errors.password?.message}</span>
                <input {...register("password")} id='password' type={type} />
                <span className='eye-icon' onClick={hidePassword}><Icon icon={icon} /></span>
                <div className='vertical-center'>
                    <button disabled={!isValid}>Update</button>
                </div>

            </form>
        </div>
    );
}

export default UpdateCustomer;
