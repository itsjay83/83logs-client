// app/api/posts/[slug]/route.ts
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { Post } from "@/types";

const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});

async function getPostFromS3(slug: string): Promise<Post> {
	try {
		const command = new GetObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME,
			Key: `${slug}.md`,
		});

		const response = await s3Client.send(command);
		const content = await response.Body?.transformToString();

		if (!content) {
			throw new Error("Empty content");
		}

		const { data, content: markdownContent } = matter(content);

		return {
			title: data.title || slug,
			date: data.date || new Date().toISOString(),
			tags: Array.isArray(data.tags) ? data.tags : [],
			content: markdownContent,
			slug,
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error fetching post ${slug}:`, error.message);
		}
		throw error;
	}
}

export async function GET(
	request: NextRequest,
	{ params }: { params: { slug: string } }
) {
	try {
		const { slug } = params;

		if (!slug) {
			return NextResponse.json({ error: "Slug is required" }, { status: 400 });
		}

		const post = await getPostFromS3(slug);

		return NextResponse.json(post);
	} catch (error) {
		console.error(`Error in GET /api/posts/${params.slug}:`, error);

		if (error instanceof Error && error.message.includes("NoSuchKey")) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ error: "Failed to fetch post" },
			{ status: 500 }
		);
	}
}
