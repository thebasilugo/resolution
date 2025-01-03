import { useState, useEffect } from "react";
import { CategoryColors } from "../types";

const defaultCategories: CategoryColors = {
	Work: "#4A90E2",
	Personal: "#50E3C2",
	Health: "#E84393",
	Finance: "#F39C12",
	Other: "#95A5A6",
};

export function useCategories() {
	const [categories, setCategories] =
		useState<CategoryColors>(defaultCategories);

	useEffect(() => {
		const storedCategories = localStorage.getItem("categories");
		if (storedCategories) {
			setCategories(JSON.parse(storedCategories));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	const addCategory = (name: string, color: string) => {
		setCategories((prev) => ({ ...prev, [name]: color }));
	};

	const removeCategory = (name: string) => {
		setCategories((prev) => {
			const { [name]: _, ...rest } = prev;
			return rest;
		});
	};

	return { categories, addCategory, removeCategory };
}
