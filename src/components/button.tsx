import * as React from "react";

import {
	WithTheme,
	withTheme,
	StyleFunction,
	classNames
} from "../themes";

const classes: StyleFunction = theme => ({
	button: {
		margin: 0,
		padding: "0.5rem 1rem",
		color: theme.colors.color,
		backgroundColor: theme.colors.buttonColor,
		border: "1px solid #000",

		"&:hover": {
			color: theme.colors.hoverColor,
			backgroundColor: theme.colors.hoverButtonColor
		}
	}
});

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ThemedButtonProps = WithTheme<typeof classes> & ButtonProps;


const button: React.SFC<ThemedButtonProps> = props => {
	const { classes, className, children, ...buttonProps } = props;
	const buttonClassNames = classNames(className, classes.button);
	return (<button className={ buttonClassNames } { ...buttonProps }>{ children }</button>);
};

export const Button: React.FunctionComponent<ButtonProps> = withTheme(classes)(button);
