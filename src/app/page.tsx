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
import { ReminderSearch } from "../components/ReminderSearch";
import { Theme, Reminder } from "../types";
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
		notifications,
		addNotification,
		removeNotification,
	} = useReminders();
	const { settings, updateSettings } = useAppSettings();
	const { categories } = useCategories();
	const [theme, setTheme] = useState<Theme>({
		primary: "#4A90E2",
		secondary: "#50E3C2",
		accent: "#F5A623",
		background: "#F0F4F8",
		text: "#4A4A4A",
	});
	const [activeTab, setActiveTab] = useState("dashboard");
	const [filteredReminders, setFilteredReminders] =
		useState<Reminder[]>(reminders);

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

	useEffect(() => {
		setFilteredReminders(reminders);
	}, [reminders]);

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
							className="py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:opacity-80"
							style={{
								backgroundColor: getColor("secondary"),
								color: getColor("background"),
							}}
						>
							<Bell className="h-4 w-4 inline-block mr-2" />
							Random Reminder
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
								className={`py-2 px-4 transition-colors duration-200 focus:outline-none ${
									activeTab === "dashboard" ? "border-b-2 font-medium" : ""
								}`}
								style={{
									borderColor:
										activeTab === "dashboard"
											? getColor("secondary")
											: "transparent",
									color:
										activeTab === "dashboard"
											? getColor("secondary")
											: getColor("text"),
								}}
								onClick={() => setActiveTab("dashboard")}
							>
								Dashboard
							</button>
							<button
								className={`py-2 px-4 transition-colors duration-200 focus:outline-none ${
									activeTab === "reminders" ? "border-b-2 font-medium" : ""
								}`}
								style={{
									borderColor:
										activeTab === "reminders"
											? getColor("secondary")
											: "transparent",
									color:
										activeTab === "reminders"
											? getColor("secondary")
											: getColor("text"),
								}}
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
							<div className="space-y-8">
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
									<ReminderSearch
										reminders={reminders}
										onFilterChange={setFilteredReminders}
										theme={theme}
										darkMode={settings.darkMode}
										getColor={getColor}
									/>
									<ReminderList
										reminders={filteredReminders}
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
