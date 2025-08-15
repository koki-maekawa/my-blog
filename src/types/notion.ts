import {ExtendedRecordMap} from "notion-types";

export type NotionPageInfo = {
  id: string;
  emojiIcon: string;
  title: string;
  tags: string[];
  updatedAt: string;
};

export type NotionPostPageProps = {notionPost: ExtendedRecordMap};
export type NotionPostCardProps = {notionPost: NotionPageInfo};
