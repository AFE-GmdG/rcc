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
};

type ThemedListViewProps = WithTheme<StyleFunction> & ListViewProps;
//#endregion

//#region Hooks
function useData<TData>(initialData: TData) {
	const [data, setData] = React.useState<TData>(initialData);

}
//#endregion

//#region ListView
export const ListView = withTheme(themedClasses)((props: ThemedListViewProps) => {
	const { classes, className } = props;

	return (
		<div className={ classNames(classes.listView, className) }>
		</div>);
});
//#endregion


