import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar'

interface StoreLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

async function getStore(username: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/stores/username/${username}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function StoreLayout({ children, params }: StoreLayoutProps) {
  const store = await getStore(params.username);

  if (!store) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}