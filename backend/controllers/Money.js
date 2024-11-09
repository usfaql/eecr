const obligationModel = require("../models/obligationModel");


const addObligation = async (req, res) => {
    try {
        const obligation = await obligationModel.create(req.body);
        res.status(201).json({ message: "تم إضافة الالتزام بنجاح", obligation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء إضافة الالتزام", error: error.message });
    }
};

// استرجاع جميع الالتزامات
const getAllObligations = async (req, res) => {
    try {
        const obligations = await obligationModel.find();
        res.status(200).json(obligations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع الالتزامات", error: error.message });
    }
};

// استرجاع التزام بواسطة ID
const getObligationById = async (req, res) => {
    try {
        const obligation = await obligationModel.findById(req.params.id);
        if (obligation) {
            res.status(200).json(obligation);
        } else {
            res.status(404).json({ message: "التزام غير موجود" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع الالتزام", error: error.message });
    }
};

// تحديث التزام بواسطة ID
const updateObligationById = async (req, res) => {
    try {
        const obligation = await obligationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (obligation) {
            res.status(200).json({ message: "تم تحديث الالتزام بنجاح", obligation });
        } else {
            res.status(404).json({ message: "التزام غير موجود" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء تحديث الالتزام", error: error.message });
    }
};

// حذف التزام بواسطة ID
const deleteObligationById = async (req, res) => {
    try {
        const obligation = await obligationModel.findByIdAndDelete(req.params.id);
        if (obligation) {
            res.status(200).json({ message: "تم حذف الالتزام بنجاح" });
        } else {
            res.status(404).json({ message: "التزام غير موجود" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء حذف الالتزام", error: error.message });
    }
};

const addPaymentToObligation = async (req, res) => {
    const { id } = req.params;  // أخذ الـ ID من المعاملات
    const { amountPaid, periodMonths } = req.body;  // أخذ المبلغ المدفوع والفترة من الطلب
    console.log("amountPaid :", amountPaid, "periodMonths: ", typeof(periodMonths));
    
    try {
        // التحقق من صحة المبلغ المدفوع
        if (!amountPaid || amountPaid <= 0) {
            return res.status(400).json({ message: "المبلغ المدفوع غير صحيح" });
        }
    
        // التحقق من وجود الالتزام في قاعدة البيانات
        const obligation = await obligationModel.findById(id);
        if (!obligation) {
            return res.status(404).json({ message: "الالتزام غير موجود" });
        }
    
        // إذا كان periodMonths مطلوبًا، تحقق من أنه قيمة صحيحة
        if (!periodMonths || periodMonths <= 0) {
            return res.status(400).json({ message: "فترة الدفع غير صحيحة" });
        }
    
        // تسجيل الدفع في قاعدة البيانات
        const payment = { amount: amountPaid, paymentDate: new Date(), periodMonths };
        obligation.payments.push(payment);
    
        // حفظ التحديث في قاعدة البيانات
        await obligation.save();
    
        // إرسال الرد مع تفاصيل الدفع
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدفع", error: error.message });
    }
};

const paymentModel = require("../models/paymentModel");


const addPayment = async (req, res) => {
    const { type, amount } = req.body;

    try {
        // البحث عن الالتزام بناءً على نوع الدفع
        const obligation = await obligationModel.findOne({ type });

        if (!obligation) {
            return res.status(404).json({ message: "الالتزام غير موجود" });
        }

        const today = new Date();
        const dueDate = new Date(obligation.dueDate);

        // تحقق مما إذا كانت الدفعة مستحقة
        if (today < dueDate) {
            return res.status(400).json({ message: "الدفع غير مستحق حتى الآن" });
        }

        // إذا كانت الدفعة مستحقة، قم بتسجيل الدفع
        const payment = await paymentModel.create({ type, amount, dueDate });

        // إعادة تعيين تاريخ الاستحقاق
        const nextDueDate = new Date(dueDate);
        if (type === "rent") {
            nextDueDate.setMonth(nextDueDate.getMonth() + 3); // كل 3 شهور للإيجار
        } else if (type === "electricity") {
            nextDueDate.setMonth(nextDueDate.getMonth() + 1); // شهري
        } else if (type === "water") {
            nextDueDate.setDate(nextDueDate.getDate() + 7); // أسبوعي
        } else if (type === "tools") {
            nextDueDate.setDate(nextDueDate.getDate() + 7); // أسبوعي
        }

        // تحديث تاريخ الاستحقاق
        await obligationModel.findOneAndUpdate(
            { type },
            { dueDate: nextDueDate },
            { new: true }
        );

        res.status(201).json({ message: "تم تسجيل الدفعة بنجاح", payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدفعة", error: error.message });
    }
};


module.exports = {
    addObligation,
    getAllObligations,
    getObligationById,
    updateObligationById,
    deleteObligationById,
    addPayment,
    addPaymentToObligation
}