"use client"
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/admin");
      }
    };
    checkSession();
  }, []);

  return <>{children}</>;
}
