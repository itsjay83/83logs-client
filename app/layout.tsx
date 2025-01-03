// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Explorer from "@/components/Explorer";
import TopBar from "@/components/TopBar";
import { UIProvider } from "@/context/UIContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "83 Logs",
	description: "Developer blog of Jeseok Lee",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<UIProvider>
					<div className="flex h-screen bg-[#1E1E1E]">
						<Explorer />
						<main className="flex-1 overflow-auto">
							<TopBar />
							<div className="p-6">{children}</div>
						</main>
					</div>
				</UIProvider>
			</body>
		</html>
	);
}
