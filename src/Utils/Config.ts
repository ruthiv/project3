
class Config{

}

class DevelopmentConfig extends Config{
    public adminUrl = "http://localhost:8080/api/admin/";
    public companyUrl = "http://localhost:8080/api/company/";
    public customerUrl = "http://localhost:8080/api/customer/";
    public couponsUrl = "http://localhost:8080/allCoupons/";
    public authUrl = "http://localhost:8080/auth/"
}

class ProductionCofig extends Config{
    public adminUrl = "https://ruthi-coupon-backend-cloud-production.up.railway.app/api/admin/";
    public companyUrl = "https://ruthi-coupon-backend-cloud-production.up.railway.app/api/company/";
    public customerUrl = "https://ruthi-coupon-backend-cloud-production.up.railway.app/api/customer/";
    public couponsUrl = "https://ruthi-coupon-backend-cloud-production.up.railway.app/allCoupons/";
    public authUrl = "https://ruthi-coupon-backend-cloud-production.up.railway.app/auth/";
}

const appConfig = process.env.NODE_ENV === "development"
? new DevelopmentConfig()
: new ProductionCofig();

export default appConfig;