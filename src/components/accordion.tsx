import * as React from "react";

import { StyleFunction, classNames, useTheme } from "../themes";

const themedClasses: StyleFunction = theme => ({
	accordion: {
		color: theme.colors.color,
		backgroundColor: "#222",
		border: "1px solid #ccc"
	}
});

type Obj<T> = { [key: string]: T };

type AccordionProps = {
	className?: string;
};

type AccordionTabProps = {
	header: string;
};

export const AccordionTab: React.FC<AccordionTabProps> = props => {
	return (
		<div>
			{ props.header }
		</div>)
};




type AccordionState = {
	expandedTab: Obj<number> | null;
};

export const Accordion = (class extends React.Component<AccordionProps, AccordionState> {
	constructor(props: AccordionProps) {
		super(props);

		this.state = {
			expandedTab: null
		};
	}

	static getDerivedStateFromProps(nextProps: Readonly<AccordionProps>, prevState: Readonly<AccordionProps>): Partial<AccordionProps> | null {
		return null;
	}

	render() {
		const { className } = this.props;
		const classes = useTheme(themedClasses);
		return (
			<div className={classNames(classes.accordion, className)}>
			</div>);
	}
});
