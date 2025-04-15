import { Category } from '@/types';
import qs from 'query-string';
const getCategory = async (id: string, storeUrl?: string): Promise<Category[]> => {
  try {
    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      return [];
    }
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/categories`;
    
    const url = qs.stringifyUrl({
      url: URL,
    });
    const res = await fetch(`${url}/${id}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return [];
  }
};

export default getCategory;