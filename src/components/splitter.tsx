import * as React from "react";

import { StyleFunction, classNames, conditionalClassName, useTheme } from "../themes";

//#region Konstanten
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
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
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

let cancelAnimationFrameHandle: number | undefined = undefined;
//#endregion

//#region Typen
type PanelDirection = "horizontal" | "vertical";

type SplitContainerProps = {
	className?: string;
	lengths?: number[];
};

type SplitPanelProps = {
	className: string;
	size: number;
	child: React.ReactNode;
};
//#endregion

//#region Hooks
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
//#endregion

//#region SplitContainer
const splitContainer = (panelDirection: PanelDirection): React.FC<SplitContainerProps> => props => {
	function onSplitterMouseDown(event: React.MouseEvent<HTMLDivElement>) {
		type ChildInfo = {
			element: HTMLDivElement;
			width: number;
			height: number;
		};

		const { currentTarget, clientX, clientY } = event;
		const { parentElement, previousElementSibling, nextElementSibling } = currentTarget;

		if (!parentElement || !previousElementSibling || !nextElementSibling) {
			return;
		}

		const children = parentElement.querySelectorAll<HTMLDivElement>(`:scope > .${classes.childContainer}`);
		const length = children.length;
		const childInfos: ChildInfo[] = [];
		let previousElementInfo: ChildInfo;
		let nextElementInfo: ChildInfo;
		for (let index = 0; index < length; ++index) {
			const child = children.item(index);
			const clientRect = child.getBoundingClientRect();
			childInfos.push({
				element: child,
				width: clientRect.width,
				height: clientRect.height
			});
			if (child === previousElementSibling) {
				previousElementInfo = childInfos[childInfos.length - 1];
			} else if (child === nextElementSibling) {
				nextElementInfo = childInfos[childInfos.length - 1];
			}
		}

		const onSplitterMouseMove = (event: MouseEvent) => {
			if (panelDirection === "horizontal") {
				const delta = event.clientX - clientX;
				previousElementInfo.element.style.flex = `${(previousElementInfo.width + delta).toFixed(3)} 0 0%`;
				nextElementInfo.element.style.flex = `${(nextElementInfo.width - delta).toFixed(3)} 0 0%`;
			} else {
				const delta = event.clientY - clientY;
				previousElementInfo.element.style.flex = `${(previousElementInfo.height + delta).toFixed(3)} 0 0%`;
				nextElementInfo.element.style.flex = `${(nextElementInfo.height - delta).toFixed(3)} 0 0%`;
			}
		};

		const onSplitterMouseUp = (event: MouseEvent) => {
			window.removeEventListener("mouseup", onSplitterMouseUp);
			window.removeEventListener("mousemove", onSplitterMouseMove);

			const newLengths: number[] = [];
			if (panelDirection === "horizontal") {
				const delta = event.clientX - clientX;
				childInfos.forEach(childInfo => {
					if (childInfo === previousElementInfo) {
						newLengths.push(previousElementInfo.width + delta);
					} else if (childInfo === nextElementInfo) {
						newLengths.push(nextElementInfo.width - delta);
					} else {
						newLengths.push(childInfo.width);
					}
				});
			} else {
				const delta = event.clientY - clientY;
				childInfos.forEach(childInfo => {
					if (childInfo === previousElementInfo) {
						newLengths.push(previousElementInfo.height + delta);
					} else if (childInfo === nextElementInfo) {
						newLengths.push(nextElementInfo.height - delta);
					} else {
						newLengths.push(childInfo.height);
					}
				});
			}
			setLengths(newLengths);
		};

		if (panelDirection === "horizontal") {
			childInfos.forEach(childInfo => {
				childInfo.element.style.flex = `${childInfo.width.toFixed(3)} 0 0%`;
			});
		} else {
			childInfos.forEach(childInfo => {
				childInfo.element.style.flex = `${childInfo.height.toFixed(3)} 0 0%`;
			});
		}

		window.addEventListener("mousemove", onSplitterMouseMove);
		window.addEventListener("mouseup", onSplitterMouseUp);

		event.stopPropagation();
	}

	const { children, className } = props;
	const classes = useTheme(themedClasses);
	const [lengths, setLengths] = useLengths(children, props.lengths);

	const panels: React.ReactNode = !children
		? null
		: Array.isArray(children)
			? children.reduce<React.ReactNodeArray>((acc, child, index) => {
				acc.push(<SplitPanel key={ `child-${index}` } className={ classes.childContainer } size={ lengths[index] } child={ child } />);
				if (index + 1 < children.length) {
					acc.push(<div key={ `splitter-${index}` }
						className={ classNames(classes.splitter,
							conditionalClassName(classes["splitter-h"], panelDirection === "horizontal"),
							conditionalClassName(classes["splitter-v"], panelDirection === "vertical")) }
						onMouseDownCapture={ onSplitterMouseDown }></div>);
				}
				return acc;
			}, [])
			: (<SplitPanel key={ `child-0` } className={ classes.childContainer } size={ lengths[0] } child={ children } />);

	return (
		<div className={ classNames(className, classes.splitterContainer, panelDirection === "horizontal" ? classes.row : classes.col) }>
			{ panels }
		</div>);
};

const SplitPanel: React.FC<SplitPanelProps> = props => {
	const { className, size, child } = props;

	React.useLayoutEffect(() => {
		// Debounce multiple resize events within the same AnimationFrame.
		if (cancelAnimationFrameHandle !== undefined) {
			window.cancelAnimationFrame(cancelAnimationFrameHandle);
		};
		cancelAnimationFrameHandle = window.requestAnimationFrame(() => {
			cancelAnimationFrameHandle = undefined;
			const resizeEvent = window.document.createEvent("UIEvent");
			resizeEvent.initUIEvent("resize", true, false, window, 0);
			window.dispatchEvent(resizeEvent);
		});
	}, [size]);

	return (
		<div className={ className } style={ { flex: `${size} 0 0%` } }>{ child }</div>);
};

export const HorizontalSplitContainer = splitContainer("horizontal");
export const VerticalSplitContainer = splitContainer("vertical");
//#endregion
