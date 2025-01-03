import { useState, useEffect, useRef } from "react";
import { Theme } from "../types";
import { Plus, Edit, Trash, ChevronDown } from "lucide-react";

interface ThemeManagerProps {
	onThemeChange: (theme: Theme) => void;
	darkMode: boolean;
}

interface ThemeOption {
	id: string;
	name: string;
	primary: string;
	secondary: string;
	tertiary: string;
}

const initialThemes: ThemeOption[] = [
	{
		id: "1",
		name: "Blue",
		primary: "#F0F4F8",
		secondary: "#4A90E2",
		tertiary: "#4A4A4A",
	},
	{
		id: "2",
		name: "Pink",
		primary: "#FFF0F5",
		secondary: "#FF69B4",
		tertiary: "#4A4A4A",
	},
	{
		id: "3",
		name: "Yellow",
		primary: "#FFFACD",
		secondary: "#FFD700",
		tertiary: "#4A4A4A",
	},
	{
		id: "4",
		name: "Green",
		primary: "#F0FFF0",
		secondary: "#2E8B57",
		tertiary: "#4A4A4A",
	},
	{
		id: "5",
		name: "Brown",
		primary: "#F4E1D2",
		secondary: "#8B4513",
		tertiary: "#4A4A4A",
	},
];

