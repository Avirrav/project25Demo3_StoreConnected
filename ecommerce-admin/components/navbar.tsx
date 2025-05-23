import { UserButton, auth } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from './theme-toggle';
import { Sidebar } from './sidebar';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='fixed top-0 w-full z-50 bg-background border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='m-6 hidden sm:block' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;