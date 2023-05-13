import { AxiosResponse } from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import appConfig from "../Utils/Config";
import tokenAxios from "./TokenService";


class AdminService {

    private adminUrl = appConfig.adminUrl;


    public addCompany(company: CompanyModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.adminUrl + "company", company);
    }

    public updateCompany(company: CompanyModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.adminUrl + "company", company);
    }

    public deleteCompany(companyId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete(this.adminUrl + "company/" + companyId);
    }

    public getOneCompany(companyId: number): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.get(this.adminUrl + "company/" + companyId);
    }

    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        return tokenAxios.get(this.adminUrl + "companies");
    }

    public addCustomer(customer: CustomerModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.adminUrl + "customer", customer);
    }

    public updateCustomer(customer: CustomerModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.adminUrl + "customer", customer);
    }

    public deleteCustomer(customerId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete(this.adminUrl + "customer/" + customerId);
    }

    public getOneCustomer(customerId: number): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.get(this.adminUrl + "customer/" + customerId);
    }

    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        return tokenAxios.get(this.adminUrl + "customers");
    }


}

//externalize an instance of the service - like singleton
const adminService = new AdminService();
export default adminService;