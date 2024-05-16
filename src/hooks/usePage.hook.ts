import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const usePage = (route: string) => {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page");

  const handleChangePage = useCallback(
    (page: number) => {
      router.push(`/${route}?page=${page}`, { scroll: true });
    },
    [router]
  );

  return { page, handleChangePage };
};
