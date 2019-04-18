import * as React from "react";
// @ts-ignore:7016 -- no implicit any
import * as hljs from "highlight.js/lib/highlight";
// @ts-ignore:7016 -- no implicit any
import typescript from "highlight.js/lib/languages/typescript";
// import "file-loader?name=highlight.css!highlight.js/styles/monokai-sublime.css";
hljs.registerLanguage("typescript", typescript);
hljs.configure({
	tabReplace: "  ",
});
// @ts-ignore:7016 -- no implicit any
import css from "!!raw-loader!highlight.js/styles/monokai-sublime.css";

const style = document.createElement('style');
style.setAttribute("type", "text/css");
style.setAttribute("data-hljs", "");
style.textContent = css;
document.head.appendChild(style);

export function highlightBlock(ref: React.RefObject<HTMLElement>, language: string = "typescript") {
	if (ref.current) {
		ref.current.classList.contains(language) || ref.current.classList.add(language);
		hljs.highlightBlock(ref.current);
	}
};
