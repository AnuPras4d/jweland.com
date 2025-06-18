'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin-auth');
    if (!isAuthenticated) {
      router.replace('/admin/login');
    } else {
      setChecked(true); // Allow rendering after auth check
    }
  }, []);

  if (!checked) return null;

  return children;
}
