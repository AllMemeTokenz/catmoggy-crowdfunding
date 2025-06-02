import LoginCard from '@/components/layout/login-card';
import { getServerSession } from 'next-auth';
import AuthOptions from '@/utils/authOptions';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession(AuthOptions);
  if (session?.user?.role === 'admin') {
    redirect('/dashboardzzz');
  }
  return <LoginCard />;
};
export default LoginPage;
