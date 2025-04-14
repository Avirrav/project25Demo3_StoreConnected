import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8">
        <h1 className="text-4xl font-bold text-center">Welcome to Store</h1>
        <p className="text-xl text-center text-neutral-500">Enter a store username to visit a specific store</p>
        <Link href="/demo-store">
          <Button>
            Visit Demo Store
          </Button>
        </Link>
      </div>
    </Container>
  );
}