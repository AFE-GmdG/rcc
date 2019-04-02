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

type Obj<T> = { [key: string]: T };

type AccordionTabProps = {
	header: string;
};

export const AccordionTab: React.FunctionComponent<AccordionTabProps> = withTheme(classes)((props: React.PropsWithChildren<WithTheme<typeof classes> & AccordionTabProps>) => (
	<div>
		{ props.header }
	</div>));




type ThemedAccordionProps = WithTheme<typeof classes> & AccordionProps;
type AccordionProps = {
	className?: string;
};

type AccordionState = {
	expandedTab: Obj<number> | null;
};

export const Accordion = withTheme(classes)(class extends React.Component<ThemedAccordionProps, AccordionState> {
	constructor(props: ThemedAccordionProps) {
		super(props);

		this.state = {
			expandedTab: null
		};
	}

	static getDerivedStateFromProps(nextProps: Readonly<ThemedAccordionProps>, prevState: Readonly<ThemedAccordionProps>): Partial<ThemedAccordionProps> | null {
		return null;
	}

	render() {
		const { classes, className } = this.props;
		return (
			<div className={classNames(classes.accordion, className)}>
			</div>);
	}
});
