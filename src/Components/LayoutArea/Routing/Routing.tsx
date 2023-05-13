import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Layout from "../Layout/Layout"
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import { Routes, Route, Navigate } from "react-router";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import CompanyList from "../../AdminArea/CompanyList/CompanyList";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import CustomerList from "../../AdminArea/CustomerList/CustomerList";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import DeleteCustomer from "../../AdminArea/DeleteCustomer/DeleteCustomer";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CouponList from "../../CompanyArea/CouponList/CouponList";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import CouponDetails from "../../CompanyArea/CouponDetails/CouponDetails";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import PurchaseCoupon from "../../CustomerArea/PurchaseCoupon/PurchaseCoupon";
import MyCouponList from "../../CustomerArea/MyCouponList/MyCouponList";
import AllCoupons from "../../CustomerArea/AllCouponsForCustomer/AllCouponsForCustomer";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import AllCouponDetails from "../../HomeArea/Home/CouponDetails/AllCouponDetails";
import CouponDetailsForCustomer from "../../CustomerArea/CouponDetailsForCustomer/CouponDetailsForCustomer";
import CouponDetailsToPurchase from "../../CustomerArea/CouponDetailsToPurchase/CouponDetailsToPurchase";
import About from "../../AboutArea/About/About";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/details/:id" element={<AllCouponDetails />} />


                {/*  Admin Area Routing*/}
                <Route path="/admin/companies" element={<CompanyList />} />
                <Route path="/admin/companies/add" element={<AddCompany />} />
                <Route path="/admin/companies/details/:id" element={<CompanyDetails />} />
                <Route path="/admin/companies/update/:id" element={<UpdateCompany />} />
                <Route path="/admin/companies/delete/:id" element={<DeleteCompany />} />

                <Route path="/admin/customers" element={<CustomerList />} />
                <Route path="/admin/customers/add" element={<AddCustomer />} />
                <Route path="/admin/customers/details/:id" element={<CustomerDetails />} />
                <Route path="/admin/customers/update/:id" element={<UpdateCustomer />} />
                <Route path="/admin/customers/delete/:id" element={<DeleteCustomer />} />

                {/*  Company Area Routing*/}
                <Route path="/company/coupons" element={<CouponList />} />
                <Route path="/company/coupon/add" element={<AddCoupon />} />
                <Route path="/coupon/details/:id" element={<CouponDetails />} />
                <Route path="/company/coupon/update/:id" element={<UpdateCoupon />} />
                <Route path="/company/coupon/delete/:id" element={<DeleteCoupon />} />

                {/*  Customer Area Routing*/}
                <Route path="/customer/all-coupons" element={<AllCoupons />} />
                <Route path="/customer/my-coupons" element={<MyCouponList />} />
                <Route path="/customer/coupon/details/:id" element={<CouponDetailsForCustomer />} />
                <Route path="/coupon/details/to-purchase/:id" element={<CouponDetailsToPurchase />} />
                <Route path="/customer/coupon/purchaseCoupon/:id" element={<PurchaseCoupon />} />
                <Route path="/customer/details/:id" element={<CustomerDetails />} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
