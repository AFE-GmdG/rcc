import * as React from "react";

import { StyleFunction, classNames, useTheme } from "../themes";

//#region Konstanten
const themedClasses: StyleFunction = theme => ({
	codeView: {
		position: "relative",
		margin: "1em 0"
	},

	code: {
		padding: "0.5em",
		overflowY: "auto"
	}
});
//#endregion

//#region Typen
type CodeViewProps = {
	className?: string;
	code: string;
};
//#endregion

//#region CodeView
export const CodeView: React.FC<CodeViewProps> = props => {
	const { className, code } = props;
	const classes = useTheme(themedClasses);
	const codeRef = React.useRef<HTMLElement>(null);
	React.useEffect(() => {
		import("./codeViewDynamicInit").then(hljs => hljs.highlightBlock(codeRef));
	}, [code]);

	return (
		<pre className={ classNames(className, classes.codeView) }>
			<code className={ classes.code } ref={ codeRef }>{ code }</code>
		</pre>);
};
//#endregion
