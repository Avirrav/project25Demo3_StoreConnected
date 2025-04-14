import { Billboard } from '@/types';

const getBillboard = async (id: string, storeUrl?: string): Promise<Billboard> => {
  const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/billboards`;
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};

export default getBillboard;