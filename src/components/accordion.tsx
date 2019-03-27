import * as React from "react";

import {
	WithTheme,
	withTheme,
	StyleFunction,
	classNames
} from "../themes";

const classes: StyleFunction = theme => ({
	accordion: {
		margin: 0
	}
});

type AccordionProps = {};
type ThemedAccordionProps = WithTheme<typeof classes> & AccordionProps;

type AccordionState = {
	selectedIndex: number | null;
};

const accordion = class extends React.Component<ThemedAccordionProps, AccordionState> {

	constructor(props: ThemedAccordionProps) {
		super(props);
		this.state = {
			selectedIndex: null
		};
	}


}
