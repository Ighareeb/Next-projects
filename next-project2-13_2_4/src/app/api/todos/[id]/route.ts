import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
//in this case since we are creating a dynamic route we do need the request for the GET method to get the id since that is what is being used to make route dynamic
//http://localhost:3000/api/todos/{id}
export async function GET(req: Request) {
	//get the id from the req URL path
	const id = req.url.slice(req.url.lastIndexOf('/') + 1);

	const res = await fetch(`DATA_SOURCE_URL/${id}`);

	const todo: Todo = await res.json();

	if (!todo.id) {
		return NextResponse.json({ message: 'Todo ID required or not found' });
	}
	return NextResponse.json(todo);
}
