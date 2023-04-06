const mongoose = require('mongoose');
const { Schema } = mongoose;
const LdapAuth = require('express-passport-ldap-mongoose')
/* app.use(express.json())
app.use(sessionMiddleWare)
LdapAuth.initialize(options, app, findUserFunc, upsertUserFunc, loginPath, logoutPath) */

/**
 * When search for a user by its username in LDAP, a usernameAttribute is needed. The User model in local MongoDB must have the same key as the value of usernameAttribute that maps to the LDAP attribute. In some cases, and in the example we are using uid. it is used to uniquely identify a user and equals to the user's login username.
 * 
 * 
 */
const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const database = 'exove';

mongoose.connect();


const employeeSchema = new mongoose.Schema(
    {
        id: String,
        firstName: String,
        surname: String,
        email: String,
        displayName: String,
        about: {
            avatar: String,
            hobbies: [String],
        },
        work: {
            reportsTo: {
                id: String,
                firstName: String,
                surname: String,
                email: String
            },
            title: String,
            department: String,
            site: String,
            startDate: String
        }

    }
)

const Employee = mongoose.model('Employee', employeeSchema);

