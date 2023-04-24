export interface IUser {
_id: {
    type:string,
    required: true,
    unique: true
},
firstName:{type: string, requried: true},

}

export interface IUserRoles {
    _id: string,
    userId: string,
    roleId: string
}