'use client';
import ProductList from '@/components/product-list'
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Container from '@/components/ui/container';
import { getSessionData } from '@/lib/utils';

export const revalidate = 0;

interface ProductPageProps {
 productId : string;
}

const ProductPageClient: React.FC<ProductPageProps> = async ({ 
  productId
 }) => {
  const store = getSessionData(); // Fetch store data from session storage
  const storeUrl = store?.apiUrl;
  const username = store?.username;
  const product = await getProduct(productId, storeUrl);
  const suggestedProducts = await getProducts({ 
    categoryId: product?.category?.id
  }, storeUrl);

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestedProducts} username={username} />
        </div>
      </Container>
    </div>  
  )
}

export default ProductPageClient;
