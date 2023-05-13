import { useNavigate } from "react-router-dom";
import "./AddCompany.css";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notify from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { addCompanyAction } from "../../../Redux/CompanyState";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { ImMail4 } from "react-icons/im";

function AddCompany(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().min(4, "password is minumum 4 characters").required("Password is required")
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CompanyModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })
    const sendCompany = (company: CompanyModel): void => {
        adminService.addCompany(company).then((res) => {
            store.dispatch(addCompanyAction(company));
            notify.success("Added company successfully");
            navigate("/admin/companies");

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
            <h1>Add Company</h1>
            <form className='addCompany' onSubmit={handleSubmit(sendCompany)}>
                <p className="clientType-icon"><GoPerson /></p>
                <label htmlFor="name">Name</label>
                <span>{errors.name?.message}</span>
                <input {...register("name")} id='name' type="text" placeholder='Type your name company' />

                <p className="email-icon"><ImMail4 /></p>
                <label htmlFor="email">Email</label>
                <span>{errors.email?.message}</span>
                <input {...register("email")} id='email' type="email" placeholder='Type your email' />

                <p className="password-icon"><FiLock /></p>
                <label htmlFor="password">Password</label>
                <span>{errors.password?.message}</span>
                <input {...register("password")} id='password' type={type} placeholder='Type your password' />
                <span className='eye-icon' onClick={hidePassword}><Icon icon={icon} /></span>


                <div className='vertical-center'>
                    <button disabled={!isValid}>Add</button>
                </div>

            </form>

        </div>
    );
}

export default AddCompany;









