import { useNavigate, useParams } from "react-router-dom";
import "./AddCoupon.css";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import { addCouponAction } from "../../../Redux/CompanyState";
import { ChangeEvent, useState } from "react";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    // const params = useParams();
    // const couponId: number = Number(params.id);
    const [currentImage, setCurrentImage] = useState<string>("");

    function getDateWithOutTime (): Date {
        let curDate = new Date();
        curDate.setHours(0, 0, 0, 0);
        return curDate;
    }
    
    const schema = yup.object().shape({
        category: yup.string().required("Category is required"),
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        startDate: yup.date().min(getDateWithOutTime(), "coupon should start from today").required("StartDate is required"),
        endDate: yup.date().min(yup.ref("startDate")).required("EndDate is required"),
        amount: yup.number().min(1).required("Password is required"),
        price: yup.number().min(0).required("Price is required"),
        image: yup.string().required("Image is required")
    })
    
    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedImage = e.currentTarget.value
        setCurrentImage(selectedImage);
    }
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CouponModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendCoupon = (coupon: CouponModel): void => {
        companyService.addCoupon(coupon).then((res) => {
            store.dispatch(addCouponAction(coupon));
            notify.success("Added coupon successfully");
            navigate("/company/coupons");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>Add Coupon</h1>
            <form className='AddCoupon' onSubmit={handleSubmit(sendCoupon)}>
                <select {...register("category")} name="category" id="category">
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
                <span>{errors.category?.message}</span>

                <label htmlFor="title">Title</label>
                <span>{errors.title?.message}</span>
                <input {...register("title")} id='title' type="text" placeholder='title company here' />

                <label htmlFor="description">Description</label>
                <span>{errors.description?.message}</span>
                <input {...register("description")} id='description' type="text" placeholder='Description here' />

                <label htmlFor="startDate">Start Date</label>
                <span>{errors.startDate?.message}</span>
                <input {...register("startDate")} id='startDate' type="date" placeholder='Start Date here' />

                <label htmlFor="endDate">End Date</label>
                <span>{errors.endDate?.message}</span>
                <input {...register("endDate")} id='endDate' type="date" placeholder='End Date here' />

                <label htmlFor="amount">Amount</label>
                <span>{errors.amount?.message}</span>
                <input {...register("amount")} id='amount' type="number" placeholder='amount here' />

                <label htmlFor="price">Price</label>
                <span>{errors.price?.message}</span>
                <input {...register("price")} id='price' type="number" step={0.01} placeholder='price here' />

                <label htmlFor="image">Image</label>
                <img id="img" src={currentImage} alt="image" />
                <span>{errors.image?.message}</span>
                <input {...register("image")} id='image' type="text" onChange={handleImageChange} placeholder='image here' />

                <button disabled={!isValid}>Add</button>
            </form>
        </div>
    );
}

export default AddCoupon;
