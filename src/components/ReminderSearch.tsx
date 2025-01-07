import React, { useState } from "react";
import { Reminder, Theme } from "../types";

interface ReminderSearchProps {
	reminders: Reminder[];
	onFilterChange: (filteredReminders: Reminder[]) => void;
	theme: Theme;
	darkMode: boolean;
	getColor: (colorKey: keyof Theme) => string;
}

export function ReminderSearch({
	reminders,
	onFilterChange,
	theme,
	darkMode,
	getColor,
}: ReminderSearchProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [priorityFilter, setPriorityFilter] = useState("All");

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		filterReminders(event.target.value, categoryFilter, priorityFilter);
	};

	const handleCategoryFilter = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCategoryFilter(event.target.value);
		filterReminders(searchTerm, event.target.value, priorityFilter);
	};

	const handlePriorityFilter = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setPriorityFilter(event.target.value);
		filterReminders(searchTerm, categoryFilter, event.target.value);
	};

	const filterReminders = (
		search: string,
		category: string,
		priority: string
	) => {
		const filtered = reminders.filter((reminder) => {
			const matchesSearch = reminder.message
				.toLowerCase()
				.includes(search.toLowerCase());
			const matchesCategory =
				category === "All" || reminder.category === category;
			const matchesPriority =
				priority === "All" || reminder.priority === priority;
			return matchesSearch && matchesCategory && matchesPriority;
		});
		onFilterChange(filtered);
	};

	const categories = ["All", ...new Set(reminders.map((r) => r.category))];
	const priorities = ["All", "low", "medium", "high"];

	return (
		<div className="mb-4 space-y-2">
			<input
				type="text"
				placeholder="Search reminders..."
				value={searchTerm}
				onChange={handleSearch}
				className="w-full px-3 py-2 border rounded-md"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
					borderColor: getColor("secondary"),
				}}
			/>
			<div className="flex space-x-2">
				<select
					value={categoryFilter}
					onChange={handleCategoryFilter}
					className="px-3 py-2 border rounded-md"
					style={{
						backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
						color: getColor("text"),
						borderColor: getColor("secondary"),
					}}
				>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				<select
					value={priorityFilter}
					onChange={handlePriorityFilter}
					className="px-3 py-2 border rounded-md"
					style={{
						backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
						color: getColor("text"),
						borderColor: getColor("secondary"),
					}}
				>
					{priorities.map((priority) => (
						<option key={priority} value={priority}>
							{priority}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
