"use client"
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false); 

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login"); 
      } else {
        const { role } = session.user;
        if (role !== "admin") {
          router.push("/");
        }
      }

      setSessionChecked(true); 
    };
    checkSession();
  }, []);

  if (!sessionChecked) {
    return null;
  }

  return <>{children}</>;
}
