import * as React from "react";

import { ListViewDataType } from "..";
import { ListViewItemProps } from "../components";

export const NavigationLink = (props: ListViewItemProps<ListViewDataType>) => {
	const { className, item } = props;

	return (
		<div className={ className }>
			<a href="#">{ item.label }</a>
		</div>);
};
