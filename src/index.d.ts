import { Processor, PluggableList } from "unified";
import { Root } from "mdast";
export default function luoguProcessor({
  remarkPlugins,
  rehypePlugins,
}?: {
  remarkPlugins?: PluggableList;
  rehypePlugins?: PluggableList;
}): Processor<Root, Root, Root, undefined, undefined>;
