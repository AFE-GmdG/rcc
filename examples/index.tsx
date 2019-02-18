import * as React from "react";
import * as ReactDOM from "react-dom";

import { Button } from "../src/Button";

import * as Styles from "./index.less";

const main = document.getElementById("main") as HTMLDivElement;
main.className = Styles.example;

ReactDOM.render(
	<div>
		<Button>Hello, World</Button>
	</div>,
	main);
