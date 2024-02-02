import React from 'react';
//user posts fetched from posts path with userId query param
export default async function getUserPosts(userId: string) {
	// note: nextjs already caches data by default in fetch req 2nd arg for options [await fetch(...., { cache: 'force-cache})] SSR initially in URL for dynamic req so doesn't need to re-render -
	//HOWEVER consider if data is changing - make it always dynamic by changing option to ,{cache:'no-store'}
	// --> using IncrementalStaticRegeneration is a powerful strategy - create page and check every so often if there are data updates using a revalidate value for the option arg ,{ next:'{revalidate: 60}'} * can be used for both SSR and StaticSiteGeneration components that use the fetch req. [show the data for 60 sec and then update it]
	// you can set revalidation at different levels in the route hierarchy (layout level, page level (applies at every level when you export const revalidate rather than per req basis) ) https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
		{ next: { revalidate: 60 } },
	);
	if (!res.ok) {
		return undefined;
	}
	return res.json();
}
