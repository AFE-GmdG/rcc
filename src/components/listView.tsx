import * as React from "react";

import {
	StyleFunction,
	WithTheme,
	withTheme,
	classNames,
	conditionalClassName
} from "../themes";

//#region Konstanten
const themedClasses: StyleFunction = theme => ({
	listView: {
		padding: 0,
		backgroundColor: theme.colors.backgroundColor,
		overflow: "hidden"
	},

	listViewItem: {

	},

	even: {
		backgroundColor: theme.colors.evenBackgroundColor
	},

	odd: {
		backgroundColor: theme.colors.oddBackgroundColor
	},
});
//#endregion

//#region Typen
type ListViewProps = {
	className?: string;
	data: any[];
};

type ThemedListViewProps = WithTheme<StyleFunction> & ListViewProps;
//#endregion

//#region Hooks
//#endregion

//#region ListView
export const ListView: React.FunctionComponent<ListViewProps> = withTheme(themedClasses)((props: ThemedListViewProps) => {
	const { classes, className, data } = props;

	const listViewItems = data.map((dataItem, index) => {
		return (
			<div key={ dataItem.label } className={ classNames(classes.listViewItem, index % 2 === 0 ? classes.even : classes.odd) }>
				{ dataItem.label }
			</div>);
	});

	return (
		<div className={ classNames(classes.listView, className) }>
			{ listViewItems }
		</div>);
});
//#endregion
