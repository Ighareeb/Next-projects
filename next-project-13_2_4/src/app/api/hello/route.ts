import { NextResponse } from 'next/server'; //extends Web response API with additional methods (in our case for json)

//This route will be statically evaluated when using GET - no variation in req or dependence on req info as res will always be the same
//http://localhost:3000/api/hello API BE endpoint
export async function GET() {
	return NextResponse.json({ message: 'Hello, Next.js!' });
}
