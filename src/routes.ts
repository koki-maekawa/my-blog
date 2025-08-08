/**
 * ページルート
 */
export enum PageRoute {
  HOME = "/",
  NOTIONS = "/notions",
  NOTION_DETAIL = "/notions/[id]",
  NOTIONS_TAG = "/notions/tags/[tag]",
  TIL = "/TIL/[year]/[month]/[day]",
}

/**
 * ページ名
 */
export const pageNameMap = {
  [PageRoute.HOME]: "ホーム",
  [PageRoute.NOTIONS]: "学習メモ一覧",
  [PageRoute.NOTION_DETAIL]: "学習メモ詳細",
  [PageRoute.NOTIONS_TAG]: "タグ一覧",
  [PageRoute.TIL]: "日報",
};
