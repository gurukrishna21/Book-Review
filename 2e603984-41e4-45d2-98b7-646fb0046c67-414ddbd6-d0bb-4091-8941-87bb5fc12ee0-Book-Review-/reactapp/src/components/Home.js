import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'70vh', padding:24}}>
      <div style={{textAlign:'center', maxWidth:720}}>
        <h1 style={{fontSize:36, marginBottom:8}}>Book Review App (UI)</h1>
        <p style={{fontSize:16, color:'#444', marginBottom:20}}>A simple interface to browse books and share reviews. Sign up to get started.</p>

        <div style={{display:'flex', justifyContent:'center', gap:12}}>
          <Link to="/signup" style={{background:'#0a58ca', color:'white', padding:'10px 16px', borderRadius:8, textDecoration:'none', fontWeight:600}}>Sign up</Link>
          <Link to="/login" style={{background:'#fff', color:'#0a58ca', padding:'10px 16px', borderRadius:8, textDecoration:'none', border:'1px solid #0a58ca'}}>Login</Link>
        </div>

        <div style={{marginTop:28, color:'#666'}}>
          <div style={{marginBottom:8}}>Project: <strong>Book Review</strong></div>
          <div>Built with React (frontend) and Spring Boot (backend).</div>
        </div>
      </div>
    </div>
  );
}
