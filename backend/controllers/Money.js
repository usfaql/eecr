const obligationModel = require("../models/obligationModel");
const paymentModel = require("../models/paymentModel");

const addObligation = async (req, res) => {
    try {
        const obligation = await obligationModel.create(req.body);
        res.status(201).json({ message: "تم إضافة الالتزام بنجاح", obligation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "حدث خطأ أثناء إضافة الالتزام", error: error.message });
    }
};

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
    addPayment
}