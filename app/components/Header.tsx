'use client';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo-placeholder-image-300x300.png';
import FormSearch from './forms/FormSearch';
import { Provider } from 'react-redux';
import store from '@/store/index';


const Header = () => {
	return (
		<header className="border-b w-full">
			<div className="flex justify-between items-center mx-auto px-5 lg:px-10 py-5 container">
				<Link href="/">
					<Image src={Logo} alt="logo" width={100} height={100} />
				</Link>
				<Provider store={store}>
					<FormSearch />
				</Provider>
			</div>
		</header>
	);
};

export default Header;
