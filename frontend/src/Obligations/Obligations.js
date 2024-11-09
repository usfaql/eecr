import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

function Obligations() {
    const [obligations, setObligations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/money/obligations")
            .then((result) => {
                setObligations(result.data);
                console.log("Obligations", result.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return ` ${hours}:${minutes} ${ampm} - ${day}/${month}/${year}`;
    }

    const handlePay = async (id, periodMonthss) => {
        const periodMonths = Number(periodMonthss);

        console.log(typeof(periodMonths));
        const amountPaid = prompt(`أدخل المبلغ المدفوع لهذه الفترة (${periodMonths}):`);
        if (!amountPaid) return;
    
        try {
            const response = await axios.post(`http://localhost:5000/money/obligations/${id}/payments`, {
                amountPaid,
                periodMonths
            });
            console.log("تم تسجيل الدفع:", response.data);
    
            // تحديث الالتزامات في الواجهة الأمامية بعد الدفع
            setObligations(prevObligations =>
                prevObligations.map(obligation =>
                    obligation._id === id
                        ? { ...obligation, payments: [...(obligation.payments || []), response.data] }
                        : obligation
                )
            );
        } catch (error) {
            console.error("حدث خطأ أثناء تسجيل الدفع:", error);
        }
    };


    return (
        <div className='container-veh'>
            <div className='employees-main'>
                <div className='title-employees'>
                    <div>Obligations</div>
                    <div><button>+</button></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#EDEDED", width: "100%" }}>
                    <div style={{ width: "5%" }}>Type</div>
                    <div style={{ width: "12%" }}>Required amount</div>
                    <div style={{ width: "9%" }}>Frequency</div>
                    <div style={{ width: "9%" }}>Due Date</div>
                    <div style={{ width: "9%" }}>Action</div>
                </div>

                {obligations.map((item) => (
                    <div key={item._id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ededed", alignItems: "center" }}>
                        <div style={{ width: "9%" }}>{item.type}</div>
                        <div style={{ width: "9%" }}>{item.amountPerPeriod}</div>
                        <div style={{ width: "9%" }}>{item.frequency}</div>
                        <div style={{ width: "9%" }}>{formatDate(item.dueDate)}</div>
                        <div style={{ width: "9%" }}>
                            <button onClick={() => handlePay(item._id, item.frequency)}>Pay</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Obligations;
