import { slug } from 'github-slugger';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { allBlogs } from 'contentlayer/generated';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';
import { Metadata } from 'next';

const POSTS_PER_PAGE = 12;

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag);
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag, i) => ({
    tag: encodeURI(tag),
  }));

  const nPaths = paths
    .map((path) => {
      const tag = decodeURI(path.tag);
      const filteredPosts = allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag));
      const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

      return Array.from({ length: totalPages }, (_, i) => ({
        tag: encodeURI(tag),
        page: (i + 1).toString(),
      }));
    })
    .flat();

  return nPaths;
};

export default function TagPage({ params }: { params: { tag: string; page: string } }) {
  const tag = decodeURI(params.tag);
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  );
  const pageNumber = parseInt(params.page);
  const initialDisplayPosts = filteredPosts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    v2: true,
  };

  return (
    <ListLayout posts={filteredPosts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title={title} />
  );
}
