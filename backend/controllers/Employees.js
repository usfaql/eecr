const employeeModel = require("../models/employeesModel");

const addEmployee = async(req,res)=>{
    try {
        const newEmployee = await employeeModel.create(req.body);
        res.status(201).json({ message: "تم إضافة الموظف بنجاح", employee: newEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء إضافة الموظف", error: error.message });
    }
}

const getAllEmployee = async(req,res)=>{
    try {
        const employees = await employeeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع الموظفين", error: error.message });
    }
}

const getEmployeeByNationalID = async (req, res) => {
    const { nationalID } = req.params; // استخرج nationalID من المعاملات
    try {
        const employee = await employeeModel.findOne({ nationalID }); // ابحث باستخدام nationalID
        if (!employee) {
            return res.status(404).json({ message: "الموظف غير موجود" });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع بيانات الموظف", error: error.message });
    }
};



module.exports = {
    addEmployee,
    getAllEmployee,
    getEmployeeByNationalID
}