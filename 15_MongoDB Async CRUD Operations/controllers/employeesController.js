const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

const creatNewEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ id: req.body.id }).exec();
        if (!employee) {
            return res.status(204).json({ "message": `Employee ID ${req.body.id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);

}

const deleteEmolpoyee = async (req,res)=>{
    if (!req.body?.id) {
        return res.status(400).json({ "message": "Employee ID required." });
    }
    const employee = await Employee.findOne({ id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const result = await Employee.deleteOne({ id: req.body.id });
    res.json(result);
}

const getEmployee = async (req,res)=>{
    if (!req.params?.id) {
        return res.status(400).json({ "message": "Employee ID required." });
    }
    const employee = await Employee.findOne({ id: req.params.id }).exec();
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    creatNewEmployee,
    updateEmployee,
    deleteEmolpoyee,
    getEmployee
}