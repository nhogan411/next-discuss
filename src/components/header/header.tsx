import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, Input } from '@nextui-org/react';
import paths from '@/components/paths';
import HeaderAuth from '@/components/header/header-auth';

export default function Header() {
	return (
		<Navbar className='shadow mb-6'>
			<NavbarBrand>
				<h1>
					<Link
						href={paths.homePath()}
						className='font-bold'
					>
						Discuss
					</Link>
				</h1>
			</NavbarBrand>

			<NavbarContent justify='center'>
				<form>
					<Input></Input>
				</form>
			</NavbarContent>

			<NavbarContent justify='end'>
				<HeaderAuth />
			</NavbarContent>
		</Navbar>
	);
}
