import React from 'react';
import getUser from '@/app/lib/getUser';
import getUserPosts from '@/app/lib/getUserPosts';
import { Suspense } from 'react'; //built in React component that allows you to wrap components you want to suspend rendering until eg some condition is met. Recommended to use with fetching from server components. Instead of using Promise.all pattern, use Suspense component
import UserPosts from '@/app/users/[userId]/components/UserPosts';

type Params = {
	params: {
		userId: string;
	};
};
//string since it is coming from URL params

export default async function UserPage({ params: { userId } }: Params) {
	//fetches data in parallel with the users list API using server component (no await)
	const userData: Promise<User> = getUser(userId);
	const userPostsData: Promise<Post[]> = getUserPosts(userId);

	// const [user, userPosts] = await Promise.all([userData, userPostsData]);
	const user = await userData;

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
