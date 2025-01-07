import { useState, useEffect } from "react";
import { AppSettings } from "../types";

const defaultSettings: AppSettings = {
	darkMode: false,
	alertSound: "default",
	notificationsEnabled: true,
};

export function useAppSettings() {
	const [settings, setSettings] = useState<AppSettings>(defaultSettings);

	useEffect(() => {
		const storedSettings = localStorage.getItem("appSettings");
		if (storedSettings) {
			setSettings(JSON.parse(storedSettings));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("appSettings", JSON.stringify(settings));
	}, [settings]);

	const updateSettings = (newSettings: Partial<AppSettings>) => {
		setSettings((prev) => ({ ...prev, ...newSettings }));
	};

	return { settings, updateSettings };
}
