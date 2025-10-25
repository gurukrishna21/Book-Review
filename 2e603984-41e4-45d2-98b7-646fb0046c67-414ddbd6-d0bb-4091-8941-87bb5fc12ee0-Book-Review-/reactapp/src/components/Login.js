import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({username:'', password:''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Please fill both fields');
      return;
    }
    // No backend yet - accept any credentials and navigate
    navigate('/dashboard');
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={submit}>
        <input placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div className="auth-footer">No account? <Link to="/signup">Sign Up</Link></div>
    </div>
  );
}
