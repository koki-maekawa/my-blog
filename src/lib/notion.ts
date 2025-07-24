import {Client} from "@notionhq/client";
import {NotionAPI} from "notion-client";

export const notionHqClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const notionClient = new NotionAPI();
