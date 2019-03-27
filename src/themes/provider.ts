import * as React from "react";
import * as PropTypes from "prop-types";
import jss, { StyleSheet } from "jss";
import preset from "jss-preset-default";

import {
	StyleOrStyleFunction,
	Theme,
	WithTheme,
	defaultTheme,
	WithStylesOptions
} from "./theme";

jss.setup(preset());

const ThemeContext = React.createContext<Theme>(defaultTheme);

type ThemeProviderProps = {
	theme?: Theme;
};


export const ThemeProvider: React.SFC<ThemeProviderProps> = props =>
	React.createElement(ThemeContext.Provider, { value: props.theme || defaultTheme }, props.children);

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type ComponentDecoratorInfer<TMergedProps> =
	<TProps>(wrappedComponent: React.ComponentType<TProps & TMergedProps>) => React.FunctionComponent<Omit<TProps & TMergedProps, keyof TMergedProps>>;

export function withTheme(): ComponentDecoratorInfer<WithTheme>;
export function withTheme<ClassKey extends string, Options extends WithStylesOptions = {}>(styles: StyleOrStyleFunction<ClassKey>, options?: Options): ComponentDecoratorInfer<WithTheme<StyleOrStyleFunction<ClassKey>, Options["withTheme"]>>;
export function withTheme<ClassKey extends string, Options extends WithStylesOptions = {}>(styles?: StyleOrStyleFunction<ClassKey>, options?: Options): ComponentDecoratorInfer<WithTheme<StyleOrStyleFunction<ClassKey>>> {
	let styleSheet: StyleSheet;
	let classes: Record<ClassKey, string> | undefined = undefined;
	let lastStyles: StyleOrStyleFunction<ClassKey> | undefined = undefined;
	let lastTheme: Theme | undefined = undefined;

	return function <TProps>(wrappedComponent: React.ComponentType<TProps>) {
		const ThemeAdapter: React.SFC<TProps> = props =>
			React.createElement(ThemeContext.Consumer, undefined, (theme: Theme) => {
				if (styles) {
					if (theme !== lastTheme || styles !== lastStyles) {
						lastTheme = theme;
						lastStyles = styles;

						const newStyles = (styles instanceof Function) ? styles(theme) : styles;
						styleSheet && jss.removeStyleSheet(styleSheet);
						styleSheet = jss.createStyleSheet(newStyles, options);
						classes = styleSheet.attach().classes;
					}
					return React.createElement(wrappedComponent, { ...props, classes, ...(options && options.withTheme) ? { theme } : {} });
				}
				return React.createElement(wrappedComponent, { ...props, theme });
			});

		ThemeAdapter.propTypes = {
			innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
		} as any;

		return ThemeAdapter;
	};
}
