import * as React from "react";

// type KeyType<TData, Key extends keyof TData> = TData[Key];

//type ListViewProps<TData extends { }, KeyName extends keyof TData>
type ListViewProps<TData extends { [key: string]: any } = { id: string }, KeyName extends keyof TData = "id"> = {
	keyField: KeyName
	data?: TData[];
};

const ListView: React.SFC<ListViewProps> = props => {
	return (<div></div>);
}

function example() {

	type Book = {
		isbn: string;
		title: string;
		price: number;
	}

	const books: Book[] = [
		{ isbn: "123-456-78-9", title: "Interessantes Buch", price: 12.50 },
		{ isbn: "987-654-32-1", title: "Überraschende Wendung", price: 9.99 }
	];

	return (<ListView data={ books } keyField="isbn"></ListView>);
}
