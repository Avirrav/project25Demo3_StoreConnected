import { Category } from '@/types';

const getCategory = async (id: string, storeUrl?: string): Promise<Category> => {
  const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/categories`;
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};

export default getCategory;