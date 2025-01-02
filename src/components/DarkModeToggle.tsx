import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
	darkMode: boolean;
	onToggle: () => void;
}

export function DarkModeToggle({ darkMode, onToggle }: DarkModeToggleProps) {
	return (
		<button
			onClick={onToggle}
			className="p-2 rounded-full border border-gray-300 dark:border-gray-600"
		>
			{darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
			<span className="sr-only">Toggle dark mode</span>
		</button>
	);
}
