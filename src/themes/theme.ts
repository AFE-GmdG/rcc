import * as CSS from "csstype";
import * as JSS from "jss";

//#region Theme
export type Theme = typeof defaultTheme;
export type Themes = { [key: string]: Theme };

export const defaultTheme = {
	colors: {
		color: "hsl(0, 0%, 95%)"
	}
};
//#endregion
