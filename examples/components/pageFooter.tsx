import * as React from "react";

import {
	WithTheme,
	withTheme,
	StyleFunction,
	classNames,
	conditionalClassName
} from "../themes";

const themedClasses: StyleFunction = theme => ({
	pageFooter: {
		flex: "0 0 auto",
		position: "relative",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignContent: "stretch",
		margin: 0,
		padding: 0,
		listStyle: "none",
		backgroundColor: theme.colors.backgroundColor,
		boxShadow: theme.box.shadow,
		zIndex: 1
	},

	pageFooterItem: {
		margin: 0,
		padding: "0.15rem 0.4rem",
		lineHeight: "1.6rem",
		whiteSpace: "nowrap",

		"&:first-child": {
			marginLeft: "0.4rem"
		},

		"&:last-child": {
			marginRight: "0.4rem"
		}
	},

	right: {
		marginLeft: "auto"
	},

	hoverable: {
		"&:hover": {
			backgroundColor: theme.colors.hoverBackgroundColor
		}
	}
});

type PageFooterProps = WithTheme<typeof themedClasses>;

export const PageFooter: React.FunctionComponent = withTheme(themedClasses)(props => {
	const { classes } = props;

	return (
		<ul className={ classes.pageFooter }>
			<li className={ classes.pageFooterItem }>{ `React Control Collection - @afe-gmdg/rcc@${process.env.VERSION}` }</li>
		</ul>);
});
