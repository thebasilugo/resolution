import { useState, useEffect } from "react";
import { Theme } from "../types";

const themes: Theme[] = [
	{
		primary: "#4A90E2",
		secondary: "#50E3C2",
		accent: "#F5A623",
		background: "#F0F4F8",
		text: "#4A4A4A",
	}, // Blue
	{
		primary: "#FF6B6B",
		secondary: "#4ECDC4",
		accent: "#45B7D1",
		background: "#F7FFF7",
		text: "#2C3E50",
	}, // Pink
	{
		primary: "#FFA502",
		secondary: "#FF6B6B",
		accent: "#4ECDC4",
		background: "#FFF9E6",
		text: "#2C3E50",
	}, // Yellow
	{
		primary: "#26de81",
		secondary: "#45aaf2",
		accent: "#fd9644",
		background: "#F8EFBA",
		text: "#4b6584",
	}, // Green
	{
		primary: "#A0522D",
		secondary: "#DEB887",
		accent: "#8B4513",
		background: "#FFF8DC",
		text: "#4A4A4A",
	}, // Brown
];

interface ThemeSelectorProps {
	onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
	const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("selectedTheme");
		if (savedTheme) {
			const parsedTheme = JSON.parse(savedTheme);
			setSelectedTheme(parsedTheme);
			onThemeChange(parsedTheme);
		}
	}, [onThemeChange]);

	const handleThemeChange = (theme: Theme) => {
		setSelectedTheme(theme);
		onThemeChange(theme);
		localStorage.setItem("selectedTheme", JSON.stringify(theme));
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-10 h-10 rounded-full focus:outline-none focus:opacity-80"
				style={{ backgroundColor: selectedTheme.primary }}
			>
				<span className="sr-only">Toggle theme</span>
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10">
					<h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
						Choose a theme
					</h3>
					<div className="flex flex-wrap gap-2">
						{themes.map((theme, index) => (
							<button
								key={index}
								onClick={() => handleThemeChange(theme)}
								className={`w-6 h-6 rounded-full focus:outline-none focus:opacity-80 ${
									selectedTheme === theme
										? "ring-2 ring-offset-2 ring-black dark:ring-white"
										: ""
								}`}
								style={{ backgroundColor: theme.primary }}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
