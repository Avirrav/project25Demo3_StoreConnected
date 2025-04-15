import { Size } from '@/types';
import qs from 'query-string';

const getSizes = async (storeUrl?: string): Promise<Size[]> => {
 try {
    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      return [];
    }
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/sizes`;
    
    const url = qs.stringifyUrl({
      url: URL,
    });
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return [];
  }
};

export default getSizes;