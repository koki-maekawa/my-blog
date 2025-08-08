import {Octokit} from "@octokit/rest";

// Octokitインスタンスを作成
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = "koki-maekawa";
const repo = "TIL";

export async function getTILYears() {
  try {
    const path = "";
    const rootDirResponse = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (!Array.isArray(rootDirResponse.data)) {
      throw new Error("TIL is not a directory");
    }

    const years = rootDirResponse.data
      .filter((item) => item.type === "dir" && /^\d{4}$/.test(item.name))
      .map((yearDir) => ({
        year: yearDir.name,
      }));

    return years;
  } catch (error) {
    console.error("Error fetching TIL years:", error);
    throw new Error("Failed to fetch TIL years");
  }
}

export async function getTILMonthesInYear(year: string) {
  try {
    const path = `${year}`;
    const yearDirResponse = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (!Array.isArray(yearDirResponse.data)) {
      throw new Error("TIL year directory is not a directory");
    }

    const months = yearDirResponse.data
      .filter((item) => item.type === "dir" && /^\d{2}$/.test(item.name))
      .map((monthDir) => ({
        month: monthDir.name,
      }));

    return months;
  } catch (error) {
    console.error(`Error fetching months for year ${year}:`, error);
    throw new Error(`Failed to fetch months for year ${year}`);
  }
}

export async function getTILDaysInMonth(year: string, month: string) {
  try {
    const path = `${year}/${month}`;
    const monthDirResponse = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (!Array.isArray(monthDirResponse.data)) {
      throw new Error("TIL is not a directory");
    }

    const files = monthDirResponse.data
      .filter((item) => item.type === "file" && item.name.endsWith(".md"))
      .map((file) => ({
        tilDate: file.name.replace(".md", ""),
      }));

    return files;
  } catch (error) {
    console.error(`Error fetching files for ${year}/${month}:`, error);
    throw new Error(`Failed to fetch files for ${year}/${month}`);
  }
}

export async function getTILDailyReport(
  year: string,
  month: string,
  day: string
) {
  try {
    const path = `${year}/${month}/${day}.md`;
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    // ディレクトリでないことを確認
    if (Array.isArray(response.data)) {
      throw new Error(`${path} はディレクトリです`);
    }

    // ファイルでcontentプロパティがあることを確認
    if (response.data.type !== "file" || !("content" in response.data)) {
      throw new Error(`${path} は有効なファイルではありません`);
    }

    // Base64デコード
    const content = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    return content;
  } catch (error) {
    console.error(
      `Error fetching daily report for ${year}/${month}/${day}:`,
      error
    );
    throw new Error(`Failed to fetch daily report for ${year}/${month}/${day}`);
  }
}
