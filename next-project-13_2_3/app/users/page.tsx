import type { Metadata } from 'next'; //add static metadata
import getAllUsers from '../lib/getAllUsers';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Users',
};

export default async function UsersPage() {
	//static req during the build
	const userData: Promise<User[]> = getAllUsers();

	const users = await userData;
	console.log('hello');

	const content = (
		<section>
			<h2>
				<Link href="/">Back to Home</Link>
			</h2>
			<br />
			{users.map((user) => {
				return (
					<>
						{/* note: even before clinking the link the next app starts pre-fetching if you mouse over the link */}
						<p key={user.id}>
							<Link href={`/users/${user.id}`}>{user.name}</Link>
						</p>
						<br />
					</>
				);
			})}
		</section>
	);
	return content;
}
