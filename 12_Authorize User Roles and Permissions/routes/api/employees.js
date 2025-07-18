const express = require('express');
const router = express.Router();
const path = require('path');
const employeeConttroller = require('../../controllers/employeesController')

router.route('/')
    .get(employeeConttroller.getAllEmployees)
    .post(employeeConttroller.creatNewEmployee)
    .put(employeeConttroller.updateEmployee)
    .delete(employeeConttroller.deleteEmolpoyee)
    

router.route('/:id')
    .get(employeeConttroller.getEmployee)

module.exports = router;