export type Frequency =
	| "hourly"
	| "daily"
	| "weekly"
	| "monthly"
	| "custom"
	| "biennial";
export type Priority = "low" | "medium" | "high";

export interface Reminder {
	id: string;
	message: string;
	frequency: Frequency;
	category: string;
	completionCount: number;
	customDays?: number[]; // 0-6, where 0 is Sunday
	priority: Priority;
	dueDate?: Date;
	createdAt: Date;
	lastCompleted?: Date;
}

export interface Profile {
	checkInterval: number; // in minutes
	lastCheckTime: number; // timestamp
}

export interface AppSettings {
	darkMode: boolean;
	alertSound: string;
}

export interface Theme {
	primary: string;
	secondary: string;
	accent: string;
	background: string;
	text: string;
}

export interface CategoryColors {
	[key: string]: string;
}

export interface DashboardStats {
	totalReminders: number;
	completedToday: number;
	currentStreak: number;
	longestStreak: number;
	completionRate: number;
}
