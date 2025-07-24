import {ExtendedRecordMap} from "notion-types";

// NotionPost一覧ページで利用する型
export type NotionPost = {
  id: string;
  emojiIcon: string;
  title: string;
  tags: string[];
  updatedAt: string;
};

// NotionPost詳細ページで利用する型
export type NotionPostInfo = {
  emojiIcon: string;
  title: string;
  tags: string[];
  updatedAt: string;
};

export type NotionPostCardProps = {notionPost: NotionPost};

export type NotionPostDetailInfoProps = {notionPost: NotionPostInfo};

export type NotionPostPageProps = {notionPost: ExtendedRecordMap};
