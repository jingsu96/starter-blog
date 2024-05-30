import 'css/prism.css';
import 'katex/dist/katex.css';

import { slug as slugFn } from 'github-slugger';
import PageTitle from '@/components/PageTitle';
import { components } from '@/components/MDXComponents';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import type { Authors, Blog } from 'contentlayer/generated';
import PostSimple from '@/layouts/PostSimple';
import PostLayout from '@/layouts/PostLayout';
import PostBanner from '@/layouts/PostBanner';
import { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import { notFound } from 'next/navigation';
import { groupPostsByTopic } from '@/lib/utils';
import { ORDER } from '@/lib/constants';

const defaultLayout = 'PostLayout';
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const post = allBlogs.find((p) => p.slug === slug);
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }));

  return paths;
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'));
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs));

  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  const p = sortedCoreContents[postIndex];

  // TODO: Optimize this
  const paths = sortedCoreContents[postIndex]?.filePath.split('/');
  const generalPath = paths?.slice(0, paths.length - 1).join('/');
  const groupedPost = groupPostsByTopic(sortedCoreContents, postIndex);

  const currentTopic =
    (p?.topic && Object.keys(ORDER?.[generalPath] || {}).findIndex((topic) => topic === p.topic)) || 0;
  const samePathContent = p?.topic ? groupedPost[currentTopic]?.posts : groupedPost[0].posts;
  const samePathPostIndex = samePathContent?.findIndex?.((p) => p.slug === slug);

  if (postIndex === -1) {
    return notFound();
  }

  const prev =
    samePathContent?.[samePathPostIndex - 1] ||
    groupedPost[currentTopic - 1]?.posts?.[groupedPost[currentTopic - 1]?.posts.length - 1];
  const next = samePathContent?.[samePathPostIndex + 1] || groupedPost[currentTopic + 1]?.posts?.[0];
  const post = allBlogs.find((p) => p.slug === slug) as Blog;
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    };
  });

  const tag = post.tags[0];
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        return post.tags && post.tags.map((t) => slugFn(t)).includes(slugFn(tag));
      })
    )
  );

  const Layout = layouts[post.layout || defaultLayout];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev} filteredPosts={filteredPosts}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  );
}
