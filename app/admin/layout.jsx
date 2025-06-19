'use client';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Only show sidebar on protected routes
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
