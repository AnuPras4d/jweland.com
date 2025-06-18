'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
    });

    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 font-medium hover:underline mt-4"
    >
      Logout
    </button>
  );
}
