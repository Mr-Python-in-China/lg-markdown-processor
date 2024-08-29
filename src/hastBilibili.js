//@ts-check
import { visit } from "unist-util-visit";
import parsePath from "parse-path";

export default function hastBilibili() {
  return (/** @type {import('hast').Root} */ tree) =>
    visit(tree, "element", function (element) {
      if (element.tagName !== "img" || !element.properties) return;
      const src = element.properties.src;
      if (typeof src !== "string") return;
      if (!src.startsWith("bilibili:")) return;
      const parsedUrl = parsePath(src);
      if (/** @type {string} */ (parsedUrl.protocol) !== "bilibili") return;
      const query = parsedUrl.query;
      const r = {
        danmaku: "0",
        autoplay: "0",
        playlist: "0",
        high_quality: "1",
      };
      const pathname = parsedUrl.pathname;
      const match = pathname.match(/^(av)?(\d+)$/);
      if (match) r.aid = match[2];
      else if (pathname.toLowerCase().startsWith("bv")) r.bvid = pathname;
      else r.bvid = "bv" + pathname;

      const page = Number(query.t || "");
      if (page) r.page = String(page);

      element.tagName = "div";
      element.properties.style = "position: relative; padding-bottom: 62.5%";

      element.children = [
        {
          type: "element",
          tagName: "iframe",
          properties: {
            src:
              "https://player.bilibili.com/player.html?" +
              Object.entries(r)
                .filter(([_, value]) => value !== undefined)
                .map(
                  ([key, value]) =>
                    `${encodeURIComponent(String(key))}=${encodeURIComponent(
                      String(value)
                    )}`
                )
                .join("&"),
            scrolling: "no",
            border: 0,
            frameborder: "no",
            framespacing: 0,
            allowfullscreen: true,
            style:
              "position: absolute; top: 0; left: 0; width: 100%; height: 100%;",
          },
          children: [],
        },
      ];
    });
}
