import LoginCard from '@/components/layout/login-card';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'admin') {
    redirect('/dashboardzzz');
  }
  return <LoginCard />;
};
export default LoginPage;
