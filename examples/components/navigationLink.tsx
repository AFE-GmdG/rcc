import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { StyleFunction, classNames, conditionalClassName, useTheme } from "../themes";

import { ListViewDataType } from "..";
import { ListViewItemProps } from "../components";

const navigationLinkClasses: StyleFunction = theme => ({
	active: {},

	navigationLink: {
		padding: "0.2rem 0.5rem",
		color: theme.colors.color,

		"&$active": {
			color: theme.colors.accentColor,
			textDecoration: "none",
			cursor: "pointer",

			"&:hover": {
				color: theme.colors.hoverColor,
				backgroundColor: theme.colors.hoverBackgroundColor,
				textDecoration: "underline"
			}
		}
	}
});

export const NavigationLink = withRouter((props: RouteComponentProps & ListViewItemProps<ListViewDataType>) => {
	const { className, item, history, location } = props;
	const classes = useTheme(navigationLinkClasses);

	return (
		<div className={ classNames(className, classes.navigationLink, conditionalClassName(classes.active, location.pathname !== item.link)) }
			onClick={ e => { location.pathname !== item.link && history.push(item.link); e.preventDefault(); } }>
			{ item.label }
		</div>);
});
