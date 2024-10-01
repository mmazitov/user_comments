'use client'; // Indicates that this component should be rendered on the client-side only

import FormSearch from './forms/FormSearch'; // Import the FormSearch component for the search functionality
import Image from 'next/image'; // Import Image component from Next.js for optimized image loading
import Link from 'next/link'; // Import Link component from Next.js for client-side navigation
import Logo from '@/public/logo-placeholder-image-300x300.png'; // Import the logo image from the public directory
import { Provider } from 'react-redux'; // Import Provider from react-redux to connect the Redux store
import store from '@/store/index'; // Import the Redux store instance

const Header = () => {
	return (
		<header className="border-b w-full">
			{/* Header container with a bottom border and full width */}
			<div className="flex justify-between items-center mx-auto px-5 lg:px-10 py-5 container">
				{/* Flex container for layout */}
				<Link href="/">
					{/* Link to the homepage */}
					<Image src={Logo} alt="logo" width={100} height={100} />
					{/* Logo image with specified width and height */}
				</Link>
				<Provider store={store}>
					{/* Provide the Redux store to the FormSearch component  */}
					<FormSearch />
					{/* Render the FormSearch component for searching comments */}
				</Provider>
			</div>
		</header>
	);
};

export default Header; // Export the Header component for use in other parts of the application
