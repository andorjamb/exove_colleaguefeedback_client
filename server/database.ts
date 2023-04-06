const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

async function main() {
    await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');
}

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

