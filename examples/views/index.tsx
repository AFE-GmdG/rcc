import * as React from "react";

import { StyleFunction, useTheme } from "../themes";

export { ListViewApi } from "./listView";

//#region Konstanten
export const frameClasses: StyleFunction = theme => ({
	root: {
		position: "relative",
		flex: "1 0 0%",
		overflow: "auto",
		padding: "2rem"
	}
});
//#endregion

//#region Index
export const Index: React.FC = props => {
	const frame = useTheme(frameClasses);
	return (
		<div className={ frame.root }>
			<h1>React Control Collection</h1>
			<a href="https://github.com/afe-gmdg/rcc/issues" target="_blank"><img src="https://img.shields.io/github/issues/afe-gmdg/rcc.svg?style=flat" /></a>
			<a href="https://github.com/afe-gmdg/rcc/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/afe-gmdg/rcc.svg?style=flat" /></a>
			<a href="https://github.com/afe-gmdg/rcc" target="_blank"><img src="https://img.shields.io/github/package-json/v/afe-gmdg/rcc.svg?style=flat" /></a>
			<h2>Attention</h2>
			<p>The current version is not finished yet. The API is still being changed.</p>
		</div>);
};
//#endregion
