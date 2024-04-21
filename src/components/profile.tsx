'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
	const session = useSession();

	if (session.data?.user) {
		return (
			<div>
				User Is Signed In
				<br />
				{JSON.stringify(session.data.user)}
			</div>
		);
	} else {
		return <div>User is NOT Signed In</div>;
	}
}
