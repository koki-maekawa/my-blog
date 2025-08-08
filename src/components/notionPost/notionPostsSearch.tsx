"use client";
import {useState, useEffect} from "react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

export default function NotionPostsSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // デバウンス
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // debouncedSearchが更新されたら実行
  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/notions/?search=${debouncedSearch.trim()}`);
    } else {
      router.push("/notions/");
    }
  }, [debouncedSearch, router]);

  return (
    <Input
      placeholder="キーワードを入力..."
      className="w-full max-w-xl bg-white py-6 px-4 rounded-md"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
