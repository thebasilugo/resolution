import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
	darkMode: boolean;
	onToggle: () => void;
}

export function ThemeToggle({ darkMode, onToggle }: ThemeToggleProps) {
	return (
		<button
			onClick={onToggle}
			className="p-2 rounded-full"
			style={{ backgroundColor: darkMode ? "#ffffff" : "#000000" }}
		>
			{darkMode ? (
				<Sun className="h-5 w-5 text-yellow-500" />
			) : (
				<Moon className="h-5 w-5 text-gray-100" />
			)}
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
