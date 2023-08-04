"use client"
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivateLayout({ children }) {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false); 

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login"); 
      } else {
        const { role } = session.user;
        if (role === "admin") {
          router.push("/admin/dashboard");
        }
      }

      setSessionChecked(true); 
    };
    checkSession();
  }, []);

  if (!sessionChecked) {
    // Render null or a loading indicator while session check is in progress
    return null;
  }

  return <>{children}</>;
}
