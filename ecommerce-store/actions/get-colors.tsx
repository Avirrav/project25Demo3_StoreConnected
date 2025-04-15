import { Color } from '@/types';
import qs from 'query-string';

const getColors = async (storeUrl?: string): Promise<Color[]> => {
 try {
    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      return [];
    }
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/colors`;
    
    const url = qs.stringifyUrl({
      url: URL,
    });
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error('Error fetching colors:', error);
    return [];
  }
};

export default getColors;