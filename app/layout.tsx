import './globals.css';

import Header from './components/Header';
import type { Metadata } from 'next';
import { Provider } from 'react-redux';
import localFont from 'next/font/local';
import store from '../store/index';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'User Comments',
	description: 'A simple user comments app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
