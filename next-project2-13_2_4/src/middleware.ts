import { NextResponse } from 'next/server';

const allowedOrigins =
	process.env.NODE_ENV === 'production'
		? ['https://nextjs.org']
		: ['http://localhost:3000'];

export function middleware(req: Request) {
	// //use conditionals or config matcher (below) to define where middleware is applied [alone or together]
	// if (req.url.includes('/api/')) {
	// }
	// //
	// const regex = new RegExp('/api/*')
	// if(regex.test(req.url)){}
	//using allowedOrigins: 	//get origin if it exist
	const origin = req.headers.get('origin');
	console.log(origin);
	if (origin && !allowedOrigins.includes(origin)) {
		return new NextResponse(null, {
			status: 400,
			statusText: 'Bad Request',
			headers: {
				'Content-Type': 'text/plain',
			},
		});
	}

	console.log('Middelware');

	console.log(req.method);
	console.log(req.url);

	//move on to the route as normal
	return NextResponse.next();
}
//MATCHING PATHS - see notes
export const config = {
	matcher: '/api/:path*', //this will match any route that starts with /api (i.e. api routes)
};
