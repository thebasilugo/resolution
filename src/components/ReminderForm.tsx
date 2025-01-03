import { useState } from "react";
import { Frequency, Priority, Theme, CategoryColors } from "../types";
import { Calendar, ChevronDown } from "lucide-react";
import { format } from "date-fns";

interface ReminderFormProps {
	onSubmit: (reminder: {
		message: string;
		frequency: Frequency;
		category: string;
		priority: Priority;
		dueDate?: Date;
	}) => void;
	theme: Theme;
	darkMode: boolean;
	getColor: (colorKey: keyof Theme) => string;
	categories: CategoryColors;
}

const frequencies: Frequency[] = [
	"hourly",
	"daily",
	"weekly",
	"monthly",
	"custom",
	"biennial",
];
const priorities: Priority[] = ["low", "medium", "high"];

export function ReminderForm({
	onSubmit,
	theme,
	darkMode,
	getColor,
	categories,
}: ReminderFormProps) {
	const [message, setMessage] = useState("");
	const [frequency, setFrequency] = useState<Frequency>("daily");
	const [category, setCategory] = useState(Object.keys(categories)[0]);
	const [priority, setPriority] = useState<Priority>("medium");
	const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ message, frequency, category, priority, dueDate });
		setMessage("");
		setFrequency("daily");
		setCategory(Object.keys(categories)[0]);
		setPriority("medium");
		setDueDate(undefined);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label
					htmlFor="message"
					className="block text-sm font-medium mb-1"
					style={{ color: getColor("text") }}
				>
					Reminder Message
				</label>
				<input
					id="message"
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
					placeholder="Enter your motivation message"
					className="w-full px-3 py-2 border rounded-md"
					style={{
						borderColor: getColor("secondary"),
						color: getColor("text"),
						backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
					}}
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="frequency"
						className="block text-sm font-medium mb-1"
						style={{ color: getColor("text") }}
					>
						Frequency
					</label>
					<div className="relative">
						<select
							id="frequency"
							value={frequency}
							onChange={(e) => setFrequency(e.target.value as Frequency)}
							className="w-full px-3 py-2 border rounded-md appearance-none"
							style={{
								borderColor: getColor("secondary"),
								color: getColor("text"),
								backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
							}}
						>
							{frequencies.map((freq) => (
								<option key={freq} value={freq}>
									{freq.charAt(0).toUpperCase() + freq.slice(1)}
								</option>
							))}
						</select>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
					</div>
				</div>
				<div>
					<label
						htmlFor="category"
						className="block text-sm font-medium mb-1"
						style={{ color: getColor("text") }}
					>
						Category
					</label>
					<div className="relative">
						<select
							id="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-3 py-2 border rounded-md appearance-none"
							style={{
								borderColor: getColor("secondary"),
								color: getColor("text"),
								backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
							}}
						>
							{Object.keys(categories).map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="priority"
						className="block text-sm font-medium mb-1"
						style={{ color: getColor("text") }}
					>
						Priority
					</label>
					<div className="relative">
						<select
							id="priority"
							value={priority}
							onChange={(e) => setPriority(e.target.value as Priority)}
							className="w-full px-3 py-2 border rounded-md appearance-none"
							style={{
								borderColor: getColor("secondary"),
								color: getColor("text"),
								backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
							}}
						>
							{priorities.map((p) => (
								<option key={p} value={p}>
									{p.charAt(0).toUpperCase() + p.slice(1)}
								</option>
							))}
						</select>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
					</div>
				</div>
				<div>
					<label
						htmlFor="dueDate"
						className="block text-sm font-medium mb-1"
						style={{ color: getColor("text") }}
					>
						Due Date
					</label>
					<input
						id="dueDate"
						type="date"
						value={dueDate ? format(dueDate, "yyyy-MM-dd") : ""}
						onChange={(e) =>
							setDueDate(e.target.value ? new Date(e.target.value) : undefined)
						}
						className="w-full px-3 py-2 border rounded-md"
						style={{
							borderColor: getColor("secondary"),
							color: getColor("text"),
							backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
						}}
					/>
				</div>
			</div>
			<button
				type="submit"
				className="w-full px-4 py-2 rounded-md font-medium"
				style={{
					backgroundColor: getColor("secondary"),
					color: getColor("background"),
				}}
			>
				Add Reminder
			</button>
		</form>
	);
}
