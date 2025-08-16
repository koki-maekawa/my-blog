import {Loader2} from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <p className="text-muted-foreground">ページを読み込んでいます...</p>
    </div>
  );
}
