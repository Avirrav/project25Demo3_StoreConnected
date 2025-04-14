"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username.trim()}`);
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8">
        <h1 className="text-4xl font-bold text-center">Welcome to Store</h1>
        <p className="text-xl text-center text-neutral-500">Enter a store username to visit a specific store</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full max-w-md">
          <Input 
            placeholder="Enter store username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-center"
          />
          <Button type="submit" disabled={!username.trim()}>
            Visit Store
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-neutral-500 mb-2">or</p>
          <Button 
            variant="outline"
            onClick={() => router.push("/demo-store")}
          >
            Visit Demo Store
          </Button>
        </div>
      </div>
    </Container>
  );
}