'use client';

import AdminLoginBtn from '@/components/ui/adminLoginBtn';
import { useState } from 'react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <h1>Admin Login</h1>
      <label className="">username</label>
      <br />
      <input name="username" placeholder="input username here..." onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>password</label>
      <br />
      <input name="username" placeholder="input password here..." onChange={(e) => setPassword(e.target.value)} />
      <br />
      <AdminLoginBtn username={username} password={password} />
    </div>
  );
};
export default AdminLogin;
