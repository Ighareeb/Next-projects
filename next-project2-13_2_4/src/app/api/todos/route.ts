import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_KEY: string = process.env.API_KEY as string;

export async function GET(req: Request) {
	const origin = req.headers.get('origin');
	const res = await fetch(DATA_SOURCE_URL);

	const todos: Todo[] = await res.json();

	return NextResponse.json(JSON.stringify(todos), {
		headers: {
			'Access-Control-Allow-Origin': origin || '*',
			'Content-Type': 'application/json',
		},
	});
}

export async function DELETE(req: Request) {
	const { id }: Partial<Todo> = await req.json();
	if (!id) {
		return NextResponse.json({ message: 'Todo id is required' });
	}
	await fetch(`${DATA_SOURCE_URL}/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'API-Key': API_KEY,
		},
	});
	return NextResponse.json({ message: `Todo with id: ${id} has been deleted` });
}

export async function POST(req: Request) {
	const { userId, title }: Partial<Todo> = await req.json();
	if (!userId || !title) {
		return NextResponse.json({ message: 'userId and title are required' });
	}
	const res = await fetch(DATA_SOURCE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'API-Key': API_KEY,
		},
		body: JSON.stringify({
			userId,
			title,
			completed: false,
		}),
	});
	const newTodo: Todo = await res.json();
	return NextResponse.json(newTodo);
}

export async function PUT(req: Request) {
	const { userId, title, id, completed }: Partial<Todo> = await req.json();
	if (!userId || !title || !id || typeof completed !== 'boolean') {
		return NextResponse.json({ message: 'userId, title and id are required' });
	}
	const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'API-Key': API_KEY,
		},
		body: JSON.stringify({
			userId,
			title,
			completed,
		}),
	});
	const updatedTodo: Todo = await res.json();
	return NextResponse.json(updatedTodo);
}
