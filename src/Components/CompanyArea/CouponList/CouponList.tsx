import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { fetchCouponAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import companyService from "../../../Services/CompanyService";
import notify from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import "./CouponList.css";

function CouponList(): JSX.Element {
    const [email, setEmail] = useState<string>(store.getState().authReducer.user.email);
    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [category, setCategory] = useState<string>("ALL");
    const [price, setPrice] = useState<number>(0);
    function changeCategory(e: ChangeEvent<HTMLSelectElement>) {
        const selectedCategory = e.currentTarget.value;
        setCategory(selectedCategory);
        let fillteredCoupons = store.getState().companyReducer.coupons;
        if (selectedCategory !== "ALL") {
            fillteredCoupons = fillteredCoupons.filter((coupon) => {
                return coupon.category === selectedCategory;
            })
        }

        if (price !== 0) {
            fillteredCoupons = fillteredCoupons.filter((coupon) => {
                return coupon.price <= price;
            })
        }
        setCoupons(fillteredCoupons);
    }

    function changePrice(e: ChangeEvent<HTMLInputElement>) {
        const selectedPrice = Number(e.currentTarget.value);
        console.log("selectedPrice " + selectedPrice)
        setPrice(selectedPrice);
        let fillteredCoupons = store.getState().companyReducer.coupons;
        if (selectedPrice !== 0) {
            console.log("I am here1");

            fillteredCoupons = fillteredCoupons.filter((coupon) => {
                return coupon.price <= selectedPrice;
            })
        }
        if (category !== "ALL") {
            console.log("I am here2");

            fillteredCoupons = fillteredCoupons.filter((coupon) => {
                return coupon.category === category;
            })
        }
        setCoupons(fillteredCoupons);
    }

    useEffect(() => {
        companyService.getCompanyCoupons().then((res) => {
            setCoupons(res.data);
            store.dispatch(fetchCouponAction(res.data));
        }).catch((error) => {
            notify.error(error)
        })
    }, []);

    function addCoupon() {
        navigate("/company/coupon/add");
    }
    return (
        <div className="CouponList" id="my-coupon-company-list-top">
            <div className='vertical-center-add'>
                <button onClick={addCoupon}>add new Coupon</button>
            </div>
            <div className="Filter">
                <label>Category:</label>
                <select name="category" id="category" onChange={changeCategory} value={category}>
                    <option value="ALL">All</option>
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
                <label>Price:</label>
                <input type="number" min={0} step={0.01} onChange={changePrice} value={price} />
            </div>
            <h2>My Coupons For {email && email.match(/[^.]+(?=\@)/)}</h2>
            <div className="coupons-list">
                {coupons.length > 0 ? coupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                )) : <span>no coupons yet 😒</span>}
                <a href="#my-coupon-company-list-top">👆</a>
            </div>
        </div>
    );
}

export default CouponList;
