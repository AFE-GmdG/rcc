import * as React from "react";

import {
	StyleFunction,
	WithTheme,
	withTheme,
	classNames,
	conditionalClassName
} from "../themes";

const themedClasses: StyleFunction = theme => ({
	row: {},

	col: {},

	splitterContainer: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "stretch",

		"&$row": {
			flexDirection: "row"
		},

		"&$col": {
			flexDirection: "column"
		}
	},

	childContainer: {
		position: "relative",
		overflow: "hidden"
	},

	splitter: {
		flex: "0 0 0.5rem",
		backgroundColor: "transparent",
		zIndex: 1,
		transition: "background-color 300ms ease",

		"&:hover": {
			backgroundColor: theme.colors.selectedBackgroundColor
		}
	},

	"splitter-h": {
		margin: "0 -0.25rem",
		cursor: "ew-resize"
	},

	"splitter-v": {
		margin: "-0.25rem 0",
		cursor: "ns-resize"
	}
});

type PanelDirection = "horizontal" | "vertical";

type SplitContainerProps = {
	className?: string;
	lengths?: number[];
};

type ThemedSplitContainerProps = WithTheme<typeof themedClasses> & SplitContainerProps;

function useLengths(children: React.ReactNode, initialLengths?: number[]): [number[], React.Dispatch<React.SetStateAction<number[]>>] {
	const [lengths, setLengths] = React.useState<number[]>(initialLengths || []);

	if (!children) {
		return [[], setLengths];
	}

	if (!Array.isArray(children)) {
		return [lengths.length === 1 ? lengths : [1], setLengths];
	}

	if (lengths.length === 0) {
		return [Array.from({ length: children.length }, () => 1), setLengths];
	}

	if (lengths.length === children.length) {
		return [lengths, setLengths];
	}

	if (lengths.length > children.length) {
		return [lengths.slice(0, children.length), setLengths];
	}

	const sum = lengths.reduce((acc, cur) => acc + cur, 0);
	const overhead = (children.length * sum / lengths.length) - sum;
	const overheadCount = children.length - lengths.length;
	const overheadPerItem = overhead / overheadCount;
	return [lengths.concat(Array.from({ length: overheadCount }, () => overheadPerItem)), setLengths];
}

const splitContainer = (panelDirection: PanelDirection): React.FunctionComponent<ThemedSplitContainerProps> => props => {
	function onSplitterMouseDown(event: React.MouseEvent<HTMLDivElement>) {

		event.stopPropagation();
	}

	const { classes, children, className } = props;
	const [lengths, setLengths] = useLengths(children, props.lengths);

	const panels: React.ReactNode = !children
		? null
		: Array.isArray(children)
			? children.reduce<React.ReactNodeArray>((acc, child, index) => {
				acc.push(<div key={ `child-${index}` } className={ classes.childContainer } style={ { flex: `${lengths[index]} 0 0%` } } >{ child }</div>);
				if (index + 1 < children.length) {
					acc.push(<div key={ `splitter-${index}` }
						className={ classNames(classes.splitter,
							conditionalClassName(classes["splitter-h"], panelDirection === "horizontal"),
							conditionalClassName(classes["splitter-v"], panelDirection === "vertical")) }
						onMouseDownCapture={ onSplitterMouseDown }></div>);
				}
				return acc;
			}, [])
			: <div key={ `child-0` } className={ classes.childContainer } style={ { flex: `${lengths[0]} 0 0%` } } >{ children }</div>;

	return (
		<div className={ classNames(className, classes.splitterContainer, panelDirection === "horizontal" ? classes.row : classes.col) }>
			{ panels }
		</div>);
};

export const HorizontalSplitContainer = withTheme(themedClasses)(splitContainer("horizontal"));
export const VerticalSplitContainer = withTheme(themedClasses)(splitContainer("vertical"));
