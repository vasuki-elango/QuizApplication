import React, { useState } from 'react'
import '../Style/passwordgen.css'
export const PasswordGener = () => {
    const [len,setlen]=useState(8);
    const [lower,setlower]=useState(true);
    const [upper,setupper]=useState(true);
    const [number,setnumber]=useState(true);
    const [symbols,setsymbols]=useState(true);
    const [pwd,setPwd]=useState("");

    const generate = ()=>{
        let charset="";
        if(upper) charset+="ABCDEFGHIJKLMNOPQRSTVWXYZ";
        if(lower) charset+="abcdefghijklmnopqrstuvwxyz";
        if(number) charset+="1234567890";
        if(symbols) charset+="!@#$%^&*()-_=+";
        let generatrpwd="";
        for(let i=0;i<len;i++){
            const randomind=Math.floor(Math.random()*charset.length);
            generatrpwd+=charset[randomind];
        }
        setPwd(generatrpwd);
    }
    const copypwd =()=>{
        navigator.clipboard.writeText(pwd);
        alert("Password Copied");
    }
  return (
    <>
    <div className="container">
        <h2 className='title'>Strong Password</h2>
        <div className='input-container'>
            <label htmlFor='pwdlen'> Password Length:</label>
            <input type="number" name="pwdlen" id="pwdlen" min={6} value={len} onChange={(e)=>{setlen(parseInt(e.target.value))}}/>
        </div>   
            <div className="checkbox-container">
                <div className="checkbox-group">
                    <input type="checkbox" name="upper" id="upper" checked={upper}
                    onChange={(e)=>setupper(e.target.checked)}/>
                    <label htmlFor="upper">Include Upper</label>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" name="lower" id="lower" checked={lower} 
                     onChange={(e)=>setlower(e.target.checked)}/>
                    <label htmlFor="lower">Include Lower</label>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" name="num" id="num" checked={number} 
                     onChange={(e)=>setnumber(e.target.checked)}/>
                    <label htmlFor="num">Include Number</label>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" name="symbols" id="symbols" checked={symbols}
                     onChange={(e)=>setsymbols(e.target.checked)} />
                    <label htmlFor="symbols">Include Symbols</label>
                </div>
            </div>
        <div>
            <button className='createBtn' onClick={generate}>Create Password</button>
        </div>
        <div className="output-container">
            <input type="text" readOnly value={pwd}/>
            <button className='copybtn' onClick={copypwd}>Copy</button>
        </div>
    </div>
    </>
  )
}
