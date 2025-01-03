// src/context/UIContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
	isExplorerOpen: boolean;
	toggleExplorer: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
	const [isExplorerOpen, setIsExplorerOpen] = useState(true);

	const toggleExplorer = () => {
		setIsExplorerOpen((prev) => !prev);
	};

	return (
		<UIContext.Provider value={{ isExplorerOpen, toggleExplorer }}>
			{children}
		</UIContext.Provider>
	);
}

export function useUI() {
	const context = useContext(UIContext);
	if (context === undefined) {
		throw new Error("useUI must be used within a UIProvider");
	}
	return context;
}
