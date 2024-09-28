const clientModel = require("../models/clientModel");
const repairModel = require("../models/RepairModel");
const vehicleModel = require("../models/vehicleModel");

const createNewOrder = async (req, res) => {
    try {
        const { clientData, vehicleData, repairRequests } = req.body;

        // إنشاء سجل العميل إذا لم يكن موجودًا
        let client = await clientModel.findOne({ nationalID: clientData.nationalID });

        if (!client) {
            client = await clientModel.create(clientData);
        }

        // تحقق من وجود المركبة
        let vehicle = await vehicleModel.findOne({ VIN: vehicleData.VIN });

        if (!vehicle) {
            vehicle = await vehicleModel.create({
                ...vehicleData,
                owner: client._id
            });
        }
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/'); // استبدال "-" بـ "/"
        const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // الوقت بتنسيق 12 ساعة

        // إنشاء طلب إصلاح جديد
         const newRepairRequest = await repairModel.create({
            vehicle: vehicle._id,
            date: formattedDate, // استخدم التاريخ الحالي
            time: currentTime, // استخدم الوقت الحالي
            details: repairRequests.details,
            status: repairRequests.status,
        });

        // إضافة الطلب إلى قائمة طلبات الإصلاح في موديل المركبة
        await vehicleModel.findByIdAndUpdate(vehicle._id, {
            $push: { repairRequests: newRepairRequest._id },
        });

        res.status(201).json({ message: "طلب الإصلاح تم إنشاؤه بنجاح", newRepairRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء إنشاء الطلب", error: error.message });
    }
};

const getDataVehicleByVIN = async(req, res) =>{
    const { vin } = req.params; // استخرج VIN من المعاملات

    try {
        // ابحث عن المركبة باستخدام VIN
        const vehicle = await vehicleModel.findOne({ VIN: vin }).populate('owner').populate('repairRequests');

        if (!vehicle) {
            return res.status(404).json({ message: "المركبة غير موجودة" });
        }

        // احصل على معلومات المالك
        const owner = vehicle.owner; // معلومات المالك

        // احصل على طلبات الإصلاح
        const repairRequests = vehicle.repairRequests; // معلومات طلبات الإصلاح

        // تجهيز البيانات للإرجاع
        const responseData = {
            vehicle: {
                carType: vehicle.carType,
                carModel: vehicle.carModel,
                engineNumber: vehicle.engineNumber,
                plateNumber: vehicle.plateNumber,
                fuelType: vehicle.fuelType,
                color: vehicle.color,
                year: vehicle.year,
                VIN: vehicle.VIN,
            },
            owner: {
                name: owner.name,
                nationalID: owner.nationalID,
                gender: owner.gender,
                phoneNumber: owner.phoneNumber,
            },
            repairRequests: repairRequests.map(request => ({
                details: request.details,
                date: request.date,
                time: request.time,
                status: request.status,
            })),
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع البيانات", error: error.message });
    }
}




module.exports = {
    createNewOrder,
    getDataVehicleByVIN
}