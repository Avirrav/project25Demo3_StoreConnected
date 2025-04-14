import { Color } from '@/types';

const getColors = async (storeUrl?: string): Promise<Color[]> => {
  const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/colors`;
  const res = await fetch(URL);
  return res.json();
};

export default getColors;