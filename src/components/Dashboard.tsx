import React from "react";
import { DashboardStats, Theme } from "../types";

interface DashboardProps {
	stats: DashboardStats;
	theme: Theme;
	darkMode: boolean;
	getColor: (colorKey: keyof Theme) => string;
}

export function Dashboard({
	stats,
	theme,
	darkMode,
	getColor,
}: DashboardProps) {
	const maxCategoryValue = Math.max(...Object.values(stats.categoryBreakdown));
	const maxPriorityValue = Math.max(...Object.values(stats.priorityBreakdown));

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<h3
					className="text-lg font-semibold mb-4"
					style={{ color: getColor("secondary") }}
				>
					Total Reminders
				</h3>
				<p className="text-3xl font-bold">{stats.totalReminders}</p>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<h3
					className="text-lg font-semibold mb-4"
					style={{ color: getColor("secondary") }}
				>
					Completed Today
				</h3>
				<p className="text-3xl font-bold">{stats.completedToday}</p>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<h3
					className="text-lg font-semibold mb-4"
					style={{ color: getColor("secondary") }}
				>
					Current Streak
				</h3>
				<p className="text-3xl font-bold">{stats.currentStreak} days</p>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<h3
					className="text-lg font-semibold mb-4"
					style={{ color: getColor("secondary") }}
				>
					Longest Streak
				</h3>
				<p className="text-3xl font-bold">{stats.longestStreak} days</p>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<h3
					className="text-lg font-semibold mb-4"
					style={{ color: getColor("secondary") }}
				>
					Completion Rate
				</h3>
				<p className="text-3xl font-bold">
					{(stats.completionRate * 100).toFixed(1)}%
				</p>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-3"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<h3
					className="text-lg font-semibold mb-4"
					style={{ color: getColor("secondary") }}
				>
					Category Breakdown
				</h3>
				<div className="space-y-2">
					{Object.entries(stats.categoryBreakdown).map(([category, count]) => (
						<div key={category} className="flex items-center">
							<span className="w-24 text-sm">{category}</span>
							<div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-4 ml-2">
								<div
									className="bg-blue-500 rounded-full h-4"
									style={{
										width: `${(count / maxCategoryValue) * 100}%`,
										backgroundColor: getColor("primary"),
									}}
								></div>
							</div>
							<span className="ml-2 text-sm">{count}</span>
						</div>
					))}
				</div>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-3"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<h3
					className="text-lg font-semibold mb-4"
					style={{ color: getColor("secondary") }}
				>
					Priority Breakdown
				</h3>
				<div className="space-y-2">
					{Object.entries(stats.priorityBreakdown).map(([priority, count]) => (
						<div key={priority} className="flex items-center">
							<span className="w-24 text-sm capitalize">{priority}</span>
							<div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-4 ml-2">
								<div
									className="bg-blue-500 rounded-full h-4"
									style={{
										width: `${(count / maxPriorityValue) * 100}%`,
										backgroundColor:
											priority === "high"
												? "#F44336"
												: priority === "medium"
												? "#FFC107"
												: "#4CAF50",
									}}
								></div>
							</div>
							<span className="ml-2 text-sm">{count}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
