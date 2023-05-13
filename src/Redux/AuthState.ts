import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

//1. companies state-the data we need at global application level
export class AuthState {
    public user: UserModel = {
        token: "",
        email: "",
        clientType: ""
    };
    
    public isRememberMe: boolean = true
    public constructor() {
        try {
            const tokenFromLocalStore = JSON.parse(localStorage.getItem("token") || "");

            if (tokenFromLocalStore) {
                this.user.token = tokenFromLocalStore;
                let decoded = jwtDecode<UserModel>(tokenFromLocalStore);
                this.user.email = decoded.email;
                this.user.clientType = decoded.clientType;
            }
        }
        catch (err) {
            console.log(err)
        }

        try {
            const tokenFromSesstion = JSON.parse(sessionStorage.getItem("token") || "");
            if (tokenFromSesstion) {
                console.log("I am here")
                this.user.token = tokenFromSesstion;
                let decoded = jwtDecode<UserModel>(tokenFromSesstion);
                this.user.email = decoded.email;
                this.user.clientType = decoded.clientType;
            }
        } catch (err) {
            console.log(err)
        }

    }
}

//2. Action Types - list of actions - enum
export enum AuthActionType {
    Login = "Login",
    Logout = "Logout",
    Remember = "Remember"
}

//3. Action -  an interface describing a single command
export interface AuthAction {
    type: AuthActionType;//action type
    payload?: any; //action data
}

//4. action creators - functions to create action objects
export function loginAction(token: string): AuthAction {
    return { type: AuthActionType.Login, payload: token };
}
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}

export function rememberAction(choice: boolean) {
    return { type: AuthActionType.Remember, payload: choice };

}

//5. reducer - a single function performing any of the above actions
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };//duplicate current state

    switch (action.type) {
        case AuthActionType.Login://here payload is all companies
            newState.user.token = action.payload;
            let decoded = jwtDecode<UserModel>(action.payload);
            newState.user.email = decoded.email;
            newState.user.clientType = decoded.clientType;
            if (newState.isRememberMe) {
                localStorage.setItem("token", JSON.stringify(action.payload))

            } else {
                sessionStorage.setItem("token", JSON.stringify(action.payload))

            }
            break;
        case AuthActionType.Logout://here payload is an id of company to delete
            newState.user = {
                token: "",
                email: "",
                clientType: ""
            };
            newState.isRememberMe = false;
            localStorage.removeItem("token")
            sessionStorage.removeItem("token")

            break;
        case AuthActionType.Remember:
            newState.isRememberMe = action.payload;
    }
    return newState;


}
