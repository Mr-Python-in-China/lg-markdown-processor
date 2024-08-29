//@ts-check

import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeKatex from "rehype-katex";
import remarkMath from "./remarkMath.js";
import hastBilibili from "./hastBilibili.js";

export default function luoguProcessor(
  /** @type {{ remarkPlugins?: import('unified').PluggableList; rehypePlugins?: import('unified').PluggableList;}}*/ {
    remarkPlugins,
    rehypePlugins,
  } = {}
) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkPlugins || [])
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(hastBilibili)
    .use(rehypePlugins || []);
}
