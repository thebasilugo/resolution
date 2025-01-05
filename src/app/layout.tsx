import type { Metadata } from "next";
import "./globals.css";

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
			<body>{children}</body>
		</html>
	);
}
