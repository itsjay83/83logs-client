// src/app/api/poasts/route.ts

import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function parseMarkdownFromS3(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  const content = await response.Body?.transformToString();
  
  if (!content) {
    throw new Error('Empty content');
  }

  const { data, content: markdownContent } = matter(content);
  
  return {
    title: data.title || key.replace(/\.md$/, ''),
    date: data.date || new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    content: markdownContent,
    slug: key.replace(/\.md$/, ''),
  };
}

export async function GET() {
  try {
    // List all markdown files
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: '',
    });

    const response = await s3Client.send(command);
    const files = response.Contents || [];

    // Process each markdown file
    const posts = await Promise.all(
      files
        .filter(file => file.Key?.endsWith('.md'))
        .map(async file => {
          if (!file.Key) return null;
          return parseMarkdownFromS3(file.Key);
        })
    );

    // Filter out null values and sort by date
    const validPosts = posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(validPosts);
  } catch (error) {
    console.error('Error in GET /api/posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}