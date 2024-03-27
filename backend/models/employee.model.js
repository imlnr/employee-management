const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true }
}, {
    versionKey: false
})

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = {
    EmployeeModel
}