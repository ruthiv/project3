import { Axios, AxiosResponse } from "axios";
import CouponModel from "../Models/CouponModel";
import axios from 'axios';
import appConfig from "../Utils/Config";
class AllCoupons{

    private couponsUrl = appConfig.couponsUrl;
    
    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>>{
        return axios.get(this.couponsUrl);
    }
}
const allCoupons = new AllCoupons();
export default allCoupons;