import "server-only";
import {Client, isFullPage} from "@notionhq/client";
import {NotionAPI} from "notion-client";
import {cache} from "react";
import {type NotionPageInfo} from "../types/notion";
import {type ExtendedRecordMap} from "notion-types";
import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

export const revalidate = 3600;

// 公式Notionクライアント
export const notionHqClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Notionページ用クライアント(react-notion-client)
export const notionClient = new NotionAPI();

// NotionAPIレスポンスからページ情報抽出
export function extractNotionPageInfo(post: PageObjectResponse) {
  const id = post.id;

  const icon = post.icon;
  const emojiIcon = icon?.type === "emoji" ? icon.emoji || "😄" : "😄";

  const titleProperty = post.properties.title;
  const title =
    titleProperty?.type === "title"
      ? titleProperty.title.map((t) => t.plain_text).join("") || "タイトルなし"
      : "タイトルなし";

  const tagsProperty = post.properties.tags;
  const tags =
    tagsProperty?.type === "multi_select"
      ? tagsProperty.multi_select.map((item) => item.name)
      : [];

  const updatedAt = post.last_edited_time;

  return {id, emojiIcon, title, tags, updatedAt};
}

// NotionDB内のページ情報取得
export const getNotionPagesInfo = cache(async (): Promise<NotionPageInfo[]> => {
  const response = await notionHqClient.databases.query({
    database_id: process.env.DATABASE_ID!,
    filter: {
      property: "isPublished",
      checkbox: {equals: true},
    },
    sorts: [
      {
        property: "updatedAt",
        direction: "descending",
      },
    ],
  });
  const fullPages = response.results.filter(isFullPage);
  return fullPages.map(extractNotionPageInfo);
});

// ページ内容取得
export const getNotionPage = cache(
  async (pageId: string): Promise<ExtendedRecordMap> => {
    const recordMap = await notionClient.getPage(pageId);
    return recordMap;
  }
);

// ページ情報取得
export const getNotionPageInfo = cache(
  async (pageId: string): Promise<NotionPageInfo> => {
    const cachedPosts = await getNotionPagesInfo();
    const cachedPost = cachedPosts.find((post) => post.id === pageId);
    if (!cachedPost) {
      throw new Error(`Post with ID ${pageId} not found in cached posts`);
    }
    return cachedPost;
  }
);

// ページ情報検索
export const searchNotionPagesInfo = cache(
  async (query: string): Promise<NotionPageInfo[]> => {
    const response = await notionHqClient.databases.query({
      database_id: process.env.DATABASE_ID!,
      filter: {
        and: [
          {
            property: "isPublished",
            checkbox: {equals: true},
          },
          {
            or: [
              {
                property: "title",
                title: {
                  contains: query,
                },
              },
              {
                property: "tags",
                multi_select: {
                  contains: query,
                },
              },
            ],
          },
        ],
      },
      sorts: [
        {
          property: "updatedAt",
          direction: "descending",
        },
      ],
    });
    const fullPages = response.results.filter(isFullPage);
    return fullPages.map(extractNotionPageInfo);
  }
);
