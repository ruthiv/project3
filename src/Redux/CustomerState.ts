import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";

//1. customers state-the data we need at global application level
export class CustomerState {
    public customers: CustomerModel[] = [];
    public coupons: CouponModel[] = [];
    public myCoupons : CouponModel[] = [];
}

//2. Action Types - list of actions - enum
export enum CustomerActionType {
    FetchMyCoupons = "FetchMyCoupons",//get
    AddMyCoupon = "AddMyCoupon",//post
    UpdateMyCoupon = "UpdateMyCoupon",//put
    DeleteMyCoupon = "DeleteMyCoupon",//delete
    FetchCoupons = "FetchCoupons",//get
    AddCoupon = "AddCoupon",//post
    UpdateCoupon = "UpdateCoupon",//put
    DeleteCoupon = "DeleteCoupon",//delete
    FetchCustomers = "FetchCustomers",//get
    AddCustomer = "AddCustomer",//post
    UpdateCustomer = "UpdateCustomer",//put
    DeleteCustomer = "DeleteCustomer"//delete
}

//3. Action -  an interface describing a single command
export interface CustomersAction {
    type: CustomerActionType;//action type
    payload: any; //action data
}

//4. action creators - functions to create action objects
export function fetchMyCouponAction(coupons: CouponModel[]): CustomersAction {
    return { type: CustomerActionType.FetchMyCoupons, payload: coupons };
}
export function addMyCouponAction(coupon: CouponModel): CustomersAction {
    return { type: CustomerActionType.AddMyCoupon, payload: coupon};
}
export function updateMyCouponAction(coupon: CustomerModel): CustomersAction {
    return { type: CustomerActionType.UpdateMyCoupon, payload: coupon};
}
export function deleteMyCouponAction(id: number): CustomersAction {
    return { type: CustomerActionType.DeleteMyCoupon, payload: id};
}
export function fetchCouponAction(coupons: CouponModel[]): CustomersAction {
    return { type: CustomerActionType.FetchCoupons, payload: coupons };
}
export function addCouponAction(coupon: CouponModel): CustomersAction {
    return { type: CustomerActionType.AddCoupon, payload: coupon};
}
export function updateCouponAction(coupon: CustomerModel): CustomersAction {
    return { type: CustomerActionType.UpdateCoupon, payload: coupon};
}
export function deleteCouponAction(id: number): CustomersAction {
    return { type: CustomerActionType.DeleteCoupon, payload: id};
}
export function fetchCustomerAction(customers: CustomerModel[]): CustomersAction {
    return { type: CustomerActionType.FetchCustomers, payload: customers };
}
export function addCustomerAction(customer: CustomerModel): CustomersAction {
    return { type: CustomerActionType.AddCustomer, payload: customer};
}
export function updateCustomerAction(customer: CustomerModel): CustomersAction {
    return { type: CustomerActionType.UpdateCustomer, payload: customer};
}
export function deleteCustomerAction(id: number): CustomersAction {
    return { type: CustomerActionType.DeleteCustomer, payload: id};
}

//5. reducer - a single function performing any of the above actions
export function customerReducer(currentState: CustomerState = new CustomerState(), action: CustomersAction): CustomerState {
    const newState = { ...currentState };//duplicate current state

    switch (action.type) {
        case CustomerActionType.FetchMyCoupons://here payload is all customers
            newState.myCoupons = action.payload;
            break;
        case CustomerActionType.AddMyCoupon://here payload is a single customer to add
            newState.myCoupons.push(action.payload);
            break;
        case CustomerActionType.UpdateMyCoupon://here payload is a single customer to update
            const indexToUpdateMyCoupon = newState.myCoupons.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateMyCoupon >= 0) newState.myCoupons[indexToUpdateMyCoupon] = action.payload;
            break;
        case CustomerActionType.DeleteMyCoupon://here payload is an id of customer to delete
            const indexToDeleteMyCoupon = newState.myCoupons.findIndex(p => p.id === action.payload);
            if (indexToDeleteMyCoupon >= 0) newState.myCoupons.splice(indexToDeleteMyCoupon, 1);
            break;
        case CustomerActionType.FetchCoupons://here payload is all customers
            newState.coupons = action.payload;
            break;
        case CustomerActionType.AddCoupon://here payload is a single customer to add
            newState.coupons.push(action.payload);
            break;
        case CustomerActionType.UpdateCoupon://here payload is a single customer to update
            const indexToUpdateCoupon = newState.coupons.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateCoupon >= 0) newState.coupons[indexToUpdateCoupon] = action.payload;
            break;
        case CustomerActionType.DeleteCoupon://here payload is an id of customer to delete
            const indexToDeleteCoupon = newState.coupons.findIndex(p => p.id === action.payload);
            if (indexToDeleteCoupon >= 0) newState.coupons.splice(indexToDeleteCoupon, 1);
            break;
        case CustomerActionType.FetchCustomers://here payload is all customers
            newState.customers = action.payload;
            break;
        case CustomerActionType.AddCustomer://here payload is a single customer to add
            newState.customers.push(action.payload);
            break;
        case CustomerActionType.UpdateCustomer://here payload is a single customer to update
            const indexToUpdate = newState.customers.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.customers[indexToUpdate] = action.payload;
            break;
        case CustomerActionType.DeleteCustomer://here payload is an id of customer to delete
            const indexToDelete = newState.customers.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.customers.splice(indexToDelete, 1);
            break;
    }
    return newState;
}
