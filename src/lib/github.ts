import "server-only";
import {Octokit} from "@octokit/rest";
import type {GetResponseDataTypeFromEndpointMethod} from "@octokit/types";
import {cache} from "react";

export const revalidate = 3600;
const owner = "koki-maekawa";
const repo = "TIL";

// 公式GitHubクライアント
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// octokitレスポンスの型定義
type RepoContentData = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.repos.getContent
>;

// 判定関数
function isYearDir(data: RepoContentData) {
  if (!Array.isArray(data)) return [];
  return data.filter(
    (item) => item.type === "dir" && /^\d{4}$/.test(item.name)
  );
}

function isMonthDir(data: RepoContentData) {
  if (!Array.isArray(data)) return [];
  return data.filter(
    (item) => item.type === "dir" && /^\d{2}$/.test(item.name)
  );
}

function isDayFile(data: RepoContentData) {
  if (!Array.isArray(data)) return [];
  return data.filter(
    (item) => item.type === "file" && item.name.endsWith(".md")
  );
}

function isDayFileContent(data: RepoContentData) {
  if (Array.isArray(data)) return "";
  if (data.type === "file" && data.name.endsWith(".md") && "content" in data)
    return data;
}

// TILリポジトリから年度フォルダ名を取得
export const getTILYears = cache(async () => {
  const {data} = await octokit.repos.getContent({owner, repo, path: ""});

  const yearDirs = isYearDir(data);
  return yearDirs.map((yearDir) => ({name: yearDir.name}));
});

// TILリポジトリから月フォルダ名を取得
export const getTILMonthesInYear = cache(async (year: string) => {
  const {data} = await octokit.repos.getContent({owner, repo, path: year});

  const monthDirs = isMonthDir(data);
  return monthDirs.map((monthDir) => ({
    name: monthDir.name,
  }));
});

// TILリポジトリから日ファイル名を取得
export const getTILDaysInMonth = cache(async (year: string, month: string) => {
  const {data} = await octokit.repos.getContent({
    owner,
    repo,
    path: `${year}/${month}`,
  });

  const dayFiles = isDayFile(data);
  return dayFiles.map((dayFile) => ({
    name: dayFile.name.replace(".md", ""),
  }));
});

// TILリポジトリから日ファイル内容を取得
export const getTILDailyReport = cache(
  async (year: string, month: string, day: string) => {
    const {data} = await octokit.repos.getContent({
      owner,
      repo,
      path: `${year}/${month}/${day}.md`,
    });

    const dayFile = isDayFileContent(data);
    if (dayFile) {
      return Buffer.from(dayFile.content, "base64").toString("utf-8");
    }
  }
);
