import * as React from "react";
import * as ReactDOM from "react-dom";

import {
	StyleFunction,
	Theme,
	ThemeProvider,
	classNames,
	conditionalClassName,
	defaultTheme,
	withTheme
} from "./themes";
import {
	Accordion,
	AccordionTab,
	Button,
	// ListView,
	HorizontalSplitContainer,
	VerticalSplitContainer,
	PageFooter
} from "./components";

//#region Konstanten
const themedClasses: StyleFunction = theme => ({
	"@global": {
		html: {
			"--base-size": theme.baseSize,
			overflow: "hidden",
			height: "100%",
			margin: 0,
			padding: 0,
			color: theme.colors.color,
			backgroundColor: theme.colors.backgroundColor,
			userSelect: "none",
			fontSize: theme.fonts.fontSizeMedium
		},

		body: {
			position: "relative",
			display: "block",
			height: "100%",
			margin: 0,
			padding: 0
		},

		h1: {
			padding: "12px 0 6px 0",
			margin: 0,
			fontSize: theme.fonts.fontSizeXXLarge
		},

		h2: {
			padding: "12px 0 6px 0",
			margin: 0,
			fontSize: theme.fonts.fontSizeXLarge
		},

		div: {
			margin: 0,
			padding: 0
		},

		label: {
			cursor: "pointer",
			clear: "both"
		},

		a: {
			backgroundColor: "transparent",
			textDecoration: "none",

			"&:link": {
				color: theme.colors.accentColor
			},

			"&:visited": {
				color: theme.colors.accentColor
			},

			"&:active": {
				color: theme.colors.hoverColor,
				textDecoration: "underline"
			},

			"&:hover": {
				color: theme.colors.hoverColor,
				textDecoration: "underline"
			}
		},

		"#main": {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			alignContent: "stretch",
			overflow: "hidden",
			height: "100%"
		}
	},

	"@keyframes spinner": {
		"0%": {
			transform: "rotate(0deg)"
		},
		"100%": {
			transform: "rotate(360deg)"
		}
	},

	pageContent: {
		position: "relative",
		flex: "1 0 0%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignContent: "stretch",
		overflow: "hidden"
	},

	visible: {
	},

	spinnerContainer: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		color: theme.colors.accentColor,
		fontSize: theme.fonts.fontSizeXLarge,
		pointerEvents: "none",
		boxShadow: "inset 0 0 0 100vh rgba(0, 0, 0, 0)",
		transition: "box-shadow 200ms ease",
		zIndex: 10,

		"&$visible": {
			pointerEvents: "unset",
			boxShadow: "inset 0 0 0 100vh rgba(0, 0, 0, 0.5)"
		}
	},

	spinner: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: "3.5rem",
		height: "3.5rem",
		margin: "auto",
		borderRadius: "50%",
		border: "0.3rem solid transparent",
		borderBottomColor: theme.colors.accentBackgroundColor,
		animation: "spinner 1500ms linear infinite",

		"&::before, &::after": {
			content: "''",
			position: "absolute",
			top: "0.2rem",
			right: "0.2rem",
			bottom: "0.2rem",
			left: "0.2rem",
			borderRadius: "50%",
			border: "0.3rem solid transparent",
			borderBottomColor: theme.colors.accentBackgroundColor,
			animation: "spinner 3000ms linear infinite"
		},

		"&::after": {
			top: "0.7rem",
			right: "0.7rem",
			bottom: "0.7rem",
			left: "0.7rem",
			animation: "spinner 1500ms linear infinite"
		}
	},

	spinnerTitle: {
		display: "inline-block",
		position: "absolute",
		top: "calc(50% + 3.4rem)",
		right: 0,
		left: 0,
		width: "fit-content",
		margin: "auto",
		padding: "0.3rem 0.5rem",
		borderRadius: "0.2rem"
	},

	leftArea: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignContent: "stretch",
		boxSizing: "border-box",
		height: "100%",
		borderRight: `1px solid ${theme.colors.borderColor}`
	},

	centerArea: {
		height: "100%"
	},

	rightArea: {
		boxSizing: "border-box",
		height: "100%",
		borderLeft: `1px solid ${theme.colors.borderColor}`
	},

	topArea: {
		boxSizing: "border-box",
		height: "100%",
		borderBottom: `1px solid ${theme.colors.borderColor}`
	},

	bottomArea: {
		boxSizing: "border-box",
		height: "100%",
		borderTop: `1px solid ${theme.colors.borderColor}`
	},

	listView: {
		flex: "1 0 0%",
		margin: "2rem",
		borderRadius: "0.3rem",
		boxShadow: theme.box.shadow
	}
});

const listViewData: ListViewDataType[] = [
	{ label: "ListView", group: "ListView" },
	{ label: "ListViewItem", group: "ListView" },
	{ label: "TreeView", group: "TreeView" },
	{ label: "TreeViewItem", group: "TreeView" }
];
//#endregion

//#region Typen
type ListViewDataType = {
	label: string;
	group: string;
};

type BusyState = string | null;
let setBusyState: React.Dispatch<React.SetStateAction<BusyState>>;
//#endregion

//#region App
const App: React.FunctionComponent = withTheme(themedClasses)(props => {
	const [busyState, _setBusyState] = React.useState<BusyState>(null);
	setBusyState = _setBusyState;

	const { classes } = props;
	return (
		<>
			{/* PageTitle / BreadCrumb */ }
			<HorizontalSplitContainer className={ classes.pageContent } lengths={ [1, 3] }>
				<div className={ classes.leftArea }>
				</div>
				<div className={ classes.rightArea }></div>
			</HorizontalSplitContainer>
			<PageFooter />
			<div className={ classNames(classes.spinnerContainer, conditionalClassName(classes.visible, busyState !== null)) }>
				{ busyState !== null
					? <>
						<div className={ props.classes.spinner } />
						<div className={ props.classes.spinnerTitle }>{ busyState }</div>
					</>
					: null }
			</div>
		</>);
});
//#endregion

//#region ReactDom.render + AppInitialization
const render = (theme: Theme, callback?: () => void) =>
	ReactDOM.render(<ThemeProvider theme={ theme }><App /></ThemeProvider>,
		document.getElementById("main"),
		callback);

document.documentElement.style.setProperty("--base-size", "14px");
render(defaultTheme);

if (process.env.NODE_ENV === "development") {
	const socket = require("webpack-dev-server/client/socket");
	const onSocketMsg = {
		// ok: function msgOk() {
		// 	workspaceService.updateCache();
		// },
		// warnings: function msgWarnings() {
		// 	workspaceService.updateCache();
		// },
		invalid: function msgInvalid() {
			// setErrorState(null);
			setBusyState("Recompiling…");
		},
		errors: function msgErrors(data: any) {
			setBusyState(null);
			// setErrorState("Errors while compiling. Reload prevented.", data.toString());
		}
	};
	socket("/sockjs-node", onSocketMsg);
}
//#endregion
