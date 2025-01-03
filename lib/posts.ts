// src/lib/posts.ts
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { Post } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');

// 모든 블로그 포스트 가져오기
export async function getAllPosts(): Promise<Post[]> {
  try {
    const filenames = await fs.readdir(postsDirectory);
    
    const posts = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.md'))
        .map(async (filename) => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          
          return {
            title: data.title || filename.replace(/\.md$/, ''),
            date: data.date || new Date().toISOString(),
            tags: Array.isArray(data.tags) ? data.tags : [],
            content: content || '',
            slug: filename.replace(/\.md$/, ''),
          } as Post;
        })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all posts:', error);
    throw new Error('Failed to get posts');
  }
}

// 특정 슬러그의 포스트 가져오기
export async function getPost(slug: string) {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    const { data, content } = matter(fileContents);

    return {
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: content,
      slug,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw new Error('Failed to get post');
  }
}

// 태그별로 포스트 그룹화
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

// 포스트 검색
export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}