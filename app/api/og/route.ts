import { NextRequest } from "next/server";

function extractMeta(html: string, property: string): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']+)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${property}["']`,
      "i"
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return null;
}

function extractTitle(html: string): string | null {
  const ogTitle = extractMeta(html, "og:title");
  if (ogTitle) return ogTitle;
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1]?.trim() || null;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json({ error: "url is required" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OneBiteLink/1.0; +https://github.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch URL" }, { status: 502 });
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return Response.json({
        title: url,
        description: null,
        image: null,
        url,
      });
    }

    const html = await res.text();

    return Response.json({
      title: extractTitle(html),
      description:
        extractMeta(html, "og:description") ??
        extractMeta(html, "description"),
      image: extractMeta(html, "og:image"),
      url: extractMeta(html, "og:url") ?? url,
    });
  } catch {
    return Response.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
}
