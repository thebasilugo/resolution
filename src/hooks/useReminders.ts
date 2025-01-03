import { useState, useEffect, useCallback } from "react";
import { Reminder, Profile, DashboardStats } from "../types";

const DEFAULT_PROFILE: Profile = {
	checkInterval: 60,
	lastCheckTime: Date.now(),
};

export function useReminders() {
	const [reminders, setReminders] = useState<Reminder[]>([]);
	const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
	const [currentAlert, setCurrentAlert] = useState<Reminder | null>(null);

	useEffect(() => {
		const storedReminders = localStorage.getItem("reminders");
		const storedProfile = localStorage.getItem("profile");
		if (storedReminders) {
			setReminders(JSON.parse(storedReminders));
		}
		if (storedProfile) {
			setProfile(JSON.parse(storedProfile));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("reminders", JSON.stringify(reminders));
	}, [reminders]);

	useEffect(() => {
		localStorage.setItem("profile", JSON.stringify(profile));
	}, [profile]);

	const addReminder = useCallback(
		(reminder: Omit<Reminder, "id" | "completionCount" | "createdAt">) => {
			const newReminder: Reminder = {
				...reminder,
				id: Math.random().toString(36).substr(2, 9),
				completionCount: 0,
				createdAt: new Date(),
			};
			setReminders((prev) => [...prev, newReminder]);
		},
		[]
	);

	const editReminder = useCallback(
		(id: string, updatedReminder: Partial<Reminder>) => {
			setReminders((prev) =>
				prev.map((reminder) =>
					reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
				)
			);
		},
		[]
	);

	const deleteReminder = useCallback((id: string) => {
		setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
	}, []);

	const completeReminder = useCallback((id: string) => {
		setReminders((prev) =>
			prev.map((reminder) =>
				reminder.id === id
					? {
							...reminder,
							completionCount: reminder.completionCount + 1,
							lastCompleted: new Date(),
					  }
					: reminder
			)
		);
	}, []);

	const updateProfile = useCallback((newProfile: Partial<Profile>) => {
		setProfile((prev) => ({ ...prev, ...newProfile }));
	}, []);

	const checkAndSetAlert = useCallback(() => {
		const now = Date.now();
		if (now - profile.lastCheckTime >= profile.checkInterval * 60 * 1000) {
			const dueReminders = reminders.filter((reminder) => {
				if (reminder.dueDate && new Date(reminder.dueDate) <= new Date()) {
					return true;
				}
				// Add more complex logic here for different frequencies
				return false;
			});
			if (dueReminders.length > 0) {
				setCurrentAlert(
					dueReminders[Math.floor(Math.random() * dueReminders.length)]
				);
			}
			updateProfile({ lastCheckTime: now });
		}
	}, [profile, reminders, updateProfile]);

	useEffect(() => {
		const intervalId = setInterval(checkAndSetAlert, 60000); // Check every minute
		return () => clearInterval(intervalId);
	}, [checkAndSetAlert]);

	const getStats = useCallback((): DashboardStats => {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const completedToday = reminders.filter(
			(r) => r.lastCompleted && new Date(r.lastCompleted) >= today
		).length;
		const streaks = reminders.map((r) => {
			let streak = 0;
			let date = new Date(today);
			while (r.lastCompleted && new Date(r.lastCompleted) >= date) {
				streak++;
				date.setDate(date.getDate() - 1);
			}
			return streak;
		});
		const currentStreak = Math.max(...streaks, 0);
		const longestStreak = Math.max(
			...reminders.map((r) => r.completionCount),
			0
		);
		const completionRate =
			reminders.length > 0
				? reminders.reduce((sum, r) => sum + r.completionCount, 0) /
				  reminders.length
				: 0;

		return {
			totalReminders: reminders.length,
			completedToday,
			currentStreak,
			longestStreak,
			completionRate,
		};
	}, [reminders]);

	const getRandomReminder = useCallback((): Reminder | null => {
		if (reminders.length === 0) return null;
		return reminders[Math.floor(Math.random() * reminders.length)];
	}, [reminders]);

	return {
		reminders,
		addReminder,
		editReminder,
		deleteReminder,
		completeReminder,
		profile,
		updateProfile,
		currentAlert,
		setCurrentAlert,
		getStats,
		getRandomReminder,
	};
}
