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
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<div className="mb-4">
					<h3
						className="text-lg font-semibold"
						style={{ color: getColor("secondary") }}
					>
						Total Reminders
					</h3>
				</div>
				<div>
					<p className="text-3xl font-bold">{stats.totalReminders}</p>
				</div>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<div className="mb-4">
					<h3
						className="text-lg font-semibold"
						style={{ color: getColor("secondary") }}
					>
						Completed Today
					</h3>
				</div>
				<div>
					<p className="text-3xl font-bold">{stats.completedToday}</p>
				</div>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<div className="mb-4">
					<h3
						className="text-lg font-semibold"
						style={{ color: getColor("secondary") }}
					>
						Current Streak
					</h3>
				</div>
				<div>
					<p className="text-3xl font-bold">{stats.currentStreak} days</p>
				</div>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<div className="mb-4">
					<h3
						className="text-lg font-semibold"
						style={{ color: getColor("secondary") }}
					>
						Longest Streak
					</h3>
				</div>
				<div>
					<p className="text-3xl font-bold">{stats.longestStreak} days</p>
				</div>
			</div>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<div className="mb-4">
					<h3
						className="text-lg font-semibold"
						style={{ color: getColor("secondary") }}
					>
						Completion Rate
					</h3>
				</div>
				<div>
					<p className="text-3xl font-bold">
						{(stats.completionRate * 100).toFixed(1)}%
					</p>
				</div>
			</div>
		</div>
	);
}
