import React from 'react'

function PrintInvoice(vehicl, invoiceCars, currentInvoices) {
    const vehicle = vehicl;
    const invoiceCar = invoiceCars;
    const currentInvoice = currentInvoices;

    const handlePrintInvoice = () => {
        const printWindow = window.open('_blank');
        printWindow.document.write(`
                    <html>
            <head>
                <title>Invoice</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td {text-align: end; padding :5px 10px; margin:10px}
                    .small-cell { width: 20px; height: 10px; }
                    .mid-cell { width: 100px; height: 10px; text-align: center; }
                    .total-cell { font-weight: bold; background-color: lightgray; }
                    tr {
                       position: relative; /* هذا ضروري لجعل العنصر الوهمي يتموضع بشكل صحيح */
                    }
                    .td::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0.5%; /* لتمركزه في المنتصف */
                        width: 99%; /* العرض سيكون 50% */
                        border-bottom: 1px solid #f9f9f9; /* تعيين الحدود السفلية */
                    }
                </style>
            </head>
            <body onload="window.print()">
                <!-- Header Section -->
                <div style="display:flex; justify-content: space-between;">
                    <div style="display: flex; justify-content: center; align-items: end; flex-direction: column; text-align: end;">
                        <div style="text-align:end; font-size: 14px;">فاتورة رقم : 554</div>
                        <div style="text-align:end; font-size: 14px;">تم انشاءها : 18/9/2024</div>
                        <div style="text-align:end; font-size: 14px;">تاريخ الاستحقاق : 18/9/2024</div>
                    </div>
                    <div style="display:flex; align-items: center; gap: 10px;">
                        
                        <div>
                            <div style="font-size: 18px; font-weight: bold; text-align: end;">EECR</div>
                           
                        </div>
                        <img src="https://i.ibb.co/WkKD8t6/eecr.png" style="width:48px"/>
                        
                    </div>

                </div>
        
                <!-- Invoice Info -->
                <div style="display: flex; justify-content: end; margin-top: 20px; margin-bottom: 10px;">

                    

                    <div style="display: flex; flex-direction: column;">
                        <div>
                            Excellence Electric Car Repair
                        </div>
                        <div>
                            <div style="text-align:end; font-size: 14px;">Yajouz Street, Amman</div>
                            <div style="text-align:end; font-size: 14px;">0798537170</div>
                            <div style="text-align:end; font-size: 14px;">www.eecr.services</div>
                        </div>
                    </div>
                </div>
        
                <!-- Vehicle and Customer Info -->
                <table style="text-align: end;">
                    <thead>
                        <tr style="background-color: #eeeeee;">
                            <td></td>
                            <td style="font-weight: bold;">معلومات المركبة</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td class="td" style="text-align:start;">${vehicle?.vehicle.carType}</td>
                            <td class="td" style="text-align:end;">نوع السيارة</td>
                            
                        </tr>
                        <tr >
                            <td class="td" style="text-align:start;">${vehicle?.vehicle.carModel}</td>
                            <td class="td" style="text-align:end;">موديل السيارة</td>
                        </tr>
                        <tr >
                            <td class="td" style="text-align:start;">${vehicle?.owner.name}</td>
                            <td class="td" style="text-align:end;">اسم العميل</td>
                        </tr>
                        <tr >
                            <td class="td" style="text-align:start;">${vehicle?.owner.nationalID}</td>
                            <td class="td" style="text-align:end;">الرقم الوطني</td>
                        </tr>
                        <tr >
                            <td class="td" style="text-align:start;">${vehicle?.vehicle.plateNumber}</td>
                            <td class="td" style="text-align:end;">رقم اللوحة</td>
                            
                        </tr>
                        <tr >
                            <td style="text-align:start;">${vehicle?.vehicle.engineNumber}</td>
                            <td style="text-align:end;">رقم المحرك</td>
                            
                        </tr>

                    </tbody>
                </table>
        
                <!-- Invoice Items Section -->
                <table>
                    <thead>
                        <tr style="background-color: #eeeeee;">
                            <th style="text-align: start;">السعر</th>
                            <th style="text-align: end;">تفاصيل الخدمة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoiceCar[currentInvoice]?.items.map((item, index) => `
                            <tr key="${index}" >
                                <td class="td" style="text-align: start;">${item.cost}</td> 
                                <td class="td" style="text-align: end;">${item.name || item}</td>
                            </tr>
                        `).join('')}

                        
                    </tbody>

                    <tfoot>
                        <tr>
                            <td style="text-align: start; font-weight: bold;">
                                 ${invoiceCar[currentInvoice]?.totalAmount} JOD <span style="font-weight: 100;">: السعر الاجمالي </span>
                            </td>
                            <td style="text-align: start;">
                                
                            </td>
                        </tr>
                    </tfoot>
                </table>
                
            </body>
            </html>

         `);
        printWindow.document.close();
    };

    return (
    <div>
      {handlePrintInvoice()}
    </div>
  )
}

export default PrintInvoice
