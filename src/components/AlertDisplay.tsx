import { useEffect, useRef } from "react";
import { Reminder, AppSettings, Theme } from "../types";
import confetti from "canvas-confetti";
import { X } from "lucide-react";

interface AlertDisplayProps {
	currentAlert: Reminder | null;
	settings: AppSettings;
	onComplete: (id: string) => void;
	onClose: () => void;
	theme: Theme;
	darkMode: boolean;
	getColor: (colorKey: keyof Theme) => string;
}

export function AlertDisplay({
	currentAlert,
	settings,
	onComplete,
	onClose,
	theme,
	darkMode,
	getColor,
}: AlertDisplayProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = new Audio(`/sounds/${settings.alertSound}.mp3`);
	}, [settings.alertSound]);

	useEffect(() => {
		if (currentAlert) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}
	}, [currentAlert]);

	const handleComplete = () => {
		if (currentAlert) {
			onComplete(currentAlert.id);
			onClose();
		}
	};

	const playAlertSound = () => {
		if (audioRef.current) {
			audioRef.current.play().catch((error) => {
				console.error("Error playing sound:", error);
			});
		}
	};

	if (!currentAlert) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div
				className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 relative"
				style={{
					backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					color: getColor("text"),
				}}
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:text-gray-900 dark:focus:text-gray-100"
				>
					<X size={24} />
				</button>
				<h2
					className="text-xl font-bold mb-4"
					style={{ color: getColor("primary") }}
				>
					{currentAlert.category} Reminder
				</h2>
				<p className="text-lg mb-6" style={{ color: getColor("text") }}>
					{currentAlert.message}
				</p>
				<div className="flex justify-end space-x-4">
					<button
						onClick={handleComplete}
						className="px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:opacity-80"
						style={{
							backgroundColor: getColor("primary"),
							color: darkMode ? "#ffffff" : getColor("background"),
						}}
					>
						Complete
					</button>
					<button
						onClick={playAlertSound}
						className="px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:opacity-80"
						style={{
							borderColor: getColor("secondary"),
							color: getColor("secondary"),
							borderWidth: 1,
						}}
					>
						Play Sound
					</button>
				</div>
			</div>
		</div>
	);
}
