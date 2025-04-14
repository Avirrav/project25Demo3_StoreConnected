import { Size } from '@/types';

const getSizes = async (storeUrl?: string): Promise<Size[]> => {
  const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/sizes`;
  const res = await fetch(URL);
  return res.json();
};

export default getSizes;