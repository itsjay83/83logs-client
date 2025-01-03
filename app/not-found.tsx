// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-full text-center">
			<h2 className="text-3xl font-bold text-[#CCCCCC] mb-4">
				404 - Page Not Found
			</h2>
			<p className="text-[#8C8C8C] mb-6">What?..? where is that?</p>
			<Link
				href="/"
				className="px-4 py-2 bg-[#007ACC] text-white rounded hover:bg-[#1F8DD6] transition-colors">
				Return Home
			</Link>
		</div>
	);
}
