const express = require('express');
const { EmployeeModel } = require('../models/employee.model');
const { auth } = require('../middlewares/Auth.middleware');
const employeeRouter = express.Router();


employeeRouter.get('/employees', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;

        const skip = (page - 1) * limit;

        let filter = {};
        if (req.query.department) {
            filter.department = req.query.department;
        }

        let sort = {};
        if (req.query.sortBy === 'salary') {
            sort.salary = req.query.sortOrder === 'desc' ? -1 : 1;
        }

        const employees = await EmployeeModel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalCount = await EmployeeModel.countDocuments(filter);

        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            employees,
            totalPages,
            currentPage: page,
            totalCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
employeeRouter.get('/employees/departments', auth, async (req, res) => {
    try {
        const departments = await EmployeeModel.distinct('department');

        res.status(200).json({ departments });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});


employeeRouter.get('/employees/search', auth, async (req, res) => {
    try {
        const firstName = req.query.firstName;
        const employees = await EmployeeModel.find({ firstName: { $regex: new RegExp(firstName, 'i') } });
        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
employeeRouter.delete('/employee/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        await EmployeeModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ "msg": "deleted Successfully.." });
    } catch (error) {
        res.status(500).send({ "msg": "internal Server Error", error })
    }
})

employeeRouter.put('/employee/:id',auth, async (req, res) => {
    const id = req.params.id;
    try {
        const { firstname, lastname, email, department, salary } = req.body;
        const updateemployee = await EmployeeModel.findByIdAndUpdate(id, { firstname, lastname, email, department, salary }, { new: true });
        if (!updateemployee) {
            return res.status(404).send({ "msg": "employee not found!" })
        }
        res.status(204).send({ "msg": "updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})

module.exports = {employeeRouter};
