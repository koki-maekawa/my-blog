# 一括実行スクリプト
#!/bin/bash

echo "TILコンポーネント完全削除開始..."

# サーバー停止
pkill -f "next dev" 2>/dev/null || true

# ファイル削除
rm -f src/components/TIL/DaySection.tsx
rm -f src/components/TIL/MonthSection.tsx
rm -f src/components/TIL/YearSection.tsx  
rm -f src/components/TIL/TILsidebar.tsx

# Git削除
git rm src/components/TIL/DaySection.tsx 2>/dev/null || true
git rm src/components/TIL/MonthSection.tsx 2>/dev/null || true
git rm src/components/TIL/YearSection.tsx 2>/dev/null || true
git rm src/components/TIL/TILsidebar.tsx 2>/dev/null || true

# キャッシュクリア
rm -rf .next
rm -rf node_modules/.cache

# コミット
git add -A
git commit -m "Permanently remove TIL components from old location"

echo "完了。VSCodeを再起動してからnpm run devを実行してください。"