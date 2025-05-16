'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
const LogoutBtn = () => {
  return (
    <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
      <button
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full cursor-pointer"
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        <LogOut className="h-5 w-5 text-gray-500" />
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
