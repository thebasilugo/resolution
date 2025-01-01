import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "New Year, New You",
	description: "A simple reminder app to help you achieve your goals",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} bg-white text-gray-900`}>
				{children}
			</body>
		</html>
	);
}
