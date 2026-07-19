import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Prediction() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/opportunities");
  }, []);
  return null;
}
