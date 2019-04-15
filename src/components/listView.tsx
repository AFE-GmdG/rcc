import * as React from "react";

import { StyleFunction, classNames, useTheme } from "../themes";

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
type PickType<T, K> = Pick<T, Exclude<{ [P in keyof T]: T[P] extends K ? P : undefined }[keyof T], undefined>>;

type ListViewProps<T> = {
	className?: string;
	itemClassName?: string;
	evenItemClassName?: string;
	oddItemClassName?: string;
	data: T[];
	keyProperty: keyof PickType<T, string | number>;
	valueProperty?: keyof T;
	itemTemplate?: React.JSXElementConstructor<ListViewItemProps<T>>;
	children?: React.ReactNode;
};

export type ListViewItemProps<T> = {
	className?: string;
	item: T,
	valueProperty: keyof T;
};

//#endregion

//#region ListView
export function ListView<T>(props: ListViewProps<T>): React.ReactElement {
	const { className, itemClassName, evenItemClassName, oddItemClassName, data, keyProperty } = props;
	const itemTemplate = props.itemTemplate || ListViewItemTemplate;
	const valueProperty = props.valueProperty || keyProperty;
	const classes = useTheme(themedClasses);

	const listViewItems = data.map((item, index) => {
		return React.createElement(itemTemplate, {
			className: classNames(itemClassName || classes.listViewItem, index% 2 === 0 ? evenItemClassName || classes.even : oddItemClassName || classes.odd),
			item,
			valueProperty,
			key: item[keyProperty] as any
		});
	});

	return (
		<div className={ classNames(classes.listView, className) }>
			{ listViewItems }
		</div>);
}
//#endregion

//#region ListViewItemTemplate
export function ListViewItemTemplate<T>(props: ListViewItemProps<T>): React.ReactElement {
	const { className, item, valueProperty } = props;

	return (
		<div className={ className }>
			{ item[valueProperty] }
		</div>);
}
//#endregion
