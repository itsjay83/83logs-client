import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

// 페이지 컴포넌트
export default async function PostPage({
	params,
}: {
	params: { slug: string };
}) {
	// 특정 슬러그에 해당하는 게시물을 가져옵니다.
	const post = await getPost(params.slug);

	// 게시물이 존재하지 않으면 404 페이지를 렌더링합니다.
	if (!post) {
		notFound();
	}

	return (
		<div className="prose prose-invert max-w-none p-6">
			<h1 className="mb-4">{post.title}</h1>
			<p className="text-gray-400 text-sm mb-8">
				Published on {new Date(post.date).toLocaleDateString()}
			</p>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />

			{/* 태그 표시 */}
			{post.tags.length > 0 && (
				<div className="mt-8">
					<h3>Tags:</h3>
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<Link
								key={tag}
								href={`/tags/${tag}`}
								className="text-[#007ACC] hover:underline">
								#{tag}
							</Link>
						))}
					</div>
				</div>
			)}

			{/* 홈으로 돌아가는 링크 */}
			<div className="mt-12">
				<Link href="/" className="text-[#007ACC] hover:underline">
					← Back to Home
				</Link>
			</div>
		</div>
	);
}

// 동적 경로 생성 함수 (SSG/ISR에서 필요)
export async function generateStaticParams() {
	// 모든 게시물 데이터를 가져와 슬러그 목록을 생성합니다.
	const posts = await (await import("@/lib/posts")).getAllPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}
