// lib/posts.ts
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import matter from "gray-matter";
import { Post } from "@/types";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${slug}.md`,
    });

    const response = await s3Client.send(command);
    const content = await response.Body?.transformToString();
    
    if (!content) {
      return null;
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
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: '',
    });

    const response = await s3Client.send(command);
    const files = response.Contents || [];

    const posts = await Promise.all(
      files
        .filter(file => file.Key?.endsWith('.md'))
        .map(async file => {
          if (!file.Key) return null;
          const slug = file.Key.replace(/\.md$/, '');
          return getPost(slug);
        })
    );

    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}