import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
//in this case since we are creating a dynamic route we do need the request for the GET method to get the id since that is what is being used to make route dynamic
//http://localhost:3000/api/todos/{id}
type Props = {
	params: {
		id: string;
	};
};
export async function GET(req: Request, { params: { id } }: Props) {
	//get the id from the req URL path
	// const id = req.url.slice(req.url.lastIndexOf('/') + 1);

	//instead of getting the id using req.url we can use next.js approach using 2nd param(see above destructuring of params and setting type)
	const res = await fetch(`DATA_SOURCE_URL/${id}`);

	const todo: Todo = await res.json();

	if (!todo.id) {
		return NextResponse.json({ message: 'Todo ID required or not found' });
	}
	return NextResponse.json(todo);
}
