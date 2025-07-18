const express = require('express');
const router = express.Router();
const path = require('path');
const employeeConttroller = require('../../controllers/employeesController')
const rolesList = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeeConttroller.getAllEmployees)
    .post(verifyRoles(rolesList.Admin, rolesList.Editor), employeeConttroller.creatNewEmployee)
    .put(verifyRoles(rolesList.Admin, rolesList.Editor), employeeConttroller.updateEmployee)
    .delete(verifyRoles(rolesList.Admin), employeeConttroller.deleteEmolpoyee)
    

router.route('/:id')
    .get(employeeConttroller.getEmployee)

module.exports = router;