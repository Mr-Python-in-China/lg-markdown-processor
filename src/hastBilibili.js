import { visit } from "unist-util-visit";
import parsePath from "parse-path";

export default function hastBilibili() {
  return (/** @type {import('hast').Root} */ tree) =>
    visit(tree, "element", function (e) {
      if ("img" !== e.tagName || !e.properties) return;
      const t = e.properties.src;
      if ("string" != typeof t) return;
      if (!t.startsWith("bilibili:")) return;
      const parsedPath = parsePath(t);
      if ("bilibili" !== parsedPath.protocol) return;
      const query = parsedPath.query;
      const args = {
          danmaku: "0",
          autoplay: "0",
          playlist: "0",
          high_quality: "1",
        },
        pathname = parsedPath.pathname;
      const aidMatch = pathname.match(/^(av)?(\d+)$/);
      let page, time;
      aidMatch
        ? (args.aid = aidMatch[2])
        : "bv" !== pathname.substring(0, 2).toLowerCase()
        ? (args.bvid = "BV" + pathname)
        : (args.bvid = pathname);
      (page = Number(query.page || "")) && (args.page = String(page));
      (time = Number(query.t || "")) && (args.t = String(time));
      (e.tagName = "div"),
        (e.properties.style = "position: relative; padding-bottom: 62.5%"),
        (e.children = [
          {
            type: "element",
            tagName: "iframe",
            properties: {
              src: "https://player.bilibili.com/player.html?".concat(
                Object.entries(args)
                  .filter((s) => s[1] !== undefined)
                  .map((e) =>
                    e
                      .map((e) => encodeURIComponent(String(e)))
                      .join("=")
                      .replace(/=$/, "")
                  )
                  .join("&")
              ),
              scrolling: "no",
              border: 0,
              frameborder: "no",
              framespacing: 0,
              allowfullscreen: !0,
              style:
                "position: absolute; top: 0; left: 0; width: 100%; height: 100%;",
            },
            children: [],
          },
        ]);
    });
}
