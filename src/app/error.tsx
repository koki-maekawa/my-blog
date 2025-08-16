"use client";

import {Button} from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
      <h2 className="text-2xl font-bold text-red-600">エラーが発生しました</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={() => reset()}>再試行</Button>
    </div>
  );
}
