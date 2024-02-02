import { NextResponse } from 'next/server';

type Feedback = {
	name?: string;
	email?: string;
	message?: string;
};

export async function POST(request: Request) {
	const data: Feedback = await request.json(); //note: req.body when using express
	console.log('data: ', data);
	//this gets logged in the terminal since it is BE while both page(feedback/thank-you) are in the console since they are FE

	const { name, email, message } = data;
	return NextResponse.json({ name, email, message });
}
