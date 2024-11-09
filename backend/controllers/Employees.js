const employeeModel = require("../models/employeesModel");

const addEmployee = async(req,res)=>{




    const {firstName, midName, lastName, imageEmployee, nationalID, imageNationalID, phoneNumber, dateOfBirth,
        gender, position, SalaryPerWeek
     } = req.body;

    if (!firstName || !midName || lastName || !imageEmployee || !nationalID || !imageNationalID || !phoneNumber || !dateOfBirth,
        !gender || !position || !SalaryPerWeek) {
        return res.status(400).json({ message: "يرجى إدخال جميع الحقول المطلوبة" });
    }

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
    
        // Check if the birth month hasn't occurred yet this year, or if it's the birth month but the birth day hasn't occurred yet
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age;
    }

    try {
        const age = calculateAge(dateOfBirth);
        const newEmployee = await employeeModel.create({
            firstName,
            midName,
            lastName,
            imageEmployee,
            nationalID,
            imageNationalID,
            phoneNumber,
            dateOfBirth,
            age,
            gender,
            position,
            SalaryPerWeek
        
        });

        // Respond with success
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

const updateEmployeeData = async (req, res) => {
    const { id } = req.params; // Get nationalID from the request parameters
    const {
        firstName,
        midName,
        lastName,
        imageEmployee,
        imageNationalID,
        phoneNumber,
        dateOfBirth,
        gender,
        position,
        SalaryPerWeek,
        Status,
    } = req.body; // Destructure fields from request body for updating
    
    if (!id) {
        return res.status(400).json({ message: "يرجى توفير الرقم الوطني" });
    }

    try {
        const employee = await employeeModel.findById(id); // Find the employee by nationalID
        if (!employee) {
            return res.status(404).json({ message: "الموظف غير موجود" });
        }

        // Update only fields that are provided in the request body
        if (firstName) employee.firstName = firstName;
        if (midName) employee.midName = midName;
        if (lastName) employee.lastName = lastName;
        if (imageEmployee) employee.imageEmployee = imageEmployee;
        if (imageNationalID) employee.imageNationalID = imageNationalID;
        if (phoneNumber) employee.phoneNumber = phoneNumber;
        if (dateOfBirth) employee.dateOfBirth = dateOfBirth;
        if (gender) employee.gender = gender;
        if (position) employee.position = position;
        if (SalaryPerWeek) employee.SalaryPerWeek = SalaryPerWeek;
        if (Status) employee.Status = Status;


        // Save the updated employee data
        await employee.save();
        res.status(200).json({ message: "تم تحديث بيانات الموظف بنجاح", employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء تحديث بيانات الموظف", error: error.message });
    }
};




module.exports = {
    addEmployee,
    getAllEmployee,
    getEmployeeByNationalID,
    updateEmployeeData
}