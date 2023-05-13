import { AxiosResponse } from "axios";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/Config";
import tokenAxios from "./TokenService";

class CompanyService{

    private companyUrl = appConfig.companyUrl;

    public addCoupon(coupon: CouponModel): Promise<AxiosResponse<any>>{
        return tokenAxios.post(this.companyUrl, coupon);
    }

    public updateCoupon(coupon:CouponModel): Promise<AxiosResponse<any>>{
        return tokenAxios.put(this.companyUrl, coupon);
    }
    public deleteCoupon(couponId:number): Promise<AxiosResponse<any>>{
        return tokenAxios.delete(this.companyUrl+ couponId);
    }
    public getCompanyCoupons(): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get(this.companyUrl+ "companyCoupons");
    }
    public getCompanyCouponsByCategory(category:string): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get(this.companyUrl+ "couponsByCategory?couponsByCategory="+category);
    }
    public getCompanyCouponsByMaxPrice(maxPrice:number): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get(this.companyUrl+ "couponsByMaxPrice?couponsByMaxPrice="+maxPrice);
    }
    public getCompanyDetails(): Promise<AxiosResponse<CompanyModel>>{
        return tokenAxios.get(this.companyUrl+ "details");
    }

}

const companyService = new CompanyService();
export default companyService;