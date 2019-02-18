import * as React from "react";

import * as Styles from "./Button.less";

export type ButtonAttributes = React.Attributes & {
};

type ButtonState = {
};

export class Button extends React.Component<ButtonAttributes, ButtonState> {

	constructor(props: ButtonAttributes) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className={ Styles.button }>
				{ this.props.children }
			</div>);
	}

}
