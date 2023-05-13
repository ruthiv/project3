import react, { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { fetchCouponAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import allCoupons from "../../../Services/AllCoupons";
import notify from "../../../Services/NotificationService";
import AllCouponCard from "./CouponCard/AllCouponCard";
import "./Home.css";
import {SiLinkedin} from "react-icons/si";

function Home(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    
    useEffect(() => {
           allCoupons.getAllCoupons().then((res) => {
                // notify.success("fetch coupons successfully");
                setCoupons(res.data);
                store.dispatch(fetchCouponAction(res.data));
            }).catch((error) => {
                notify.error(error);
            })
    }, []);



    return (
        <div>
        <h2>Homepage</h2>
        <div className="Home" id="home-list-top">
          {coupons.length > 0 ? coupons.map((coupon) => (
           <AllCouponCard key={coupon.id} coupon={coupon} /> 
            )) : <span>no coupons yet 😒</span>} 
            <a href="#home-list-top">👆</a>
        </div>
        </div>
    );
}

export default Home;
