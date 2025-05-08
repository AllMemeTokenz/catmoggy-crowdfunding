'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';

interface AdminLoginBtnProps {
  username: string;
  password: string;
}

const AdminLoginBtn = ({ username, password }: AdminLoginBtnProps) => {
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    });
    if (res?.ok) {
      try {
        const { data: session } = await axios.get('/api/auth/session');
        if (session?.user?.role === 'admin') {
          router.push('/dashboardzzz');
        } else {
          console.error('Access denied.');
        }
      } catch (error) {
        console.error('Session check error : ', error);
      }
    }
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default AdminLoginBtn;
