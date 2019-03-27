import * as React from "react";
import * as ReactDOM from "react-dom";

import { ThemeProvider, defaultTheme } from "../src/themes";
import { Button } from "../src/components";

const main = document.getElementById("main") as HTMLDivElement;

ReactDOM.render(
	<ThemeProvider theme={ defaultTheme }>
		<Button onClick={ e => { console.log(e.currentTarget) } }>Hallo, Welt!</Button>
	</ThemeProvider>,
	main);
