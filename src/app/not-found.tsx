import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        ページが見つかりませんでした
      </p>
      <Button asChild className="mt-6">
        <Link href="/">ホームに戻る</Link>
      </Button>
    </div>
  );
}
