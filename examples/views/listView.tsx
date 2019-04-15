import * as React from "react";

import { StyleFunction, useTheme } from "../themes";
import { frameClasses } from ".";

//#region Konstanten
const themedClasses: StyleFunction = theme => ({
	listView: {
		position: "relative",
		flex: "1 0 0%",
		overflow: "auto",
		padding: "2rem"
	}
});
//#endregion

//#region ListViewApi
export const ListViewApi: React.FC = props => {
	const frame = useTheme(frameClasses);
	const classes = useTheme(themedClasses);

	return (
		<div className={ frame.root }>
			<h1>ListView</h1>
			<h2>Api</h2>
		</div>);
};
//#endregion
