import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { fetchCouponAction, fetchMyCouponAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import customerService from "../../../Services/CustomerService";
import notify from "../../../Services/NotificationService";
import CouponCardToPurchase from "../CouponCardToPurchase/CouponCardToPurchase";
import "./AllCouponsForCustomer.css";


function AllCouponsForCustomer(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [category, setCategory] = useState<string>("ALL")
    const [price, setPrice] = useState<number>(0)
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
        customerService.getCoupons().then((res) => {
            setCoupons(res.data);
            store.dispatch(fetchCouponAction(res.data));
        }).catch((error) => {
            notify.error(error);
        })
        customerService.getCustomerCoupons().then((res) => {
            store.dispatch(fetchMyCouponAction(res.data));
        }).catch((error) => {
            notify.error(error);
        })
    }, []);

    return (
        <div className="CouponList" id="coupon-all-list-top">
            <h2>All Coupons</h2>
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

            <div className="AllCouponsForCustomer">
                {coupons.length > 0 ? coupons.map((coupon) => (
                    <CouponCardToPurchase key={coupon.id} coupon={coupon} />
                )) : <span>no coupons yet 😒</span>}
                <a href="#coupon-all-list-top">👆</a>
            </div>
        </div>
    );
}

export default AllCouponsForCustomer;
