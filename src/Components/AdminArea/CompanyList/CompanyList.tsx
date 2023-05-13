import { useEffect, useState } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import "./CompanyList.css";
import notify from "../../../Services/NotificationService";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyCard from "../CompanyCard/CompanyCard";
import store from "../../../Redux/Store";
import { fetchCompanyAction } from "../../../Redux/CompanyState";


function CompanyList(): JSX.Element {

    const [companies, setCompanies] = useState<CompanyModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        adminService.getAllCompanies().then((res) => {
            setCompanies(res.data);
            store.dispatch(fetchCompanyAction(res.data));
        }).catch((error) => {
            notify.error(error);
        })
    }, []);

    function addCompany() {
        navigate("/admin/companies/add");
    }

    return (
        <div>
            <h2>Companies</h2>
            <div className="CompanyList" id="company-list-top">
                <div className='vertical-center-add'>
                    <button onClick={addCompany}>add new Company</button>
                </div>
                {companies.length > 0 ? companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                )) : <span>no companies yet 😒</span>}
                <a href="#company-list-top">👆</a>
            </div>
        </div>
    );
}

export default CompanyList;
