import {ExtendedRecordMap} from "notion-types";

export type NotionPageInfo = {
  id: string;
  emojiIcon: string;
  title: string;
  tags: string[];
  updatedAt: string;
};

export type NotionPageProps = {notionPage: ExtendedRecordMap};
export type NotionPageInfoCardProps = {notionPageInfo: NotionPageInfo};
