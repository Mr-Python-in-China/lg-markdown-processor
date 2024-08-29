// @ts-check
import rehypeStringify from "rehype-stringify";
import luoguProcessor from "lg-markdown-processor";
import "katex/dist/katex.css";

const processor = luoguProcessor().use(rehypeStringify).freeze();

const fileForm = document.getElementById("fileForm"),
  fileInput = /**@type {HTMLInputElement|null} */ (
    document.getElementById("fileInput")
  ),
  code = document.getElementById("code"),
  output = document.getElementById("output");

if (!fileForm || !fileInput || !code || !output)
  throw new Error("Missing elements");

fileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const s = await fetch(fileInput.value).then((x) => x.text());
  code.textContent = s;
  output.innerHTML = processor.processSync(s).toString();
});
