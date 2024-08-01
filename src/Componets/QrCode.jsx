import React, { useState } from 'react'
import '../Style/QrCode.css'

export const QrCode = () => {
  const [qrsize,setqrize] = useState(150);
  const [qrdata,setqrdata] = useState("https://vasuki-elango.github.io/My-Portfolio/");
  const [qrimg,setqrimg] = useState("");

  async function generateqr(){
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setqrimg(url);
    }
    catch(error){
      alert(error)
    }
  }
  function downloadqr(){
    fetch(qrimg)
      .then((response) => response.blob())
      .then((blob)=>{
        const link=document.createElement('a');
        link.href=URL.createObjectURL(blob);
        link.download='qrimg.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });  
  }
  return (
    <>
      <div className="container">
        <h2>QrCode Generator</h2>
        <div className="input-container">
          <label htmlFor="size">Size:</label>
          <input type="number" name="size" id="" value={qrsize} onChange={(e)=>setqrize(e.target.value)}/>
          <label htmlFor="qrdata">Data:</label>
          <input type="text" name="qrdata" id="" value={qrdata} onChange={(e)=>setqrdata(e.target.value)}/>
        </div>
        <div className="btn-container">
          <button className='generate' onClick={generateqr}>Generate Qr</button>
          <button className='download' onClick={downloadqr}>Download Qr</button>
        </div>
        <div className="img-container">
          <img src={qrimg} alt="" />
        </div>
      </div>
    </>
  )
}
