import axios, { AxiosResponse } from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import UserCredentialsModel from "../Models/UserCredentialsModel";
import { AuthActionType } from "../Redux/AuthState";
import store from "../Redux/Store";
import appConfig from "../Utils/Config";


class LoginService {

    private loginUrl = appConfig.authUrl;


    public login(UserCredentials: UserCredentialsModel): Promise<AxiosResponse<string>> {
        return axios.post(this.loginUrl + "login", UserCredentials);
    }
    public logout() {
        store.dispatch({ type: AuthActionType.Logout });
    }
    public forgotPassword(email: string): Promise<AxiosResponse<string>> {
        return axios.post(this.loginUrl + "forgot-password", { email });
    }

    public resetPassword(email: string): Promise<AxiosResponse<string>> {
        return axios.post(this.loginUrl + "reset-password", { email });
    }



}

//externalize an instance of the service - like singleton
const loginService = new LoginService();
export default loginService;