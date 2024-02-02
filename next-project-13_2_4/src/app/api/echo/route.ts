import { NextResponse } from 'next/server';
//GET endpoint that echoes search params
// --> /api/echo?(params) -
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	// //NOTE: inflexible since setting param names to get
	// const name = searchParams.get('name');
	// const instrument = searchParams.get('instrument');
	// return NextResponse.json({ name, instrument });

	//Note: flexible since creating object from URLSearchParams i.e. converts query string into obj with key:value
	const obj = Object.fromEntries(searchParams.entries());
	return NextResponse.json(obj);
}
