import * as React from "react";
import jss, { StyleSheet, StyleSheetOptions } from "jss";
import preset from "jss-preset-default";

import { Style, StyleFunction, Theme, defaultTheme, } from "./theme";

jss.setup(preset());

const ThemeContext = React.createContext<Theme>(defaultTheme);
const styleCache = new Map<Style | StyleFunction, [StyleSheet, Record<string, string>]>();
let currentTheme: Theme;

type ThemeProviderProps = {
	theme?: Theme;
};

export const ThemeProvider: React.SFC<ThemeProviderProps> = props =>
	React.createElement(ThemeContext.Provider, { value: props.theme || defaultTheme }, props.children);

export function useTheme(): Theme;
export function useTheme(style: Style, options?: StyleSheetOptions): Record<keyof typeof style, string>;
export function useTheme(styleFunction: StyleFunction, options?: StyleSheetOptions): Record<keyof ReturnType<typeof styleFunction>, string>;
export function useTheme(styleOrStyleFunction?: Style | StyleFunction, options?: StyleSheetOptions) {
	const theme = React.useContext(ThemeContext);
	if (!styleOrStyleFunction) {
		return theme;
	}

	if (theme !== currentTheme) {
		// clear Cache, set new current theme
		styleCache.forEach(([styleSheet]) => styleSheet && jss.removeStyleSheet(styleSheet));
		styleCache.clear();
		currentTheme = theme;
	};

	let [styleSheet, classes] = styleCache.get(styleOrStyleFunction) || [undefined, undefined];

	if (!styleSheet) {
		const styleObject = styleOrStyleFunction instanceof Function ? styleOrStyleFunction(theme) : styleOrStyleFunction;
		styleSheet = jss.createStyleSheet(styleObject, options);
		classes = styleSheet.attach().classes as Record<string, string>;
		styleCache.set(styleOrStyleFunction, [styleSheet, classes]);
	}

	return classes;
}