export function ThemeManager({ onThemeChange, darkMode }: ThemeManagerProps) {
	const [themes, setThemes] = useState<ThemeOption[]>(initialThemes);
	const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(themes[0]);
	const [editingTheme, setEditingTheme] = useState<ThemeOption | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
	const lastTapTime = useRef<{ [key: string]: number }>({});

	useEffect(() => {
		const savedThemes = localStorage.getItem("themes");
		const savedSelectedTheme = localStorage.getItem("selectedTheme");
		if (savedThemes) {
			setThemes(JSON.parse(savedThemes));
		}
		if (savedSelectedTheme) {
			setSelectedTheme(JSON.parse(savedSelectedTheme));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("themes", JSON.stringify(themes));
	}, [themes]);

	useEffect(() => {
		localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
		onThemeChange({
			primary: selectedTheme.primary,
			secondary: selectedTheme.secondary,
			accent: selectedTheme.secondary,
			background: darkMode ? "#1a1a1a" : selectedTheme.primary,
			text: darkMode ? "#ffffff" : selectedTheme.tertiary,
		});
	}, [selectedTheme, darkMode, onThemeChange]);

	const handleThemeChange = (theme: ThemeOption) => {
		setSelectedTheme(theme);
	};

	const openDialog = (theme: ThemeOption | null = null) => {
		setEditingTheme(
			theme || {
				id: "",
				name: "",
				primary: "#FFFFFF",
				secondary: "#000000",
				tertiary: "#000000",
			}
		);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setEditingTheme(null);
		setIsDialogOpen(false);
	};

	const saveTheme = () => {
		if (editingTheme) {
			if (editingTheme.id) {
				setThemes(
					themes.map((t) => (t.id === editingTheme.id ? editingTheme : t))
				);
			} else {
				const newTheme = { ...editingTheme, id: Date.now().toString() };
				setThemes([...themes, newTheme]);
				setSelectedTheme(newTheme);
			}
			closeDialog();
		}
	};

	const deleteTheme = (id: string) => {
		setThemes(themes.filter((t) => t.id !== id));
		if (selectedTheme.id === id) {
			setSelectedTheme(themes[0]);
		}
	};

	const handleThemeClick = (theme: ThemeOption) => {
		const now = Date.now();
		const lastTap = lastTapTime.current[theme.id] || 0;
		const timeSinceLastTap = now - lastTap;

		if (timeSinceLastTap < 300) {
			// Double tap threshold (300ms)
			openDialog(theme);
		} else {
			handleThemeChange(theme);
		}

		lastTapTime.current[theme.id] = now;
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsDialogOpen(!isDialogOpen)}
				className="w-10 h-10 rounded-full"
				style={{ backgroundColor: selectedTheme.secondary }}
			>
				<span className="sr-only">Toggle theme</span>
			</button>
			{isDialogOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
						<h3 className="font-medium text-lg mb-4">Choose a theme</h3>
						<div className="flex flex-wrap justify-center gap-4 mb-6">
							{themes.map((theme) => (
								<div
									key={theme.id}
									className="relative"
									onMouseEnter={() => setHoveredTheme(theme.id)}
									onMouseLeave={() => setHoveredTheme(null)}
								>
									<button
										onClick={() => handleThemeClick(theme)}
										className={`w-12 h-12 rounded-full ${
											selectedTheme.id === theme.id
												? "ring-2 ring-offset-2 ring-black dark:ring-white"
												: ""
										}`}
										style={{ backgroundColor: theme.secondary }}
									/>
									{hoveredTheme === theme.id && (
										<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-md rounded px-2 py-1 text-xs whitespace-nowrap">
											{theme.name}
										</div>
									)}
									<div
										className={`absolute -top-1 -right-1 flex space-x-1 transition-opacity duration-200 ${
											hoveredTheme === theme.id ? "opacity-100" : "opacity-0"
										}`}
									>
										<button
											onClick={(e) => {
												e.stopPropagation();
												openDialog(theme);
											}}
											className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
										>
											<Edit className="w-4 h-4" />
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												deleteTheme(theme.id);
											}}
											className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
										>
											<Trash className="w-4 h-4" />
										</button>
									</div>
								</div>
							))}
							<button
								onClick={() => openDialog()}
								className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"
							>
								<Plus className="w-6 h-6" />
							</button>
						</div>
						{editingTheme && (
							<div className="space-y-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium mb-1"
									>
										Name
									</label>
									<input
										id="name"
										type="text"
										value={editingTheme.name}
										onChange={(e) =>
											setEditingTheme((prev) =>
												prev ? { ...prev, name: e.target.value } : null
											)
										}
										className="w-full px-3 py-2 border rounded-md"
									/>
								</div>
								<div>
									<label
										htmlFor="primary"
										className="block text-sm font-medium mb-1"
									>
										Primary
									</label>
									<div className="flex gap-2">
										<input
											id="primary"
											type="color"
											value={editingTheme.primary}
											onChange={(e) =>
												setEditingTheme((prev) =>
													prev ? { ...prev, primary: e.target.value } : null
												)
											}
											className="w-10 h-10 p-0 rounded-full"
										/>
										<input
											type="text"
											value={editingTheme.primary}
											onChange={(e) =>
												setEditingTheme((prev) =>
													prev ? { ...prev, primary: e.target.value } : null
												)
											}
											className="flex-grow px-3 py-2 border rounded-md"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="secondary"
										className="block text-sm font-medium mb-1"
									>
										Secondary
									</label>
									<div className="flex gap-2">
										<input
											id="secondary"
											type="color"
											value={editingTheme.secondary}
											onChange={(e) =>
												setEditingTheme((prev) =>
													prev ? { ...prev, secondary: e.target.value } : null
												)
											}
											className="w-10 h-10 p-0 rounded-full"
										/>
										<input
											type="text"
											value={editingTheme.secondary}
											onChange={(e) =>
												setEditingTheme((prev) =>
													prev ? { ...prev, secondary: e.target.value } : null
												)
											}
											className="flex-grow px-3 py-2 border rounded-md"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="tertiary"
										className="block text-sm font-medium mb-1"
									>
										Tertiary
									</label>
									<div className="flex gap-2">
										<input
											id="tertiary"
											type="color"
											value={editingTheme.tertiary}
											onChange={(e) =>
												setEditingTheme((prev) =>
													prev ? { ...prev, tertiary: e.target.value } : null
												)
											}
											className="w-10 h-10 p-0 rounded-full"
										/>
										<input
											type="text"
											value={editingTheme.tertiary}
											onChange={(e) =>
												setEditingTheme((prev) =>
													prev ? { ...prev, tertiary: e.target.value } : null
												)
											}
											className="flex-grow px-3 py-2 border rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-end space-x-2">
									<button
										onClick={closeDialog}
										className="px-4 py-2 border rounded-md"
									>
										Cancel
									</button>
									<button
										onClick={saveTheme}
										className="px-4 py-2 bg-blue-500 text-white rounded-md"
									>
										Save
									</button>
								</div>
							</div>
						)}
						<button
							onClick={() => setIsDialogOpen(false)}
							className="mt-6 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
