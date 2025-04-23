import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Heart, Users, Settings, LogOut } from "lucide-react";
import "./dashboard.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">CatMoggy Admin</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <LayoutDashboard className="h-5 w-5 text-gray-500" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/donations"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Heart className="h-5 w-5 text-gray-500" />
                Donations
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/users"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Users className="h-5 w-5 text-gray-500" />
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Settings className="h-5 w-5 text-gray-500" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-6">{children}</main>
    </div>
  );
}
