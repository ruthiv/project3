import { AxiosResponse } from "axios";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import appConfig from "../Utils/Config";
import tokenAxios from "./TokenService";


class CustomerService{

    private customerUrl = appConfig.customerUrl;

    public purchaseCoupon(coupon: CouponModel): Promise<AxiosResponse<any>>{
        return tokenAxios.post(this.customerUrl +"coupon", coupon);
    }
    public getCoupons(): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get(this.customerUrl);
    }
    public getCustomerCoupons(): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get(this.customerUrl+ "coupons");
    }
    public getCustomerCouponsCategory(category:string): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get(this.customerUrl+ "couponsByCategory?couponsByCategory="+ category);
    }
    public getCustomerCouponsMaxPrice(maxPrice:number): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get(this.customerUrl+ "couponsByMaxPrice?couponsByMaxPrice="+maxPrice);
    }
    public getCustomerDetails(): Promise<AxiosResponse<CustomerModel>>{
        return tokenAxios.get(this.customerUrl+ "details");
    }

}

const customerService = new CustomerService();
export default customerService;