import * as React from "react";
import * as ReactDOM from "react-dom";

import {
	StyleFunction,
	Theme,
	ThemeProvider,
	WithTheme,
	classNames,
	conditionalClassName,
	defaultTheme,
	withTheme
} from "../src/themes";
import {
	Accordion,
	AccordionTab,
	Button
} from "../src/components";

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
	}
});

type BusyState = string | null;
let setBusyState: React.Dispatch<React.SetStateAction<BusyState>>;

const App: React.FunctionComponent = withTheme(themedClasses)(props => {
	const [busyState, _setBusyState] = React.useState<BusyState>(null);
	setBusyState = _setBusyState;

	const { classes } = props;
	return (
		<>
			{/* PageTitle / BreadCrumb */ }
			<div className={ classes.pageContent }></div>
			{/* PageFooter */ }
			<div className={ classNames(classes.spinnerContainer, conditionalClassName(classes.visible, busyState !== null)) }>
			</div>
		</>);
});

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
