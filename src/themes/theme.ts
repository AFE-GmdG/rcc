import * as CSS from "csstype";
import * as JSS from "jss";

//#region Theme
export type Theme = typeof defaultTheme;
export type Themes = { [key: string]: Theme };

export const defaultTheme = {
	baseSize: "14px",

	fonts: {
		fontSizeSmall: "calc(var(--base-size) * 0.86)",
		fontSizeMedium: "calc(var(--base-size) * 1.00)",
		fontSizeLarge: "calc(var(--base-size) * 1.29)",
		fontSizeXLarge: "calc(var(--base-size) * 1.71)",
		fontSizeXXLarge: "calc(var(--base-size) * 2.29)",
		lineHeightSmall: "calc(var(--base-size) * 1.29)",
		lineHeightMedium: "calc(var(--base-size) * 1.50)",
		lineHeightLarge: "calc(var(--base-size) * 1.94)",
		lineHeightXLarge: "calc(var(--base-size) * 2.57)",
		lineHeightXXLarge: "calc(var(--base-size) * 3.44)"
	},

	colors: {
		color: "hsl(0, 0%, 95%)",
		hoverColor: "hsl(0, 0%, 100%)",
		accentColor: "hsl(163, 80%, 40%)",
		selectedColor: "hsl(163, 65%, 5%)",
		backgroundColor: "hsl(0, 0%, 12%)",
		hoverBackgroundColor: "hsl(0, 0%, 18%)",
		accentBackgroundColor: "hsl(163, 80%, 40%)",
		selectedBackgroundColor: "hsl(163, 65%, 50%)",

		evenBackgroundColor: "hsl(0, 0%, 18%)",
		oddBackgroundColor: "hsl(0, 0%, 15%)",

		borderColor: "hsl(163, 25%, 40%)"
	},

	box: {
		shadow: "0 0 1rem 0 hsla(0, 0%, 0%, 0.75)"
	}
};
//#endregion

//#region Types
type Condition = boolean | (() => boolean);
type ClassName = string | { [key: string]: Condition } | undefined;
type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface WithStylesOptions extends JSS.StyleSheetOptions {
	withTheme?: boolean;
}

export interface CSSProperties extends CSS.Properties<number | string> {
	// Allow pseudo selectors and media queries
	[k: string]: CSS.Properties<number | string>[keyof CSS.Properties] | CSSProperties;
}

export type Style<ClassKey extends string = string> = Record<ClassKey, CSSProperties>;
export type StyleFunction<ClassKey extends string = string> = (theme: Theme) => Record<ClassKey, CSSProperties>;
export type StyleOrStyleFunction<ClassKey extends string = string> = Style<ClassKey> | StyleFunction<ClassKey>;

// without StyleOrStyleFunction inject allways the theme otherwise inject classes and theme depending on the option withTheme = true
export type WithTheme<T extends StyleOrStyleFunction | undefined = undefined, IncludeTheme extends boolean | undefined = false> =
	(IncludeTheme extends true ? { theme: Theme } : {}) &
	(T extends undefined ? { theme: Theme } : {
		classes: ClassNameMap<
			T extends StyleFunction<infer K>
			? K
			: T extends Style<infer K>
			? K
			: never
		>;
	}) & {
		innerRef?: React.Ref<any> | React.RefObject<any>;
	};
//#endregion

//#region Exported Functions
export function conditionalClassName(className: string, condition: Condition) {
	return (typeof condition === "boolean" ? condition : condition()) ? className : "";
}

export function classNames(...classNames: ClassName[]) {
	return classNames.reduce<string[]>((classNames, className) => {
		if (className === undefined) {
			return classNames;
		} else if (typeof className === "string") {
			const trimmedClassName = className.trim();
			if (trimmedClassName.length > 0) {
				classNames.push(trimmedClassName);
			}
		} else {
			for (const propertyName in className) {
				const property = className[propertyName];
				const shouldAddThisClassName = typeof property === "boolean"
					? property
					: property();
				if (shouldAddThisClassName) {
					const trimmedClassName = propertyName.trim();
					if (trimmedClassName.length > 0) {
						classNames.push(trimmedClassName);
					}
				}
			}
		}
		return classNames;
	}, []).join(" ");
}
//#endregion
