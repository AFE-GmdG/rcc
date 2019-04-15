import * as React from "react";

import { StyleFunction, classNames, useTheme } from "../themes";

const themedClasses: StyleFunction = theme => ({
	button: {
		margin: 0,
		padding: "0.5rem 1rem",
		color: theme.colors.color,
		backgroundColor: theme.colors.backgroundColor,
		border: "1px solid #000",

		"&:hover": {
			color: theme.colors.hoverColor,
			backgroundColor: theme.colors.hoverBackgroundColor
		}
	}
});

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = props => {
	const { className, children, ...buttonProps } = props;
	const classes = useTheme(themedClasses);
	const buttonClassNames = classNames(className, classes.button);
	return (<button className={ buttonClassNames } { ...buttonProps }>{ children }</button>);
};
