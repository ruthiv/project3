import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCompany.css";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import adminService from "../../../Services/AdminService";
import notify from "../../../Services/NotificationService";
import CompanyModel from "../../../Models/CompanyModel";
import { useForm } from "react-hook-form";
import { useState } from "react";
import store from "../../../Redux/Store";
import { updateCompanyAction } from "../../../Redux/CompanyState";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { FiLock } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { ImMail4 } from "react-icons/im";


function UpdateCompany(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const companyId: number = Number(params.id);
    const [company, setCompany] = useState<CompanyModel>(store.getState().companyReducer.companies.filter(company => company.id === companyId)[0]);

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().min(4, "password is minumum 4 characters").required("Password is required")
    })


    let defaultValueObj = { ...company }

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<CompanyModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendUpdateCompany = (company: CompanyModel): void => {
        adminService.updateCompany(company).then((res) => {
            notify.success("Updated company successfully");
            store.dispatch(updateCompanyAction(company))
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
            <h1>Update Company</h1>
            <form className='UpdateCompany' onSubmit={handleSubmit(sendUpdateCompany)}>
                <p className="clientType-icon"><GoPerson /></p>
                <label htmlFor="name">Name</label>
                <span>{errors.name?.message}</span>
                <input {...register("name")} id='name' type="text" />

                <p className="email-icon"><ImMail4 /></p>
                <label htmlFor="email">Email</label>
                <span>{errors.email?.message}</span>
                <input {...register("email")} id='email' type="email" />


                <p className="password-icon"><FiLock /></p> <label htmlFor="password">Password</label>
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

export default UpdateCompany;
