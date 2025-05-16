import { signIn } from 'next-auth/react';
import axios from 'axios';

const adminLogin = async (formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const res = await signIn('credentials', {
    redirect: false,
    username: username,
    password: password,
  });

  if (res?.ok) {
    try {
      const { data: session } = await axios.get('/api/auth/session');
      if (session?.user?.role === 'admin') {
        return {
          success: true,
          user: {
            username: session.user.username,
            role: session.user.role,
          },
        };
      } else {
        return {
          success: false,
          error: 'Access denied.',
        };
      }
    } catch (error) {
      console.error('Internal server error : ', error);
    }
  }
};
export default adminLogin;
