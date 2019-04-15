import * as React from "react";

import { StyleFunction, useTheme } from "../themes";


//#region Konstanten
const themedClasses: StyleFunction = theme => ({
	index: {
		position: "relative",
		flex: "1 0 0%",
		overflow: "auto",
		padding: "1rem"
	}
});
//#endregion

export const Index: React.FC = props => {
	const classes = useTheme(themedClasses);
	return (
		<div className={ classes.index }>
		</div>);
};
