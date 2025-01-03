// src/components/TopBar.tsx
"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function TopBar() {
	// const [searchQuery, setSearchQuery] = useState("");
	// const router = useRouter();

	// // 검색 핸들러
	// const handleSearch = (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	if (searchQuery) {
	// 		router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
	// 	}
	// };

	return (
		<div className="h-12 bg-[#252526] border-b border-[#3C3C3C] flex items-center justify-center">
			{/* <form onSubmit={handleSearch} className="w-96">
				<input
					type="text"
					placeholder="Search posts...(not working yet)"
					className="w-full px-3 py-1.5 bg-[#3C3C3C] text-white rounded border border-[#4C4C4C] focus:outline-none focus:border-[#007ACC]"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</form> */}
			Welcome to my dev logs
		</div>
	);
}
