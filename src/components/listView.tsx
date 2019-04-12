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
type ListViewProps<T> = {
	className?: string;
	data: T[];
	// keyName: T[keyof T] extends string | number ? keyof T : never;
	keyName: keyof T;
	children?: React.ReactNode;
};

type ThemedListViewProps<T> = WithTheme<StyleFunction> & ListViewProps<T>;
//#endregion

//#region Hooks
//#endregion

//#region ListView

export function ListView<T>(props: ListViewProps<T>): React.ReactElement {
	const { children } = props;
	const ThemedListView = withTheme(themedClasses)((props: ThemedListViewProps<T>) => {
		const { classes, className, data, keyName } = props;

		const listViewItems = data.map((dataItem, index) => {
			return (
				<div key={ (dataItem as any).label /*dataItem[keyName]*/ } className={ classNames(classes.listViewItem, index % 2 === 0 ? classes.even : classes.odd) }>
					{ dataItem[keyName] }
				</div>);
		});

		return (
			<div className={ classNames(classes.listView, className) }>
				{ listViewItems }
			</div>);
	});

	return React.createElement(ThemedListView, props, children);
	// return <ThemedListView { ...props } />;
}



export const Foo1Component: React.FunctionComponent = props => {
	return <div>Foo1</div>;
}

export function Foo2Component(props: {}): React.ReactElement | null {
	return <div>Foo2</div>;
}
//#endregion
