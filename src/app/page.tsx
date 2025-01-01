"use client";

import { useState, useEffect } from "react";
import { useReminders } from "../hooks/useReminders";
import { useAppSettings } from "../hooks/useAppSettings";
import { useCategories } from "../hooks/useCategories";
import { ReminderForm } from "../components/ReminderForm";
import { ReminderList } from "../components/ReminderList";
import { AlertDisplay } from "../components/AlertDisplay";
import { ThemeToggle } from "../components/ThemeToggle";
import { ThemeManager } from "../components/ThemeManager";
import { Dashboard } from "../components/Dashboard";
import { Theme } from "../types";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Bell } from "lucide-react";

export default function Home() {
	const {
		reminders,
		addReminder,
		editReminder,
		deleteReminder,
		completeReminder,
		currentAlert,
		setCurrentAlert,
		getStats,
		getRandomReminder,
	} = useReminders();
	const { settings, updateSettings } = useAppSettings();
	const { categories } = useCategories();
	const [theme, setTheme] = useState<Theme>({
		primary: "#F0F4F8",
		secondary: "#4A90E2",
		accent: "#4A90E2",
		background: "#F0F4F8",
		text: "#4A4A4A",
	});
	const [activeTab, setActiveTab] = useState("dashboard");

	const showRandomReminder = () => {
		const randomReminder = getRandomReminder();
		if (randomReminder) {
			setCurrentAlert(randomReminder);
		}
	};

	useEffect(() => {
		const root = window.document.documentElement;
		if (settings.darkMode) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [settings.darkMode]);

	const toggleDarkMode = () => {
		updateSettings({ darkMode: !settings.darkMode });
	};

	const getColor = (colorKey: keyof Theme) => {
		return settings.darkMode
			? colorKey === "background"
				? "#1a1a1a"
				: theme[colorKey]
			: theme[colorKey];
	};

	return (
		<ErrorBoundary>
			<div
				className="min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-200"
				style={{
					backgroundColor: getColor("background"),
					color: getColor("text"),
				}}
			>
				<header className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
					<h1
						className="text-2xl sm:text-3xl font-bold text-center sm:text-left"
						style={{ color: getColor("secondary") }}
					>
						New Year, New You
					</h1>
					<div className="flex items-center space-x-4">
						<button
							onClick={showRandomReminder}
							className="py-2 px-4 border border-blue-500 rounded-md"
							style={{
								borderColor: getColor("secondary"),
								color: getColor("secondary"),
							}}
						>
							<Bell className="h-4 w-4 inline-block" />
							<span className="sr-only">Show Random Reminder</span>
						</button>
						<ThemeManager
							onThemeChange={setTheme}
							darkMode={settings.darkMode}
						/>
						<ThemeToggle
							darkMode={settings.darkMode}
							onToggle={toggleDarkMode}
						/>
					</div>
				</header>
				<main>
					<div className="space-y-4">
						<div className="flex space-x-2 border-b">
							<button
								className={`py-2 px-4 ${
									activeTab === "dashboard"
										? "border-b-2 border-blue-500 font-medium"
										: ""
								}`}
								onClick={() => setActiveTab("dashboard")}
							>
								Dashboard
							</button>
							<button
								className={`py-2 px-4 ${
									activeTab === "reminders"
										? "border-b-2 border-blue-500 font-medium"
										: ""
								}`}
								onClick={() => setActiveTab("reminders")}
							>
								Reminders
							</button>
						</div>
						{activeTab === "dashboard" && (
							<Dashboard
								stats={getStats()}
								theme={theme}
								darkMode={settings.darkMode}
								getColor={getColor}
							/>
						)}
						{activeTab === "reminders" && (
							<div className="grid gap-8 md:grid-cols-2">
								<section>
									<h2
										className="text-xl font-semibold mb-4"
										style={{ color: getColor("secondary") }}
									>
										Add New Reminder
									</h2>
									<ReminderForm
										onSubmit={addReminder}
										theme={theme}
										darkMode={settings.darkMode}
										getColor={getColor}
										categories={categories}
									/>
								</section>
								<section>
									<h2
										className="text-xl font-semibold mb-4"
										style={{ color: getColor("secondary") }}
									>
										Your Reminders
									</h2>
									<ReminderList
										reminders={reminders}
										onEdit={editReminder}
										onDelete={deleteReminder}
										onComplete={completeReminder}
										theme={theme}
										darkMode={settings.darkMode}
										getColor={getColor}
									/>
								</section>
							</div>
						)}
					</div>
				</main>
				<AlertDisplay
					currentAlert={currentAlert}
					settings={settings}
					onComplete={completeReminder}
					onClose={() => setCurrentAlert(null)}
					theme={theme}
					darkMode={settings.darkMode}
					getColor={getColor}
				/>
			</div>
		</ErrorBoundary>
	);
}
