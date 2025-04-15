'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getSizes from '@/actions/get-sizes';
import getColors from '@/actions/get-colors';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

import { Product, Size, Color, Category } from '@/types';
import { Loader } from '@/components/ui/loader';

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params, searchParams }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const store = JSON.parse(sessionStorage.getItem('store') || '{}');
        
        if (!store.apiUrl) {
          console.error('Store API URL not found');
          return;
        }

        const [productsRes, sizesRes, colorsRes, categoryRes] = await Promise.all([
          getProducts({ 
            categoryId: params.categoryId,
            colorId: searchParams.colorId,
            sizeId: searchParams.sizeId
          }, store.apiUrl),
          getSizes(store.apiUrl),
          getColors(store.apiUrl),
          getCategory(params.categoryId, store.apiUrl)
        ]);

        setProducts(productsRes);
        setSizes(sizesRes);
        setColors(colorsRes);
        setCategory(categoryRes[0] || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.categoryId, searchParams.colorId, searchParams.sizeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Container>
        {category?.billboard && (
          <Billboard data={category.billboard} />
        )}
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
