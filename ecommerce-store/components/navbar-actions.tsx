"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {createCartStore} from "@/hooks/use-cart";
import Button from "@/components/ui/button";

interface NavActionProps {
  username?: string;
}

const NavbarActions : React.FC<NavActionProps> = ({
 username
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const useCart = createCartStore(username || "defaultUsername");
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const items = useCart.getState().getItems();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={() => router.push(`${username}/cart`)} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          {items.length}
        </span>
      </Button>
    </div>
  );
}
 
export default NavbarActions;