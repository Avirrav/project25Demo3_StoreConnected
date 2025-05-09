"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import {createCartStore} from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { getSessionData } from "@/lib/utils";

const Summary = () => {
  const searchParams = useSearchParams();
  const store = getSessionData();
  const useCart = createCartStore(store.username);
  const items = useCart.getState().getItems();
  const removeAll: () => void = useCart((state: { removeAll: () => void }) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  interface CartItem {
    id: string;
    price: string;
  }

  const totalPrice = items.reduce((total: number, item: CartItem) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    interface CheckoutResponse {
      data: {
      url: string;
      };
    }

    const response: CheckoutResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item: CartItem) => item.id)
    });

    window.location.href = response.data.url;
  }

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}
 
export default Summary;
