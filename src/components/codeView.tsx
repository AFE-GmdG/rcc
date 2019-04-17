import * as React from "react";

import { StyleFunction, classNames, useTheme } from "../themes";

//#region Konstanten
const themedClasses: StyleFunction = theme => ({
	codeView: {
		position: "relative"
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

	return (
		<pre className={ classNames(className, classes.codeView) } onClick={ initializeCodeView }>
			<code ref={ codeRef }>{ code }</code>
		</pre>);
};
//#endregion

//#region Hilfsfunktionen
const initializeCodeView = () => {
	import("./codeViewDynamicInit").then(e => {
		console.log();
	});
};
//#endregion
