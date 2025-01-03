// src/components/Explorer.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Post } from "@/types";
import { useUI } from "@/context/UIContext";
import {
	ChevronRight,
	// ChevronDown,
	Menu,
	FileText,
	Folder,
	FolderOpen,
	FileCode,
} from "lucide-react";
import { usePathname } from "next/navigation";

// 파일 아이콘 컴포넌트
function FileIcon({ fileName }: { fileName: string }) {
	// 파일 확장자에 따른 아이콘 및 색상 결정
	if (fileName.toLowerCase() === "readme.md") {
		return <FileText size={16} className="text-[#519ABA]" />;
	}
	if (fileName.endsWith(".md")) {
		return <FileCode size={16} className="text-[#519ABA]" />;
	}
	return <FileText size={16} className="text-[#8E8E8E]" />;
}

export default function Explorer() {
	const { isExplorerOpen, toggleExplorer } = useUI();
	const [tags, setTags] = useState<Map<string, Post[]>>(new Map());
	const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());
	const [error, setError] = useState<string | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await fetch("/api/posts");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const posts: Post[] = await response.json();

				const tagMap = new Map<string, Post[]>();
				posts.forEach((post) => {
					post.tags.forEach((tag) => {
						if (!tagMap.has(tag)) {
							tagMap.set(tag, []);
						}
						tagMap.get(tag)?.push(post);
					});
				});

				setTags(tagMap);
			} catch (err) {
				console.error("Error fetching posts:", err);
				setError("Failed to load posts");
			}
		}

		fetchPosts();
	}, []);

	const toggleTag = (tag: string) => {
		const newExpanded = new Set(expandedTags);
		if (expandedTags.has(tag)) {
			newExpanded.delete(tag);
		} else {
			newExpanded.add(tag);
		}
		setExpandedTags(newExpanded);
	};

	if (!isExplorerOpen) {
		return (
			<button
				onClick={toggleExplorer}
				className="fixed left-0 top-0 h-12 w-12 flex items-center justify-center bg-[#252526] border-r border-[#3C3C3C] hover:bg-[#2D2D2D]"
				aria-label="Open Explorer">
				<Menu size={20} className="text-[#CCCCCC]" />
			</button>
		);
	}

	return (
		<div className="w-64 bg-[#252526] border-r border-[#3C3C3C] flex flex-col">
			<div className="h-12 flex items-center px-4 justify-between border-b border-[#3C3C3C]">
				<span className="text-[#CCCCCC] font-medium">Explorer</span>
				<button
					onClick={toggleExplorer}
					className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#2D2D2D]"
					aria-label="Close Explorer">
					<ChevronRight size={20} className="text-[#CCCCCC]" />
				</button>
			</div>

			<div className="flex-1 overflow-y-auto">
				<div className="p-2 text-[#CCCCCC]">
					{/* README.md 링크 */}
					<Link
						href="/"
						className={`px-2 py-1.5 rounded flex items-center gap-2 ${
							pathname === "/" ? "bg-[#37373D]" : "hover:bg-[#2A2D2E]"
						}`}>
						<FileIcon fileName="readme.md" />
						<span>README.md</span>
					</Link>

					{/* 구분선 */}
					<div className="my-2 border-t border-[#3C3C3C]"></div>

					{error ? (
						<div className="px-2 py-1 text-red-500">{error}</div>
					) : (
						Array.from(tags.entries()).map(([tag, posts]) => (
							<div key={tag} className="my-1">
								<button
									className="w-full px-2 py-1 text-left hover:bg-[#2A2D2E] rounded flex items-center gap-2"
									onClick={() => toggleTag(tag)}>
									{expandedTags.has(tag) ? (
										<FolderOpen size={16} className="text-[#DCAD5A]" />
									) : (
										<Folder size={16} className="text-[#DCAD5A]" />
									)}
									{tag}
									<span className="ml-auto text-[#6A737D]">{posts.length}</span>
								</button>
								{expandedTags.has(tag) && (
									<div className="ml-4">
										{posts.map((post) => (
											<Link
												key={post.slug}
												href={`/posts/${post.slug}`}
												className={`px-2 py-1 text-sm rounded flex items-center gap-2 ${
													pathname === `/posts/${post.slug}`
														? "bg-[#37373D]"
														: "hover:bg-[#2A2D2E]"
												}`}>
												<FileIcon fileName={`${post.slug}.md`} />
												<span className="truncate">{post.title}.md</span>
											</Link>
										))}
									</div>
								)}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
