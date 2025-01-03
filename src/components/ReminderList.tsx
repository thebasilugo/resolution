import { useState } from "react";
import { Reminder, Frequency, Theme } from "../types";
import { Edit, Trash2, Save, CheckCircle } from "lucide-react";

interface ReminderListProps {
	reminders: Reminder[];
	onEdit: (id: string, updatedReminder: Partial<Reminder>) => void;
	onDelete: (id: string) => void;
	onComplete: (id: string) => void;
	theme: Theme;
	darkMode: boolean;
	getColor: (colorKey: keyof Theme) => string;
}

const frequencies: Frequency[] = [
	"hourly",
	"daily",
	"weekly",
	"monthly",
	"custom",
	"biennial",
];

export function ReminderList({
	reminders,
	onEdit,
	onDelete,
	onComplete,
	theme,
	darkMode,
	getColor,
}: ReminderListProps) {
	const [editingId, setEditingId] = useState<string | null>(null);

	const handleEdit = (reminder: Reminder) => {
		setEditingId(reminder.id);
	};

	const handleSave = (reminder: Reminder) => {
		onEdit(reminder.id, reminder);
		setEditingId(null);
	};

	return (
		<div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
			{reminders.map((reminder) => (
				<div
					key={reminder.id}
					className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
					style={{
						backgroundColor: darkMode ? "#2a2a2a" : getColor("background"),
						color: getColor("text"),
					}}
				>
					<div className="flex justify-between items-start mb-2">
						<h3 className="text-lg font-semibold">{reminder.category}</h3>
						<span
							className="text-sm px-2 py-1 rounded"
							style={{
								backgroundColor: getColor("secondary"),
								color: darkMode ? "#ffffff" : getColor("background"),
							}}
						>
							{reminder.frequency.charAt(0).toUpperCase() +
								reminder.frequency.slice(1)}
						</span>
					</div>
					{editingId === reminder.id ? (
						<div className="space-y-2">
							<label className="block">
								<span
									className="text-sm font-medium"
									style={{ color: getColor("text") }}
								>
									Message
								</span>
								<input
									type="text"
									value={reminder.message}
									onChange={(e) =>
										onEdit(reminder.id, {
											...reminder,
											message: e.target.value,
										})
									}
									className="mt-1 w-full px-3 py-2 border rounded-md"
									style={{
										borderColor: getColor("secondary"),
										color: getColor("text"),
										backgroundColor: darkMode
											? "#3a3a3a"
											: getColor("background"),
									}}
								/>
							</label>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								<label className="block">
									<span
										className="text-sm font-medium"
										style={{ color: getColor("text") }}
									>
										Frequency
									</span>
									<select
										value={reminder.frequency}
										onChange={(e) =>
											onEdit(reminder.id, {
												...reminder,
												frequency: e.target.value as Frequency,
											})
										}
										className="mt-1 w-full px-3 py-2 border rounded-md"
										style={{
											borderColor: getColor("secondary"),
											color: getColor("text"),
											backgroundColor: darkMode
												? "#3a3a3a"
												: getColor("background"),
										}}
									>
										{frequencies.map((freq) => (
											<option key={freq} value={freq}>
												{freq.charAt(0).toUpperCase() + freq.slice(1)}
											</option>
										))}
									</select>
								</label>
								<label className="block">
									<span
										className="text-sm font-medium"
										style={{ color: getColor("text") }}
									>
										Category
									</span>
									<input
										type="text"
										value={reminder.category}
										onChange={(e) =>
											onEdit(reminder.id, {
												...reminder,
												category: e.target.value,
											})
										}
										className="mt-1 w-full px-3 py-2 border rounded-md"
										style={{
											borderColor: getColor("secondary"),
											color: getColor("text"),
											backgroundColor: darkMode
												? "#3a3a3a"
												: getColor("background"),
										}}
									/>
								</label>
							</div>
						</div>
					) : (
						<div>
							<p className="font-medium text-sm sm:text-base">
								{reminder.message}
							</p>
							<p
								className="text-xs sm:text-sm mt-1"
								style={{ color: getColor("secondary") }}
							>
								Completed {reminder.completionCount} times
							</p>
						</div>
					)}
					<div className="flex justify-end space-x-2 mt-4">
						{editingId === reminder.id ? (
							<button
								onClick={() => handleSave(reminder)}
								className="px-3 py-1 rounded-md text-sm"
								style={{
									backgroundColor: getColor("primary"),
									color: darkMode ? "#ffffff" : getColor("background"),
								}}
							>
								<Save className="w-4 h-4 mr-2 inline" />
								Save
							</button>
						) : (
							<>
								<button
									onClick={() => handleEdit(reminder)}
									className="px-3 py-1 rounded-md text-sm"
									style={{
										borderColor: getColor("primary"),
										color: getColor("primary"),
									}}
								>
									<Edit className="w-4 h-4 mr-2 inline" />
									Edit
								</button>
								<button
									onClick={() => onComplete(reminder.id)}
									className="px-3 py-1 rounded-md text-sm"
									style={{
										borderColor: getColor("secondary"),
										color: getColor("secondary"),
									}}
								>
									<CheckCircle className="w-4 h-4 mr-2 inline" />
									Complete
								</button>
							</>
						)}
						<button
							onClick={() => onDelete(reminder.id)}
							className="px-3 py-1 rounded-md text-sm bg-red-500 text-white"
						>
							<Trash2 className="w-4 h-4 mr-2 inline" />
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
