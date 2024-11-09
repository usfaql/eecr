import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/NotFound', { replace: true });
  },[]);

  return (
      <div style={{ textAlign: 'center' , width:"100vw", height:"100vh", display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
      <h1>404 - الصفحة غير موجودة</h1>
      <p>عذرًا، لم يتم العثور على الصفحة التي تبحث عنها.</p>
      <a href="/">العودة إلى الصفحة الرئيسية</a>
    </div>
  )
}

export default NotFoundPage