import React from 'react'

function PrintCard(vehicl, selectedOrderDetail, filledOrderDetail) {
    const vehicle = vehicl;
    const selectedOrderDetails = selectedOrderDetail;
    const filledOrderDetails = filledOrderDetail;
    const handlePrint = () => {
        const printWindow = window.open('_blank');
        printWindow.document.write(`
            <html>
<head>
    <title>Print</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid black; padding: 4px; }
        .small-cell { width: 20px; height: 10px; text-align: center; }
        .mid-cell { width: 100px; height: 10px; text-align: center; }
    </style>
</head>
<body onload="window.print()">

    <div style="display:flex; justify-content: space-between;">
        <div style="display:flex; align-items: center; gap: 10px;">
            <img src="https://i.ibb.co/WkKD8t6/eecr.png" style="width:48px"/>
            <div>
                <div style="font-size: 18px; font-weight: bold;">Excellence Electric Car Repair</div>
                <div style="text-align:start;">التميز لصيانة سيارات الكهرباء</div>
            </div>
        
        </div>
        
        <div>
            <div style="text-align:end; font-size: 14px;">Yajouz Street, Amman</div>
            <div style="text-align:end; font-size: 14px;">0798537170</div>
            <div style="text-align:end; font-size: 14px;">www.eecr.services</div>
        </div>
    </div>
    
    

    <div style="display: flex; justify-content: space-between; margin-top: 20px; margin-bottom: 10px;">
        <div>رقم الطلب: 589</div>
        <div>طلب اصلاح</div>
    </div>



    <table style="text-align: end;">
        <tbody style="text-align: center;">
            <tr>
                <td>${vehicle.vehicle.carType}</td>
                <td class="mid-cell">نوع السيارة</td>

                <td>${selectedOrderDetails.date}</td>
                <td class="mid-cell">تاريخ الطلب</td>
                
            </tr>
            <tr>
                
                
                <td>${vehicle.vehicle.carModel}</td>
                <td>موديل السيارة</td>
                
                <td>${selectedOrderDetails.time}</td>
                <td>وقت الطلب</td>
            </tr>

            <tr>


            </tr>
                
    
                
                <td>${vehicle.vehicle.plateNumber}</td>
                <td>رقم اللوحة</td>
                
                <td>${vehicle.owner.name}</td>
                <td>اسم العميل</td>
            </tr>

            <tr>
                <td>${vehicle.vehicle.engineNumber}</td>
                <td>رقم المحرك</td>

                <td>${vehicle.owner.nationalID}</td>
                <td>رقم الوطني</td>
            </tr>

            <tr>
                
    
                
                <td>${vehicle.vehicle.fuelType}</td>
                <td>نوع الوقود</td>
                
                <td>${vehicle.owner.gender}</td>
                <td>النوع</td>
            </tr>

            <tr>
                
    
                
                <td>${vehicle.vehicle.color}</td>
                <td>لون المركبة</td>
                
                <td>${vehicle.owner.phoneNumber}</td>
                <td>رقم الهاتف</td>
            </tr>

            <tr>
                <td>${vehicle.vehicle.year}</td>
                <td>سنة الصنع</td>

                <td>${vehicle.owner.name}</td>
                <td>موظف الاستقبال</td>

            </tr>
            <tr>
                
                <td colspan="3">${vehicle.vehicle.VIN}</td>
                <td>رقم الشاصي</td>
            </tr>
        </tbody>
    </table>
    
    <table>
        <thead>
            <tr>
                <th colspan="2">طلبات العميل</th>
            </tr>
        </thead>
        <tbody style="text-align: end;">
        ${filledOrderDetails.map((item, index) => (
            // تأكد من عرض خاصية معينة من الكائن item بدلاً من item مباشرة
            `<tr key="${index}">
                <td >${item.detail || item}</td> 
                <td class="small-cell">${index + 1}</td> 
            </tr>`
        )).join('')} 
        </tbody>
    </table>

    <div style="display: flex; text-align: end; margin-top: 15px;">
        <div style="width: 50%; text-align: end; align-items: center; justify-content: center; display: flex; flex-direction: column;">
            اضرار وخدوش المركبة
            <img src="https://i.ibb.co/XVHfsKB/2.jpg"/>
        </div>
        <div style="width: 50%; word-wrap: break-word;">
           : الملاحظات ________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
        </div>
    </div>
    <div style="text-align: end; margin-top: 25px; line-height: 1.8;">انا الموقع ادناه ____________________, اقر بموافقتي على تنفيذ أعمال الإصلاح والصيانة المطلوبة على مركبتي المذكورة أعلاه, وذلك بكامل قواي العقلية وبكل رضى وقبول. وأتعهد بدفع كافة التكاليف المتعلقة بهذه الأعمال عند الانتهاء منها.</div>
    <div style="display: flex; justify-content: space-between;  margin-top: 35px;">

        
        <div>____________________ :توقيع المدير الفني</div>
        <div>____________________ :توقيع العميل</div>
    </div>
    
</body>
</html>



        `);
        printWindow.document.close();
    };
  return (
    <div>
      {handlePrint()}
    </div>
  )
}

export default PrintCard
