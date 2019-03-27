import * as CSS from "csstype";
import * as JSS from "jss";

//#region Theme
export type Theme = typeof defaultTheme;
export type Themes = { [key: string]: Theme };

export const defaultTheme = {
	colors: {
		color: "hsl(0, 0%, 95%)",
		hoverColor: "hsl(0, 0%, 100%)",
		buttonColor: "hsl(0, 0%, 12%)",
		hoverButtonColor: "hsl(0, 0%, 18%)",
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
