import * as React from "react";

import { StyleFunction, classNames, useTheme, conditionalClassName } from "../themes";

//#region Konstanten
const themedClasses: StyleFunction = theme => ({
	expanded: {},

	accordion: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		backgroundColor: theme.colors.backgroundColor,
		margin: "0 0 1px 0",
		overflow: "hidden"
	},

	accordionTab: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		fontSize: theme.fonts.fontSizeMedium,
		zIndex: 1,
		cursor: "pointer",
		flex: "0 0 auto",
		transition: "flex-grow 100ms ease",

		"&$expanded": {
			cursor: "default",
			flex: "1 0 0%"
		}
	},

	header: {
		flex: "0 0 auto"
	},

	content: {
		flex: "1 0 0%",
		maxHeight: 0,
		backgroundColor: theme.colors.backgroundColor,

		"&$expanded": {
			maxHeight: "unset",
			overflowY: "auto"
		}
	},

	accordionTabHeader: {
		padding: "0.2rem 0.5rem 0.1rem 0.5rem",
		color: theme.sectionHeader.color,
		backgroundColor: theme.sectionHeader.backgroundColor,
	}
});
//#endregion

//#region Typen
type AccordionProps = {
	className?: string;
	children?: React.ReactNode;
};

type AccordionTabProps = {
	template: React.ReactElement<AccordionTabTemplateProps>;
	children?: React.ReactNode;
	isOpen: boolean;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export type AccordionTabTemplateProps = {
	label: string;
	children?: React.ReactNode;
};
//#endregion

//#region Accordion
export const Accordion: React.FC<AccordionProps> = props => {
	const { className, children } = props;
	const classes = useTheme(themedClasses);
	const firstTabTemplate = children === null
		? null
		: (Array.isArray(children) ? children : [children])
			.find(isAccordionTabTemplate);
	const [openKey, setOpenKey] = React.useState<string>(firstTabTemplate && firstTabTemplate.props.label || "");

	const accordionTabs = children === null
		? null
		: (Array.isArray(children) ? children : [children])
			.filter(isAccordionTabTemplate)
			.map(child => {
				return <AccordionTab key={ child.props.label }
					isOpen={ child.props.label === openKey }
					template={ child }
					onClick={ e => {
						setOpenKey(child.props.label);
						e.preventDefault();
					} }>
					{ child.props.children }
				</AccordionTab>;
			});

	return (
		<div className={ classNames(className, classes.accordion) }>
			{ accordionTabs }
		</div>);
};
//#endregion

//#region AccordionTab
const AccordionTab: React.FC<AccordionTabProps> = props => {
	const { children, isOpen, template, onClick } = props;
	const classes = useTheme(themedClasses);

	return (
		<div className={ classNames(classes.accordionTab, conditionalClassName(classes.expanded, isOpen)) }>
			<div className={ classes.header } onClick={ onClick }>{ template }</div>
			<div className={ classNames(classes.content, conditionalClassName(classes.expanded, isOpen)) }>{ children }</div>
		</div>);
};
//#endregion

//#region AccordionTab Template
export const AccordionTabTemplate: React.FC<AccordionTabTemplateProps> = props => {
	const { label } = props;
	const classes = useTheme(themedClasses);

	return <div className={ classes.accordionTabHeader }>{ label }</div>;
};
//#endregion

//#region Hilfsfunktionen
function isAccordionTabTemplate(node: React.ReactNode): node is React.ReactElement<AccordionTabTemplateProps> {
	if (!!node && typeof node === "object") {
		const typeOfpropertyDescriptor = Object.getOwnPropertyDescriptor(node, "$$typeof");
		const propsPropertyDescriptor = Object.getOwnPropertyDescriptor(node, "props");
		return (typeOfpropertyDescriptor
			&& typeOfpropertyDescriptor.value === Symbol.for("react.element")
			&& propsPropertyDescriptor
			&& propsPropertyDescriptor.value
			&& propsPropertyDescriptor.value.label !== undefined
			|| false);
	}
	return false;
}
//#endregion

