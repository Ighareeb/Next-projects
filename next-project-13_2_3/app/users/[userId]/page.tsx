import React from 'react';
import getUser from '@/app/lib/getUser';
import getUserPosts from '@/app/lib/getUserPosts';
import { Suspense } from 'react'; //built in React component that allows you to wrap components you want to suspend rendering until eg some condition is met. Recommended to use with fetching from server components. Instead of using Promise.all pattern, use Suspense component
import UserPosts from '@/app/users/[userId]/components/UserPosts';
import type { Metadata } from 'next';
import getAllUsers from '@/app/lib/getAllUsers';
import { notFound } from 'next/navigation';

//string since it is coming from URL params
type Params = {
	params: {
		userId: string;
	};
};
//generate dynamic metadata - We need the user data [recommendation when using Next is to make req for data where you need it - even though repeating request Next deduplicates reqs (check notes)]
export async function generateMetadata({
	params: { userId },
}: Params): Promise<Metadata> {
	const userData: Promise<User> = getUser(userId);
	const user: User = await userData;

	//handle errors for dynamic pages - instead of just generating default 404 error page if resource not found
	if (!user) {
		return {
			title: 'User not found',
		};
	}
	return {
		title: user.name,
		description: `This is the page of ${user.name}`,
	};
}

export default async function UserPage({ params: { userId } }: Params) {
	//fetches data in parallel with the users list API using server component (no await)
	const userData: Promise<User> = getUser(userId);
	const userPostsData: Promise<Post[]> = getUserPosts(userId);

	// const [user, userPosts] = await Promise.all([userData, userPostsData]);
	const user = await userData;

	//handle errors for dynamic pages - instead of just generating default 404 error page if resource not found
	if (!user) {
		return notFound(); //uses metadata error handling instead of default
	}

	return (
		<>
			{/* user.name is fetched immediately- supense wraps the userPostsData */}
			<h2>{user.name}</h2>
			<br />
			<Suspense fallback={<h2>Loading...</h2>}>
				{/* <UserPosts posts={userPosts} /> used in Promise.all pattern*/}
				<UserPosts promise={userPostsData} />
			</Suspense>
		</>
	);
}

//changing SSR pages to SSG pages using incremental static regen by passing userId param in advance so it can statically generate the pages
//still follow incrememental static regeneration strategy (passes static params to UserPage function that uses strategy in getUserPosts)
//npm run build shows that components are now SSG
export async function generateStaticParams() {
	const userData: Promise<User[]> = getAllUsers();
	const users = await userData;
	//providing static params ahead of time for Nextjs to use
	return users.map((user) => {
		return { userId: user.id.toString() };
	});
}
