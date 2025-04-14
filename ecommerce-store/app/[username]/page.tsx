import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductList from '@/components/product-list';
import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';

export const revalidate = 0;

interface StorePageProps {
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

const StorePage = async ({ params }: StorePageProps) => {
  const store = await getStore(params.username);
  
  if (!store) {
    return null;
  }

  const products = await getProducts({ isFeatured: true }, store.apiUrl);
  const billboard = await getBillboard(store.homeBillboardId, store.apiUrl);

  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList title='Featured Products' items={products} />
        </div>
      </div>
    </Container>
  );
};

export default StorePage;