import {notionHqClient, notionClient} from "@/lib/notion";
import {type NotionPost, type NotionPostInfo} from "./../types/notionPost";
import {type ExtendedRecordMap} from "notion-types";
import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

export async function getNotionPosts(): Promise<NotionPost[]> {
  const response = await notionHqClient.databases.query({
    database_id: process.env.DATABASE_ID!,
    filter: {
      property: "isPublished",
      checkbox: {equals: true},
    },
    sorts: [
      {
        //createdateカラムの値で降順に並べる
        property: "updatedAt",
        direction: "descending",
      },
    ],
  });
  const posts = response.results as PageObjectResponse[];
  const postsProperties = posts.map((post) => {
    // レコードidの取り出し
    const id = post.id;

    // emojiIconプロパティの取り出し（型ガード付き）
    const icon = post.icon;
    const emojiIcon = icon?.type === "emoji" ? icon?.emoji || "😄" : "😄";

    // titleプロパティの取り出し（型ガード付き）
    const titleProperty = post.properties.title;
    const title =
      titleProperty?.type === "title"
        ? titleProperty.title[0]?.plain_text || "タイトルなし"
        : "タイトルなし";

    // tagsプロパティの取り出し（型ガード付き）
    const tagsProperty = post.properties.tags; // 'types'ではなく'tags'に修正
    const tags =
      tagsProperty?.type === "multi_select"
        ? tagsProperty.multi_select.map((item) => item.name)
        : [];

    // updatedAtプロパティの取り出し（型ガード付き）
    const updatedAt = post.last_edited_time;

    // プロパティをまとめたオブジェクトを返す
    return {id, emojiIcon, title, tags, updatedAt};
  });
  return postsProperties;
}

export async function getNotionPost(
  pageId: string
): Promise<ExtendedRecordMap> {
  const recordMap = await notionClient.getPage(pageId);
  return recordMap;
}

export async function getNotionPostInfo(
  pageId: string
): Promise<NotionPostInfo> {
  const response = (await notionHqClient.pages.retrieve({
    page_id: pageId,
  })) as PageObjectResponse;
  const pageInfo = response.properties;

  // emojiIconプロパティの取り出し（型ガード付き）
  const icon = response.icon;
  const emojiIcon = icon?.type === "emoji" ? icon?.emoji || "😄" : "😄";

  // titleプロパティの取り出し（型ガード付き）
  const titleProperty = pageInfo.title;
  const title =
    titleProperty?.type === "title"
      ? titleProperty.title[0]?.plain_text || "タイトルなし"
      : "タイトルなし";

  // tagsプロパティの取り出し（型ガード付き）
  const tagsProperty = pageInfo.tags; // 'types'ではなく'tags'に修正
  const tags =
    tagsProperty?.type === "multi_select"
      ? tagsProperty.multi_select.map((item) => item.name)
      : [];

  // updatedAtプロパティの取り出し（型ガード付き）
  const updatedAt = response.last_edited_time;

  return {title, emojiIcon, tags, updatedAt};
}

export async function searchNotionPosts(query: string): Promise<NotionPost[]> {
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

  const posts = response.results as PageObjectResponse[];
  const postsProperties = posts.map((post) => {
    // レコードidの取り出し
    const id = post.id;

    // emojiIconプロパティの取り出し（型ガード付き）
    const icon = post.icon;
    const emojiIcon = icon?.type === "emoji" ? icon?.emoji || "😄" : "😄";

    // titleプロパティの取り出し（型ガード付き）
    const titleProperty = post.properties.title;
    const title =
      titleProperty?.type === "title"
        ? titleProperty.title[0]?.plain_text || "タイトルなし"
        : "タイトルなし";

    // tagsプロパティの取り出し（型ガード付き）
    const tagsProperty = post.properties.tags; // 'types'ではなく'tags'に修正
    const tags =
      tagsProperty?.type === "multi_select"
        ? tagsProperty.multi_select.map((item) => item.name)
        : [];

    // updatedAtプロパティの取り出し（型ガード付き）
    const updatedAt = post.last_edited_time;

    // プロパティをまとめたオブジェクトを返す
    return {id, emojiIcon, title, tags, updatedAt};
  });

  return postsProperties;
}
