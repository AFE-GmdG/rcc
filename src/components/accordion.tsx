import * as React from "react";

import {
	WithTheme,
	withTheme,
	StyleFunction,
	classNames
} from "../themes";

const classes: StyleFunction = theme => ({
	accordion: {
		color: theme.colors.color,
		backgroundColor: "#222",
		border: "1px solid #ccc"
	}
});

type AccordionTabType = (props: WithTheme<typeof classes> & AccordionTabProps) => React.FunctionComponent<WithTheme<typeof classes> & AccordionTabProps>;

type AccordionTabProps = {
	header: string;
};

export const AccordionTab: React.FunctionComponent<AccordionTabProps> = withTheme(classes)((props: React.PropsWithChildren<WithTheme<typeof classes> & AccordionTabProps>) => (
	<div>
		{ props.header }
	</div>));

type AccordionProps = {
	children: React.ReactElement<AccordionTabProps, React.JSXElementConstructor<AccordionTabProps>>[] | React.ReactElement<AccordionTabProps, React.JSXElementConstructor<AccordionTabProps>> | null
};

export const Accordion: React.FunctionComponent<AccordionProps> = withTheme(classes)((props: WithTheme<typeof classes> & AccordionProps) => (
	<div className={ props.classes.accordion }>
		{ props.children }
	</div>));
