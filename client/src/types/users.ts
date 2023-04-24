export interface IUser {
_id: {
    type:string,
    required: true,
    unique: true
},
email: {
    type: string,
    required: true
},
displayName: StaticRangeInit,
firstName:{type: string, required: true},

}

export interface IUserRoles {
    _id: string,
    userId: string,
    roleId: string
}

export interface IUserData /** this is a model of the JSON object used by Exove */
        {
          id: string,
          firstName: string,
          surname: string,
          email: string,
          displayName: string,
          personal: {
            honorific: string,
            shortBirthDate: string,
            gender: string
          },
          about: {
            avatar: string,
            hobbies: string[]
          },
          work: {
            reportsTo: {
              id: string,
              firstName: string,
              surname: string,
              email: string
            },
            title: string,
            department: string,
            site: string,
            startDate: string
          }
       
} 