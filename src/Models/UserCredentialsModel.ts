class UserCredentialsModel{
    constructor (
        public id: number,
        public email: string,
        public password: string,
        public clientType: string,
    ){}
}
export default UserCredentialsModel;

