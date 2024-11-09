const clientModel = require("../models/clientModel");
const repairModel = require("../models/RepairModel");
const vehicleModel = require("../models/vehicleModel");
const invoiceModel = require("../models/invoiceSchema");


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

const createNewOrderAlreadyCar = async (req, res) => {
    try {
        const { vehicle , repairRequests} = req.body;

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/'); // استبدال "-" بـ "/"
        const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // الوقت بتنسيق 12 ساعة

        // إنشاء طلب إصلاح جديد
         const newRepairRequest = await repairModel.create({
            vehicle: vehicle,
            date: formattedDate, // استخدم التاريخ الحالي
            time: currentTime, // استخدم الوقت الحالي
            details: repairRequests.details,
            status: repairRequests.status,
        });

        // إضافة الطلب إلى قائمة طلبات الإصلاح في موديل المركبة
        await vehicleModel.findByIdAndUpdate(vehicle, {
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
                id : vehicle._id,
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
                id : owner._id,
                name: owner.name,
                nationalID: owner.nationalID,
                gender: owner.gender,
                phoneNumber: owner.phoneNumber,
            },
            repairRequests: repairRequests.map(request => ({
                id : request._id,
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

const getAllVehicle = async (req, res) => {
    try {
        // ابحث عن جميع المركبات مع معلومات المالك
        const vehicles = await vehicleModel.find().populate('owner').populate("repairRequests");
        
        // تجهيز البيانات للإرجاع
        const responseData = vehicles.map(vehicle => ({
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
                name: vehicle.owner.name,
                nationalID: vehicle.owner.nationalID,
                phoneNumber: vehicle.owner.phoneNumber,
                firstVisit: vehicle.owner.createdAt
            },
            totalRepairRequests: vehicle.repairRequests.length, 
        }));

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع المركبات", error: error.message });
    }
};


const getAllClients = async (req, res) => {
    try {
        // Fetch all clients from the database
        const clients = await clientModel.find();
        
        // Prepare the response data
        const responseData = clients.map(client => ({
            id : client._id,
            nationalID: client.nationalID,
            name: client.name,
            gender: client.gender,
            phoneNumber: client.phoneNumber,
            createdAt: client.createdAt,
        }));

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع العملاء", error: error.message });
    }
};

const getClientByNationalID = async(req,res)=>{
    const { nationalID } = req.params; // Extract national ID from parameters

    try {
        // Find the client using their national ID
        const client = await clientModel.findOne({ nationalID });

        if (!client) {
            return res.status(404).json({ message: "العميل غير موجود" });
        }
        
        // Prepare the response data
        const responseData = {
            id : client._id,
            nationalID: client.nationalID,
            name: client.name,
            gender: client.gender,
            phoneNumber: client.phoneNumber,
            createdAt: client.createdAt,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع بيانات العميل", error: error.message });
    }
}

const getClientByID = async(req,res)=>{
    const { id } = req.params; // Extract client ID from parameters

    try {
        // Find the client using their ID
        const client = await clientModel.findById(id);
        const vehicles = await vehicleModel.find({owner : id}).populate("repairRequests");
        if (!client) {
            return res.status(404).json({ message: "العميل غير موجود" });
        }

        // Prepare the response data
        const responseData = {
            nationalID: client.nationalID,
            name: client.name,
            gender: client.gender,
            phoneNumber: client.phoneNumber,
            createdAt: client.createdAt,
            vehicles : vehicles
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع بيانات العميل", error: error.message });
    }
}



const createInvoice = async (req, res) => {
    try {
        const { vehicleId, clientId, items } = req.body;

        // حسابالإجمالي
        const totalAmount = items.reduce((sum, item) => sum + item.cost, 0);
        const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '/');

        // إنشاء الفاتورة
        const newInvoice = await invoiceModel.create({
            vehicle: vehicleId,
            client: clientId,
            items,
            totalAmount,
            date: currentDate,
            isPaid: false
        });

        res.status(201).json({ message: "تم إنشاء الفاتورة بنجاح", invoice: newInvoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء إنشاء الفاتورة", error: error.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    const { invoiceId } = req.params;
    const { isPaid } = req.body; // استخرج حالة الدفع من الجسم

    try {
        const invoice = await invoiceModel.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ message: "الفاتورة غير موجودة" });
        }

        // تحديث حالة الدفع
        invoice.isPaid = isPaid; // true أو false حسب القيمة المرسلة
        await invoice.save(); // حفظ التغييرات

        res.status(200).json({ message: "تم تحديث حالة الدفع بنجاح", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء تحديث حالة الدفع", error: error.message });
    }
};


const getInvoiceByVehicleIdObject = async (req, res) => {
    const { vehicleId } = req.params; 

    try {
        const totalInvoicesCount = await invoiceModel.countDocuments();
        const invoices = await invoiceModel.find({ vehicle: vehicleId }).populate('client').populate('vehicle');

        if (invoices.length === 0) {
            return res.status(404).json({ message: "لا توجد فواتير للمركبة المحددة" });
        }

        const responseData = invoices.map(invoice => ({
            id: invoice._id,
            totalAmount: invoice.totalAmount,
            date: invoice.date,
            items: invoice.items,
            isPaid : invoice.isPaid,
            client: {
                id: invoice.client._id,
                name: invoice.client.name,
                nationalID: invoice.client.nationalID,
                phoneNumber: invoice.client.phoneNumber,
            },
            vehicle: {
                id: invoice.vehicle._id,
                VIN: invoice.vehicle.VIN,
                carModel: invoice.vehicle.carModel,
            }
        }));

        res.status(200).json({
            data : responseData,
            totalInvoicesCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع الفواتير", error: error.message });
    }
};


const deleteItemInOneInvoice = async (req, res) => {
    const { invoiceId, itemId } = req.params; // استخراج معرف الفاتورة ومعرف العنصر من المعلمات

    try {
        // البحث عن الفاتورة
        const invoice = await invoiceModel.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ message: "الفاتورة غير موجودة" });
        }

        // تصفية العنصر للحذف
        const updatedItems = invoice.items.filter(item => item.id !== itemId);

        // تحديث قائمة العناصر في الفاتورة
        invoice.items = updatedItems;
        
        // إذا كانت قائمة العناصر فارغة، احذف الفاتورة
        if (updatedItems.length === 0) {
            await invoiceModel.findByIdAndDelete(invoiceId); // حذف الفاتورة من قاعدة البيانات
            return res.status(200).json({ message: "تم حذف جميع العناصر، وتم حذف الفاتورة بنجاح." });
        }

        // إعادة حساب المبلغ الإجمالي
        invoice.totalAmount = updatedItems.reduce((sum, item) => sum + item.cost, 0); // إعادة حساب المبلغ الإجمالي

        await invoice.save(); // حفظ الفاتورة المحدثة

        res.status(200).json({ message: "تم حذف العنصر بنجاح", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء حذف العنصر", error: error.message });
    }
};

const addItemToInvoice = async (req, res) => {
    const { invoiceId, newItem } = req.body; // استخراج معرف الفاتورة والعنصر الجديد من الجسم

    try {
        // البحث عن الفاتورة باستخدام المعرف
        const invoice = await invoiceModel.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ message: "الفاتورة غير موجودة" });
        }

        // إضافة العنصر الجديد إلى قائمة العناصر
        invoice.items.push(newItem); // إضافة العنصر الجديد

        // إعادة حساب المبلغ الإجمالي
        invoice.totalAmount += newItem.cost; // تحديث المبلغ الإجمالي

        await invoice.save(); // حفظ الفاتورة المحدثة

        res.status(200).json({ message: "تم إضافة العنصر بنجاح", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء إضافة العنصر", error: error.message });
    }
};
module.exports = {
    createNewOrder,
    getDataVehicleByVIN,
    getAllVehicle,
    getAllClients,
    getClientByNationalID,
    getClientByID,
    createInvoice,
    getInvoiceByVehicleIdObject,
    deleteItemInOneInvoice,
    updatePaymentStatus,
    createNewOrderAlreadyCar,
    addItemToInvoice
}