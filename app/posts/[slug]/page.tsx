// src/app/posts/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";

export async function getStaticProps({ params }: { params: { slug: string } }) {
	// Read markdown file from AWS S3 or local directory
	const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
	const fileContents = fs.readFileSync(filePath, "utf-8");

	// Parse the markdown content
	const { data, content } = matter(fileContents);

	return {
		props: {
			data,
			content,
		},
	};
}

export async function getStaticPaths() {
	// Fetch the list of slugs from AWS S3 or local directory
	const postsDirectory = path.join(process.cwd(), "posts");
	const filenames = fs.readdirSync(postsDirectory);

	const paths = filenames.map((filename) => ({
		params: { slug: filename.replace(".md", "") },
	}));

	return {
		paths,
		fallback: false, // Ensure only existing paths are served
	};
}

export default function PostPage({
	data,
	content,
}: {
	data: any;
	content: string;
}) {
	return (
		<article className="prose prose-invert max-w-none">
			<h1>{data.title}</h1>
			<p>
				<small>{data.date}</small>
			</p>
			<div className="tags">
				{data.tags &&
					data.tags.map((tag: string) => (
						<span key={tag} className="tag">
							{tag}
						</span>
					))}
			</div>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</article>
	);
}
