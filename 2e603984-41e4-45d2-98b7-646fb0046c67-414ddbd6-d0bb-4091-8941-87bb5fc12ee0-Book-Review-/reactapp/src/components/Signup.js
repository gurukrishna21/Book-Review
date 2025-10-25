import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password || !form.password2) {
      setError('Please fill all fields');
      return;
    }
    if (form.password !== form.password2) {
      setError('Passwords do not match');
      return;
    }
    // For now we don't call backend. Pretend signup succeeded and navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-card">
      <h2>Create account</h2>
      <form onSubmit={submit} className="auth-form">
        <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="Username" />
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" />
        <input type="password" value={form.password2} onChange={e=>setForm({...form, password2:e.target.value})} placeholder="Re-enter Password" />
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-footer">Already have account? <Link to="/login">Login</Link> • <Link to="/home">Home</Link></div>
    </div>
  );
}
